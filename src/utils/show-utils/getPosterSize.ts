import { Size } from "@types";

export default function getPosterSize(width?: number, height?: number): Size {
  if (!width || !height) {
    // height only, return it
    if (height) {
      return {
        width: height * 0.6666666666666666,
        height,
      };
    }
    if (width) {
      return {
        width,
        height: width * 1.5,
      };
    }
  }

  return {
    width: width ?? 200,
    height: height ?? 300,
  };
}
