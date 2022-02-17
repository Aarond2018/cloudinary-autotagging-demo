const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "ddmm5ofs1",
	api_key: process.env.CLD_API_KEY,
	api_secret: process.env.CLD_API_SECRET,
	/* secure: true, */
});

export default async function handler(req, res) {
	/* const images = await cloudinary.api.resources_by_tag(req.body.tag); */

  const tag = JSON.parse(req.body.tag).tag
  const resources = await cloudinary.api.resources_by_tag(tag);
  console.log(resources)
	res.status(200).json(resources);

}