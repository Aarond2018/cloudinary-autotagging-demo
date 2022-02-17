const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "ddmm5ofs1",
	api_key: process.env.CLD_API_KEY,
	api_secret: process.env.CLD_API_SECRET,
	secure: true,
});

export default async function handler(req, res) {
  const image = JSON.parse(req.body.image)
	try {
    const cldResponse = await cloudinary.uploader.upload(image, {
      categorization: "google_tagging",
      auto_tagging: 0.6,
    });
    
    res.status(200).json(cldResponse);
  } catch (error) {
    console.log(error)
  }
}
