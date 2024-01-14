export const reduceImageSize = async (
  base64str,
  MAX_WIDTH = 350,
  MAX_HEIGHT = 350
) => {
  return await new Promise((resolve) => {
    let img = new Image();
    img.src = base64str;
    img.onload = async () => {
      let canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve({ url: canvas.toDataURL(), height, width });
    };
  });
};

export const base64Convertor = async (file) => {
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const reducedImage = await reduceImageSize(reader.result);
      resolve(reducedImage);
    };
  });
};
