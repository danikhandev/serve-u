/**
 * File Upload Utility
 * Handles both local and Azure Blob Storage uploads based on environment configuration
 */

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Upload method enum
export enum UploadMethod {
  LOCAL = "local",
  AZURE = "azure",
}

// Get upload method from environment
export const getUploadMethod = (): UploadMethod => {
  const method = process.env.FILE_UPLOAD_METHOD?.toLowerCase();
  return method === "azure" ? UploadMethod.AZURE : UploadMethod.LOCAL;
};

// Azure Blob Storage Client configuration
let blobServiceClient: unknown = null;

const getAzureBlobClient = async (): Promise<unknown> => {
  if (!blobServiceClient) {
    try {
      // Dynamically import Azure SDK only when needed
      const { BlobServiceClient } = await import("@azure/storage-blob");

      // Method 1: Using Connection String (recommended for simplicity)
      if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
        console.log("[Azure] Using connection string authentication");
        blobServiceClient = BlobServiceClient.fromConnectionString(
          process.env.AZURE_STORAGE_CONNECTION_STRING
        );
      }
      // Method 2: Using Account Name and Account Key
      else if (
        process.env.AZURE_STORAGE_ACCOUNT_NAME &&
        process.env.AZURE_STORAGE_ACCOUNT_KEY
      ) {
        console.log("[Azure] Using account name and key authentication");
        const { StorageSharedKeyCredential } = await import("@azure/storage-blob");

        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

        const sharedKeyCredential = new StorageSharedKeyCredential(
          accountName,
          accountKey
        );

        blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net`,
          sharedKeyCredential
        );
      }
      // Method 3: Using SAS Token
      else if (
        process.env.AZURE_STORAGE_ACCOUNT_NAME &&
        process.env.AZURE_STORAGE_SAS_TOKEN
      ) {
        console.log("[Azure] Using SAS token authentication");
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;

        blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net?${sasToken}`
        );
      }
      // Method 4: Using DefaultAzureCredential (for Azure hosted environments)
      else if (process.env.AZURE_STORAGE_ACCOUNT_NAME) {
        console.log("[Azure] Using DefaultAzureCredential (managed identity)");
        const { DefaultAzureCredential } = await import("@azure/identity");

        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        const defaultAzureCredential = new DefaultAzureCredential();

        blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net`,
          defaultAzureCredential
        );
      } else {
        throw new Error(
          "Azure Storage credentials not configured. Set AZURE_STORAGE_CONNECTION_STRING or AZURE_STORAGE_ACCOUNT_NAME with appropriate credentials."
        );
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === "MODULE_NOT_FOUND") {
        throw new Error(
          "@azure/storage-blob package is not installed. Install it with: npm install @azure/storage-blob @azure/identity"
        );
      }
      throw error;
    }
  }
  return blobServiceClient;
};

/**
 * Upload file locally to public directory
 */
async function uploadLocal(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = path.extname(file.name);
    const filename = `${uuidv4()}${ext}`;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", folder);
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return public URL
    return `/${folder}/${filename}`;
  } catch (error) {
    console.error("Local upload error:", error);
    throw new Error("Failed to upload file locally");
  }
}

/**
 * Upload file to Azure Blob Storage
 */
async function uploadAzure(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = path.extname(file.name);
    const filename = `${uuidv4()}${ext}`;
    const blobName = `${folder}/${filename}`;

    const blobServiceClient = getAzureBlobClient();
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

    if (!containerName) {
      throw new Error("AZURE_STORAGE_CONTAINER_NAME is not configured");
    }

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload to Azure Blob Storage
    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: {
        blobContentType: file.type,
        blobCacheControl: "public, max-age=31536000", // Cache for 1 year
      },
    });

    // Return Azure Blob Storage public URL
    // Note: Container must have public access enabled for anonymous access
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (accountName) {
      return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    }

    // If using connection string, extract account name from blob URL
    return blockBlobClient.url;
  } catch (error) {
    console.error("Azure upload error:", error);
    throw new Error("Failed to upload file to Azure Blob Storage");
  }
}

/**
 * Upload file using configured method (local or Azure)
 */
export async function uploadFile(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const method = getUploadMethod();

  if (method === UploadMethod.AZURE) {
    return uploadAzure(file, folder);
  } else {
    return uploadLocal(file, folder);
  }
}

/**
 * Upload multiple files
 */
export async function uploadFiles(
  files: File[],
  folder: string = "uploads"
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadFile(file, folder));
  return Promise.all(uploadPromises);
}

/**
 * Delete file from local storage
 */
async function deleteLocal(fileUrl: string): Promise<void> {
  try {
    const { unlink } = await import("fs/promises");
    const filepath = path.join(process.cwd(), "public", fileUrl);
    await unlink(filepath);
  } catch (error) {
    console.error("Local delete error:", error);
    // Don't throw error if file doesn't exist
  }
}

/**
 * Delete file from Azure Blob Storage
 */
async function deleteAzure(fileUrl: string): Promise<void> {
  try {
    const blobServiceClient = getAzureBlobClient();
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

    if (!containerName) {
      throw new Error("AZURE_STORAGE_CONTAINER_NAME is not configured");
    }

    // Extract blob name from URL
    let blobName: string;
    if (fileUrl.includes("blob.core.windows.net")) {
      // URL format: https://accountname.blob.core.windows.net/container/folder/file.jpg
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split("/");
      // Remove empty string and container name from path
      blobName = pathParts.slice(2).join("/");
    } else {
      // Assume it's just the blob name
      blobName = fileUrl.startsWith("/") ? fileUrl.substring(1) : fileUrl;
    }

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.delete();
  } catch (error) {
    console.error("Azure delete error:", error);
    // Don't throw error to prevent cascading failures
  }
}

/**
 * Delete file using configured method
 */
export async function deleteFile(fileUrl: string): Promise<void> {
  if (!fileUrl) return;

  const method = getUploadMethod();

  if (method === UploadMethod.AZURE) {
    await deleteAzure(fileUrl);
  } else {
    await deleteLocal(fileUrl);
  }
}

/**
 * Delete multiple files
 */
export async function deleteFiles(fileUrls: string[]): Promise<void> {
  const deletePromises = fileUrls.map((url) => deleteFile(url));
  await Promise.all(deletePromises);
}

/**
 * Validate file type
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some((type) => {
    if (type.endsWith("/*")) {
      // Match any subtype (e.g., "image/*")
      const mainType = type.split("/")[0];
      return file.type.startsWith(mainType + "/");
    }
    return file.type === type;
  });
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

/**
 * Validate image file
 */
export function validateImage(
  file: File,
  maxSizeInMB: number = 5
): {
  isValid: boolean;
  error?: string;
} {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (!validateFileType(file, allowedTypes)) {
    return {
      isValid: false,
      error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.",
    };
  }

  if (!validateFileSize(file, maxSizeInMB)) {
    return {
      isValid: false,
      error: `File size exceeds ${maxSizeInMB}MB limit.`,
    };
  }

  return { isValid: true };
}