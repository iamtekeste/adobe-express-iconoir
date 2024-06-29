import React from "react";
import * as AllIcons from "iconoir-react";
import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

type IconProps = {
  iconName: string;
  addOnUISdk: AddOnSDKAPI;
};

const Icon: React.FC<IconProps> = ({ iconName, addOnUISdk }) => {
  const IconComponent = AllIcons[iconName];
  const ref = React.useRef<SVGElement>(null);
  const svgToPngBlob = (svgString: string, scale = 4): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const svg = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svg);

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width * scale;
        canvas.height = image.height * scale;
        const context = canvas.getContext("2d");
        if (context) {
          context.scale(scale, scale);
          context.drawImage(image, 0, 0);

          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url);
            resolve(blob!);
          }, "image/png");
        } else {
          reject(new Error("Failed to get canvas 2D context"));
        }
      };
      image.onerror = (e) => {
        console.log("load error");
        reject(e);
      };
      image.src = url;
    });
  };

  const addImageFromBlob = async (pngBlob) => {
    const { document: adobeExpressDocument } = addOnUISdk.app;
    const pngImage = await svgToPngBlob(pngBlob);
    await adobeExpressDocument.addImage(pngImage);
  };
  if (!IconComponent) {
    return <span>Icon not found</span>;
  }
  const handleClick = async (e) => {
    const svgString = ref.current?.outerHTML;
    if (svgString) {
      const pngBlob = await addImageFromBlob(svgString);
      await addImageFromBlob(pngBlob);
    }
  };
  return (
    <IconComponent
      width="32px"
      height="32px"
      ref={ref}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Icon;
