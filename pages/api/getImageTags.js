const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddmm5ofs1",
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
  secure: true
});

export default async function handler(req, res) {
  try {
    const imageTags = await cloudinary.api.tags({
      max_results: 50
    });
    res.status(200).json(imageTags);
  } catch (error) {
    res.json({message: "an error occured"})
  }
}
