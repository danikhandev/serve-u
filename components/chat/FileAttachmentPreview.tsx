"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  FileText,
  File,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

interface FileAttachmentPreviewProps {
  attachment: {
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    thumbnailUrl?: string | null;
  };
  onPreview?: () => void;
}

export default function FileAttachmentPreview({
  attachment,
  onPreview,
}: FileAttachmentPreviewProps) {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const isImage =
    attachment.fileType.startsWith("image/") ||
    ["jpg", "jpeg", "png", "gif", "webp"].some((ext) =>
      attachment.fileName.toLowerCase().endsWith(ext)
    );

  const isVideo =
    attachment.fileType.startsWith("video/") ||
    ["mp4", "webm", "mov"].some((ext) =>
      attachment.fileName.toLowerCase().endsWith(ext)
    );

  const isAudio =
    attachment.fileType.startsWith("audio/") ||
    ["mp3", "wav", "ogg", "webm", "m4a"].some((ext) =>
      attachment.fileName.toLowerCase().endsWith(ext)
    );

  const isDocument =
    attachment.fileType.includes("pdf") ||
    attachment.fileType.includes("document") ||
    attachment.fileType.includes("word") ||
    attachment.fileType.includes("text") ||
    ["pdf", "doc", "docx", "txt"].some((ext) =>
      attachment.fileName.toLowerCase().endsWith(ext)
    );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(attachment.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = attachment.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (isImage) {
    return (
      <div className="relative group">
        <div
          className="relative rounded-lg overflow-hidden cursor-pointer"
          onClick={onPreview}
        >
          <Image
            src={attachment.thumbnailUrl || attachment.fileUrl}
            alt={attachment.fileName}
            width={300}
            height={200}
            className="object-cover max-w-sm rounded-lg"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          title="Download"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className="relative group max-w-sm">
        <div
          className="relative rounded-lg overflow-hidden cursor-pointer"
          onClick={onPreview}
        >
          <video
            src={attachment.fileUrl}
            className="w-full rounded-lg"
            controls={false}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-primary ml-1" />
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          title="Download"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (isAudio) {
    return (
      <div className="bg-white border border-primary/10 rounded-lg p-3 max-w-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const audio = document.getElementById(
                `audio-${attachment.id}`
              ) as HTMLAudioElement;
              if (audio) {
                if (audioPlaying) {
                  audio.pause();
                } else {
                  audio.play();
                }
                setAudioPlaying(!audioPlaying);
              }
            }}
            className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all"
          >
            {audioPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-text truncate">
                Voice Note
              </span>
              <span className="text-xs text-text/50">
                {audioDuration > 0
                  ? formatDuration(audioCurrentTime) +
                    " / " +
                    formatDuration(audioDuration)
                  : formatFileSize(attachment.fileSize)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => {
              const audio = document.getElementById(
                `audio-${attachment.id}`
              ) as HTMLAudioElement;
              if (audio) {
                audio.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-text/60" />
            ) : (
              <Volume2 className="w-4 h-4 text-text/60" />
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4 text-text/60" />
          </button>
        </div>

        <audio
          id={`audio-${attachment.id}`}
          src={attachment.fileUrl}
          onTimeUpdate={(e) => {
            const audio = e.currentTarget;
            const progress = (audio.currentTime / audio.duration) * 100;
            setAudioProgress(progress);
            setAudioCurrentTime(audio.currentTime);
          }}
          onLoadedMetadata={(e) => {
            setAudioDuration(e.currentTarget.duration);
          }}
          onEnded={() => {
            setAudioPlaying(false);
            setAudioProgress(0);
            setAudioCurrentTime(0);
          }}
        />
      </div>
    );
  }

  if (isDocument) {
    return (
      <div className="bg-white border border-primary/10 rounded-lg p-3 max-w-sm hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate">
              {attachment.fileName}
            </p>
            <p className="text-xs text-text/60">
              {formatFileSize(attachment.fileSize)}
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="flex-shrink-0 p-2 hover:bg-primary/10 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    );
  }

  // Generic file type
  return (
    <div className="bg-white border border-primary/10 rounded-lg p-3 max-w-sm hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <File className="w-5 h-5 text-text/60" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text truncate">
            {attachment.fileName}
          </p>
          <p className="text-xs text-text/60">
            {formatFileSize(attachment.fileSize)}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Download"
        >
          <Download className="w-4 h-4 text-text/60" />
        </button>
      </div>
    </div>
  );
}
