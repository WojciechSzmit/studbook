export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "Plik nie istnieje");

  if (file.size > 1024 * 1024)
    //czyli 1 mb
    err = "Maksymalna wielkość pliku wynosi 1mb";

  if (
    file.type !== "image/jpg" &&
    file.type !== "image/jpeg" &&
    file.type !== "image/png"
  )
    err =
      "Nieprawidłowy format pliku. Dopuszczalne formaty to: jpg, jpeg lub png";

  return err;
};

export const cloudinaryUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    //console.log(item);
    const formData = new FormData();

    //console.log(item);

    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }

    formData.append("upload_preset", "mafvwlm7"); //upolad preset nam z cloudinary.com
    formData.append("cloud_name", "drhjbtc7z"); //cloud name z cloudinary.com

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drhjbtc7z/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
    //console.log(data);
  }
  return imgArr;
  //console.log(images);
};
