import React, { useMemo, useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Two modes: Direct Prompt OR Silo Reference
type SlopImageProps = React.ImgHTMLAttributes<HTMLImageElement> &
  (
    | {
        mode?: "prompt";
        prompt: string;
        silo?: never;
        bucket?: never;
        version?: never;
        aspectRatio?: string;
        variables?: Record<string, string | number | undefined | null>;
      }
    | {
        mode?: "silo";
        prompt?: never;
        silo: string;
        bucket: string;
        version?: number;
        aspectRatio?: string;
        variables?: Record<string, string | number | undefined | null>;
      }
  );

export const SlopImage: React.FC<SlopImageProps> = ({
  className,
  aspectRatio = "1:1",
  variables = {},
  ...props
}) => {
  const baseUrl =
    "https://us-central1-slopmachine-12bfb.cloudfunctions.net/renderImage";

  // Construct URL based on mode
  const src = useMemo(() => {
    const params = new URLSearchParams();
    params.append("aspectRatio", String(aspectRatio));

    if (props.silo && props.bucket) {
      // Mode: Silo Reference
      params.append("silo", props.silo);
      params.append("bucket", props.bucket);
      if (props.version) {
        params.append("version", String(props.version));
      }

      // Pass variables as query params for server-side interpolation
      Object.keys(variables).forEach((key) => {
        const value = variables[key];
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    } else if (props.prompt) {
      // Mode: Direct Prompt
      let text = props.prompt;
      // Client-side interpolation
      Object.keys(variables).forEach((key) => {
        const value = variables[key];
        if (value !== undefined && value !== null) {
          text = text.replace(new RegExp(`{${key}}`, "g"), String(value));
        }
      });
      params.append("prompt", text);
    }

    return `${baseUrl}?${params.toString()}`;
  }, [props.silo, props.bucket, props.version, props.prompt, aspectRatio, variables]);

  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  return (
    <div
      className={cn("relative overflow-hidden bg-muted", className)}
      style={{
        aspectRatio: String(aspectRatio).replace(":", "/"),
      }}
    >
      {/* Loading overlay */}
      <div
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center bg-muted transition-opacity duration-300",
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <svg
            className="size-6 text-muted-foreground animate-slop-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-xs text-muted-foreground">Loading...</span>
        </div>
      </div>

      {/* Shimmer effect underneath */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-slop-shimmer bg-[length:200%_100%]",
          isLoading ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Image */}
      <img
        key={src}
        src={src}
        // Use prompt or bucket ID as alt text fallback
        alt={props.prompt || `Slop generated from ${props.silo}/${props.bucket}`}
        onLoad={() => setIsLoading(false)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        {...props}
      />
    </div>
  );
};
