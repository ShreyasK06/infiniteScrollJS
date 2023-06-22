const imageContainer = document.getElementById("image-container");

let photosArray = [];

// Unsplash API 
const picCount = 20;
const apiKey = 'OxIB9Q3uImgXLhgROBfArgrAMTXCW1EL62op_1j2V90';
const topic = "Wallpapers";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&topics=${topic}&count=${picCount}`;

// Helper Function set Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display the photos and links from the photo array
function displayPhotos() {
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Add number of likes of each photo
        const likes = document.createElement('p');
        likes.innerHTML = photo.likes + "❤️";

        // Put <img> inside <a> and put both in image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
        imageContainer.appendChild(likes);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
    } catch (error) {
        // Catch Error

    }
}


// On load
getPhotos();