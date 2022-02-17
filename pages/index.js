import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
	const [image, setImage] = useState("");
	const [imageTags, setImageTags] = useState([]);
	const [cldImages, setCldImages] = useState([]);
	const [currentTag, setCurrentTag] = useState(null);

	useEffect(() => {
		(async function getCldImageTags () {
			try {
				const cldTags = await axios.get("/api/getImageTags");
				setImageTags(cldTags.data.tags);
				
			} catch (error) {
				console.log("tags" + error);
			}
		})();

		/* getAllImages(); */
	}, []);

  useEffect(() => {
    if(!currentTag) return;

    
			axios.post('/api/getImagesByTag', {
				tag: JSON.stringify({
					tag: currentTag
				})
			}).then(res => setCldImages(res.data.resources)).catch(err=>console.log(err))

  }, [currentTag])

	async function getAllImages() {
		try {
			const images = await axios.get("/api/getImages");
			setCldImages(images.data);
      console.log(images.data)
		} catch (error) {
			console.log(error);
		}
   /*  const resp = await fetch('/api/getImages')
    const images = await resp.json()
    setCldImages(images);
    console.log(images) */
	}

	const handleInputOnChange = (e) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function (e) {
			setImage(e.target.result);
		};
	};

	const handleOnFormSubmit = (e) => {
		e.preventDefault();

		(async function uploadImage() {
			try {
				const response = await axios.post("/api/uploadImage", {
					image: JSON.stringify(image)
				});
				console.log(response.data);
			} catch (error) {
				console.log("imageUpload" + error);
			}
      /* try {
        await fetch('/api/uploadImage', {
          method: 'POST',
          body: JSON.stringify({
            image: image
          })
        }).then(res => console.log(res.json()))
      } catch (error) {
        console.log(error)
      }
		 */})();
	};

	/* const handleTagClick = (tag) => {
		(async () => {
			try {
				const resImages = await axios.post("/api/getImagesByTag", {
					tag,
				});
       
				setCldImages(resImages.data);
				console.log(resImages.resources);
			} catch (error) {
				console.log("tagClick" + error);
			}
		})();
	}; */

	return (
		<div className={styles.container}>
			<form onSubmit={handleOnFormSubmit}>
				<input type="file" onChange={handleInputOnChange}></input>
				<button disabled={image ? false : true}>Upload to Cloudinary</button>
			</form>

			<main>
				<div className={styles.tags}>
					{imageTags
						? imageTags.map((tag) => (
								<button key={tag} onClick={() => setCurrentTag(tag)}>
								{/* <button key={tag} onClick={() => handleTagClick(tag)}> */}
									{tag}
								</button>
						  ))
						: "upload Image"}
				</div>

				<div className={styles.images}>
					{cldImages
						? cldImages.map((img) => (
								<div key={img.public_id}>
									<img src={img.secure_url}></img>
								</div>
						  ))
						: "Loading..."}
				</div>
			</main>
		</div>
	);
}
