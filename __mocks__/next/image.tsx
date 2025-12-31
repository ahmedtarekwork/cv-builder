import type { ComponentProps } from "react";

const MockedImage = ({ src, alt, ...props }: ComponentProps<"img">) => {
  let transformedSrc = src as string;

  if (typeof transformedSrc === "string" && transformedSrc.startsWith("http")) {
    transformedSrc = `/_next/image?url=${encodeURIComponent(
      transformedSrc
    )}&w=640&q=75`;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={transformedSrc} alt={alt || ""} {...props} />;
};

export default MockedImage;
