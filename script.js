const imageContainer = document.getElementById("image-container");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API 
const picCount = 30;
const apiKey = 'OxIB9Q3uImgXLhgROBfArgrAMTXCW1EL62op_1j2V90';
const topic = "Wallpapers";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${topic}&count=${picCount}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
    }
}

// Helper Function set Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display the photos and links from the photo array
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
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

        // Add number of likes and views of each photo
        const likes = document.createElement('p');
        likes.innerHTML = photo.likes + "❤️";
        const views = document.createElement('p');
        views.innerHTML = photo.views + " views ";

        // Event Listener, check when each is finsihed loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a> and put both in image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
        imageContainer.appendChild(likes);
        imageContainer.appendChild(views);
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

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On load
getPhotos();