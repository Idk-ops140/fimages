const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('imageFile'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, 'public/images', req.file.originalname);

    fs.rename(tempPath, targetPath, err => {
        if (err) return res.sendStatus(500);
        res.sendStatus(200);
    });
});

app.get('/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'public/images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) return res.sendStatus(500);
        const images = files.map(file => ({ url: `/images/${file}` }));
        res.json(images);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
