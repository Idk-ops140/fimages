document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('imageFile', document.getElementById('imageFile').files[0]);
    formData.append('context', document.getElementById('context').value);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        loadImages();
    } else {
        alert('Failed to upload image.');
    }
});

async function loadImages() {
    const response = await fetch('/images');
    const images = await response.json();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        gallery.appendChild(imgElement);
    });
}

loadImages();
