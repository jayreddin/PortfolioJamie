'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Facebook plumbing album

//let albumId;
//let albumName = {
/*  plumbing: '115661660114172',
  electrical: '115681540112184',
  carpentry: '115661660114172',
  airtowater: '115661660114172',
  roofing: '115661660114172',
  generalbuilding: '115661660114172',
  glazing: '115661660114172'
};

let photos = [];
let currentIndex = 0;

async function loadAlbum() {
  try {
    // Retrieve the album name from the HTML file
    const albumNameFromHtml = '${album_name}';

    // Set the albumId based on the album name
    albumId = albumName[albumNameFromHtml];

    const response = await fetch(`https://graph.facebook.com/v10.0/${albumId}?fields=name,photos.limit(1000){images,id}&access_token=EAAXVcjQK09UBO4BFECy1NwFyb1ycjZCowyryNslg5wXaUx2eREcprkZCdulNM6bzxpEeZCZC6jY963YxXnBj2MjZBxI9hZAPDZCPZASbcPnyg9XLLZAeDd7BdXfzGZBUNXFqKrpP4q4JbfjapxBZAuWQi1YRmdLE7oXG0MEyWakx2MR4j25MzGFkE685QZDZD`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    document.getElementById('albumName').textContent = data.name || 'Untitled Album';
    photos = data.photos ? data.photos.data : [];
    document.getElementById('photoCount').textContent = `${photos.length} photos`;

    if (photos.length > 0) {
      displayPhoto(currentIndex);
      preloadImages();
    } else {
      document.getElementById('electrical').innerHTML = '<div class="loading">No photos found in this album.</div>';
    }
  } catch (error) {
    document.getElementById('electrical').innerHTML = `<div class="loading">Error loading album: ${error.message}</div>`;
    console.error('Error loading album:', error);
  }
}

function displayPhoto(index) {
  const carousel = document.getElementById('electrical');
  const photo = photos[index];
  if (photo && photo.images && photo.images.length > 0) {
    carousel.innerHTML = `<img src="${photo.images[0].source}" alt="Photo ${index + 1}" data-id="${photo.id}">`;
  } else {
    carousel.innerHTML = '<div class="loading">Error loading photo.</div>';
  }
}

function changeSlide(direction) {
  if (photos.length === 0) return;
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = photos.length - 1;
  if (currentIndex >= photos.length) currentIndex = 0;
  displayPhoto(currentIndex);
}

function preloadImages() {
  photos.forEach((photo, index) => {
    if (index !== currentIndex && photo.images && photo.images.length > 0) {
      const img = new Image();
      img.src = photo.images[0].source;
    }
  });
}

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel-container').addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel-container').addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    changeSlide(1); // Swipe left
  } else if (touchEndX - touchStartX > 50) {
    changeSlide(-1); // Swipe right
  }
}

// Load the album when the page is ready
document.addEventListener('DOMContentLoaded', loadAlbum); */
