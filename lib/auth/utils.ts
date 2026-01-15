/**
 * Authentication Utilities
 */

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET: string = process.env.JWT_SECRET || "your-secret-key";

/**
 * Generate OTP (6-digit code)
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compare password
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Get secret key as Uint8Array for jose
 */
function getSecretKey(): Uint8Array {
  return new TextEncoder().encode(JWT_SECRET);
}

/**
 * Generate JWT token (async for jose)
 */
export async function generateToken(payload: Record<string, unknown>, expiresIn: string = "7d"): Promise<string> {
  const secret = getSecretKey();
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);

  return token;
}

/**
 * Verify JWT token (async for jose)
 */
export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);

    // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      console.log('Token expired at:', new Date(payload.exp * 1000));
      return null;
    }

    return payload as Record<string, unknown>;
  } catch (error: unknown) {
    // Log specific error types for debugging
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ERR_JWT_EXPIRED') {
      console.log('JWT expired:', error && typeof error === 'object' && 'message' in error ? error.message : 'Unknown error');
    } else {
      console.log('JWT verification error:', error);
    }
    return null;
  }
}

/**
 * Get OTP expiry time (10 minutes from now)
 */
export function getOTPExpiry(): Date {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
}

/**
 * Check if OTP is expired
 */
export function isOTPExpired(expiryDate: Date | null): boolean {
  if (!expiryDate) return true;
  return new Date() > expiryDate;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * - At least 8 characters
 * - Contains at least one number or special character
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) return false;
  return /[0-9!@#$%^&*]/.test(password);
}

/**
 * Generate unique slug from name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * User Guard - Authenticate and get user from cookie token
 * Extracts token from cookies, verifies it (checks expiration), and returns user without password
 *
 * @param request - NextRequest object
 * @returns Object with either user data or error response
 */
// export async function userGuard(request: NextRequest): Promise<{
//   user?: Record<string, unknown>;
//   error?: NextResponse;
// }> {
//   try {
//     // Extract token from cookies
//     const token = request.cookies.get("auth-user-token")?.value;

//     if (!token) {
//       return {
//         error: NextResponse.json(
//           { error: "Unauthorized - No token provided" },
//           { status: 401 }
//         ),
//       };
//     }

//     // Verify token (also checks expiration)
//     const decoded = await verifyToken(token);
//     if (!decoded) {
//       return {
//         error: NextResponse.json(
//           { error: "Unauthorized - Invalid or expired token" },
//           { status: 401 }
//         ),
//       };
//     }

//     const userId = decoded.userId;
//     if (!userId) {
//       return {
//         error: NextResponse.json(
//           { error: "Unauthorized - Invalid token payload" },
//           { status: 401 }
//         ),
//       };
//     }

//     // Fetch user from database
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
      
//     });

//     if (!user) {
//       return {
//         error: NextResponse.json(
//           { error: "User not found" },
//           { status: 404 }
//         ),
//       };
//     }

//     // Check if user is active
//     if (!user.isActive) {
//       return {
//         error: NextResponse.json(
//           { error: "Account has been deactivated" },
//           { status: 403 }
//         ),
//       };
//     }

//     // Return user without password
//     const { password: _password, verificationOtp: _verificationOtp, verificationOtpExpiry: _verificationOtpExpiry, passwordResetOtp: _passwordResetOtp, passwordResetOtpExpiry: _passwordResetOtpExpiry, ...userWithoutPassword } = user;

//     return {
//       user: userWithoutPassword,
//     };
//   } catch (error) {
//     console.error("User guard error:", error);
//     return {
//       error: NextResponse.json(
//         { error: "Internal server error" },
//         { status: 500 }
//       ),
//     };
//   }
// }

/**
 * Admin Guard - Authenticate and get super admin from cookie token
 * Extracts token from cookies, verifies it (checks expiration), and returns admin without password
 *
 * @param request - NextRequest object
 * @returns Object with either admin data or error response
 */
// export async function adminGuard(request: NextRequest): Promise<{
//   admin?: Record<string, unknown>;
//   error?: NextResponse;
// }> {
//   try {
//     // Extract token from cookies
//     const token = request.cookies.get("admin-auth-token")?.value;

//     if (!token) {
//       return {
//         error: NextResponse.json(
//           { error: "Unauthorized - No token provided" },
//           { status: 401 }
//         ),
//       };
//     }

//     // Verify token (also checks expiration)
//     const decoded = await verifyToken(token);
//     if (!decoded) {
//       return {
//         error: NextResponse.json(
//           { error: "Unauthorized - Invalid or expired token" },
//           { status: 401 }
//         ),
//       };
//     }

//     const adminId = decoded.adminId;
//     if (!adminId) {
//       return {
//         error: NextResponse.json(
//           { error: "Unauthorized - Invalid token payload" },
//           { status: 401 }
//         ),
//       };
//     }

//     // Fetch admin from database
//     const admin = await prisma.superAdmin.findUnique({
//       where: { id: adminId },
//     });

//     if (!admin) {
//       return {
//         error: NextResponse.json(
//           { error: "Admin not found" },
//           { status: 404 }
//         ),
//       };
//     }

//     // Return admin without password
//     const { password: _password, ...adminWithoutPassword } = admin;

//     return {
//       admin: adminWithoutPassword,
//     };
//   } catch (error) {
//     console.error("Admin guard error:", error);
//     return {
//       error: NextResponse.json(
//         { error: "Internal server error" },
//         { status: 500 }
//       ),
//     };
//   }
// }
