let pageUrls = {
    about: '/index.html?about',
    contact:'/index.html?contact'
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();
document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

function RenderAboutPage() {
    document.querySelector('main').innerHTML = 
    `
    <h1 class="title">About Me</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
    `;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
    <h1 class="title">Contact with me</h1>
    <form id="contact
    -
    form">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea>
    <button type="submit">Send</button>
    </form>`;
    document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
        alert('Form submitted!');
    });
}

function RenderGalleryPage() {
    document.querySelector('main').innerHTML = 
    `
      <h1 class="title">Gallery</h1>
      <div class="gallery">

        ${Array(9).fill('').map((_, i) => `
          <img class="gallery-image lazy" 
               data-src="public/img/${i+1}.jpg" 
               alt="Image ${i + 1}">
        `).join('')}
      </div>
      <div class="modal" id="modal" style="display:none;">
        <span id="close-modal" class="close">&times;</span>
        <img id="modal-image" class="modal-content" alt="Full Image">
      </div>
      `;
    
    initializeLazyLoading();
    initializeModal();
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImageAsBlob(img.dataset.src).then(blob => {
            const url = URL.createObjectURL(blob);
            img.src = url;
            img.classList.remove('lazy');
            observer.unobserve(img);
          });
        }
      });
    });
  
    lazyImages.forEach(img => observer.observe(img));
}

async function loadImageAsBlob(imageUrl) {
    const response = await fetch(imageUrl)
    const blob = await response.blob();
    return blob;
}

function initializeModal() {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
  
    document.querySelectorAll('.gallery-image').forEach(img => {
      img.addEventListener('click', () => {
        modalImage.src = img.src;
        modal.style.display = 'flex';
      });
    });
  
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
}


function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];

    if (loc === pageUrls.contact){ RenderContactPage(); }
    if(loc === pageUrls.about){ RenderAboutPage(); }
}

window.onpopstate = popStateHandler

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});