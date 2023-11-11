import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "drbjr3i8f",
  api_key: "926381918474494",
  api_secret: "cX_0rSqikvOgM4fnx1E8zl7xz8Y",
});

// 이미지 public_id (Cloudinary에서 고유 식별자)를 이용하여 이미지 URL 생성
cloudinary.uploader.upload(
  "./img/bookBack",
  { public_id: "olympic_flag" },
  function (error, result) {
    if (error) {
      console.error(error);
    } else {
      console.log(result);

      // 이미지 public_id를 사용하여 이미지 URL 생성
      const uploadedPublicId = result.public_id;
      const imageUrl = cloudinary.url(uploadedPublicId, { secure: true });

      console.log("Uploaded Image URL:", imageUrl);
    }
  }
);
