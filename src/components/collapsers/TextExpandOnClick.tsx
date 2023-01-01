import React from "react";
import { useCallback, useState } from "react";
import TextClamper from "../utils/TextClamper";

export default function TextExpandOnClick({
  text,
  maxLines,
  onClick,
  sx,
  defaultToClamped = true,
}: {
  text?: string;
  maxLines?: number;
  onClick?: () => void;
  sx: [] | object;
  defaultToClamped?: boolean;
}) {
  const [currentMaxLines, setCurrentMaxLines] = useState<number | undefined>(
    defaultToClamped ? maxLines : undefined
  );

  const handleDescClick = useCallback(() => {
    setCurrentMaxLines(currentMaxLines ? undefined : maxLines);
    onClick && onClick();
  }, [currentMaxLines, maxLines, onClick]);

  return (
    <TextClamper
      text={text}
      maxLines={currentMaxLines}
      onClick={handleDescClick}
      sx={sx}
    />
  );
}
