import { useEffect, useState } from "react";
import { CardMedia } from "@mui/material";

const useProgressiveImg = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc);
  useEffect(() => {
    setSrc(lowQualitySrc);
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [lowQualitySrc, highQualitySrc]);
  return [src, { blur: src === lowQualitySrc }];
};

const ProgressiveImg = ({
  lowQualitySrc,
  highQualitySrc,
  img_width,
  img_alt,
}) => {
  const [src, { blur }] = useProgressiveImg(lowQualitySrc, highQualitySrc);
  return (
    <CardMedia
      component="img"
      width={img_width}
      image={src}
      alt={img_alt}
      style={{
        width: img_width,
        filter: blur ? "blur(20px)" : "none",
        transition: blur ? "none" : "filter 0.3s ease-out",
      }}
    />
  );
};

export default ProgressiveImg;
