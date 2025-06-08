import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [dogImage, setDogImage] = useState("");

  const handleFileChange = (e) => setSelectedFiles(e.target.files);

  const uploadFiles = async () => {
    const formData = new FormData();
    for (let file of selectedFiles) {
      formData.append("images", file);
    }
    await axios.post("http://localhost:5000/upload", formData);
    alert("Images uploaded!");
  };

  const fetchRandomImages = async () => {
    const res = await axios.get("http://localhost:5000/random-images");
    setRandomImages(res.data);
  };

  const fetchDogImage = async () => {
    const res = await axios.get("https://dog.ceo/api/breeds/image/random");
    setDogImage(res.data.message);
  };

  const uploadDogImage = async () => {
    const blob = await (await fetch(dogImage)).blob();
    const file = new File([blob], "dog.jpg", { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("dogImage", file);
    await axios.post("http://localhost:5000/upload-dog", formData);
    alert("Dog image uploaded!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>CPAN 212 - Lab 3</h1>

      <h3>Upload Multiple Images</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={uploadFiles}>Upload</button>

      <h3>Get 3 Random Images</h3>
      <button onClick={fetchRandomImages}>Fetch</button>
      <div style={{ display: "flex", gap: "10px" }}>
        {randomImages.map((img, i) => (
          <img key={i} src={img} width={150} />
        ))}
      </div>

      <h3>Dog Image from API</h3>
      <button onClick={fetchDogImage}>Get Dog Image</button><br />
      {dogImage && <img src={dogImage} width={200} />}
      <br />
      <button onClick={uploadDogImage}>Upload Dog Image</button>
    </div>
  );
}

export default App;
