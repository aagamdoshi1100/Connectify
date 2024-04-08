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

export const validateSignInData = (data, setErrors) => {
  const errors = {};
  if (data.username === "") {
    errors.username = "Username is required";
  }

  if (data.password === "") {
    errors.password = "Password is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export const validateSignupData = (data, setErrors) => {
  const errors = {};
  if (data.username === "") {
    errors.username = "Username is required";
  }

  if (data.firstname === "") {
    errors.firstname = "Firstname is required";
  }

  if (data.lastname === "") {
    errors.lastname = "Lastname is required";
  }

  if (data.email === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email address";
  }

  if (data.password === "") {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Require 8 character long password";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export const validateProfileData = (data, setErrors) => {
  const errors = {};

  if (data.dob === "") {
    errors.dob = "Date of birth is required";
  }

  if (data.bio === "") {
    errors.bio = "Bio is required";
  }

  if (data.email === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email address";
  }

  if (data.country === "") {
    errors.country = "Country is required";
  }

  if (data.interestArr.length === 0) {
    errors.interest = "Interest is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
