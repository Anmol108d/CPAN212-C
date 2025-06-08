const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { sampleSize } = require("lodash");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.array("images", 10), (req, res) => {
  res.json({ files: req.files });
});

app.get("/random-images", (req, res) => {
  const imageDir = path.join(__dirname, "uploads");
  fs.readdir(imageDir, (err, files) => {
    if (err) return res.status(500).send("Error reading files");
    const selected = sampleSize(files, 3);
    res.json(selected.map((f) => `http://localhost:${PORT}/uploads/${f}`));
  });
});

app.post("/upload-dog", upload.single("dogImage"), (req, res) => {
  res.json({ file: req.file });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
