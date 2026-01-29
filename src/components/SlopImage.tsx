import React, { useMemo } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SlopImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  prompt: string;
  // Dynamic props mapping
  [key: string]: any;
}

// Known props to exclude from prompt interpolation
const RESERVED_PROPS = [
  "prompt",
  "className",
  "style",
  "alt",
  "width",
  "height",
  "loading",
  "aspectRatio",
];

export const SlopImage: React.FC<SlopImageProps> = ({
  prompt,
  className,
  aspectRatio = "1:1",
  style,
  ...props
}) => {
  // Interpolate prompt
  const { finalPrompt } = useMemo(() => {
    let text = prompt;

    Object.keys(props).forEach((key) => {
      if (RESERVED_PROPS.includes(key)) return;

      const value = props[key];
      // Replace {key} with value
      text = text.replace(new RegExp(`{${key}}`, "g"), String(value));
    });

    return { finalPrompt: text };
  }, [prompt, props, style]);

  // Construct API URL
  const baseUrl =
    "https://us-central1-slopmachine-12bfb.cloudfunctions.net/renderImage";
  const params = new URLSearchParams({
    prompt: finalPrompt,
    aspectRatio: String(aspectRatio),
  });

  // If style wasn't in the prompt template but passed as a prop, maybe append it?
  // The API supports a 'style' param.
  if (style && !prompt.includes("{style}")) {
    params.append("style", String(style));
  }

  const src = `${baseUrl}?${params.toString()}`;

  return (
    <img
      src={src}
      alt={finalPrompt}
      className={cn("bg-gray-100 object-cover", className)}
      {...props}
    />
  );
};
