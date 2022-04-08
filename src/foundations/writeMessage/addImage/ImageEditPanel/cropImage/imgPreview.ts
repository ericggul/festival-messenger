import { PixelCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";

let previewUrl = "";

function toBlob(canvas: HTMLCanvasElement): Promise<any> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
}

export async function imgPreview(image: HTMLImageElement, crop: PixelCrop) {
  const canvas = document.createElement("canvas");
  canvasPreview(image, canvas, crop);

  const blob = await toBlob(canvas);
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  console.log(blob);

  return blob;

  // previewUrl = URL.createObjectURL(blob);
  // return { previewUrl };
}
