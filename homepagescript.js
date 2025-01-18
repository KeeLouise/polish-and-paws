function searchContent() {
  let searchQuery = document.getElementById('search-bar').value.trim().toLowerCase();
  let messageDiv = document.getElementById('message');

  let highlightedElements = document.querySelectorAll('.highlight');
  highlightedElements.forEach(element => {
      element.classList.remove('highlight');
  });

  messageDiv.textContent = ''; 
  messageDiv.classList.remove('show');

  if (!searchQuery) {
      messageDiv.textContent = 'Please enter a search term';
      messageDiv.classList.add('show');
      return;
  }

  let elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

  let foundMatches = false;

  elements.forEach(element => {
      let textContent = element.textContent || element.innerText;

      if (textContent.toLowerCase().includes(searchQuery)) {
          highlightText(element, searchQuery);
          foundMatches = true;
      }
  });

  if (!foundMatches) {
      messageDiv.textContent = 'No results found for "' + searchQuery + '"';
      messageDiv.classList.add('show');
  }
}

function highlightText(element, searchQuery) {
  let regex = new RegExp(`(${searchQuery})`, 'gi');
  let innerHTML = element.innerHTML;
  
  element.innerHTML = innerHTML.replace(regex, `<span class="highlight">$1</span>`);
}

//Nav Script
const navLinks = document.querySelectorAll('nav a');

function enlargeLink(event) {
  event.target.style.transform = 'scale(1.2)';
  event.target.style.color = '#89CFF0';
}

function resetLink(event) {
  event.target.style.transform = 'scale(1)';
  event.target.style.color = 'white';
}

navLinks.forEach(link => {
  link.addEventListener('mouseover', enlargeLink);
  link.addEventListener('mouseout', resetLink);
});

//Gallery Script
let slideIndex = 0;
let autoPlayInterval;

function showSlides() {
  const slides = document.querySelectorAll('.mySlides');
  const dots = document.querySelectorAll('.dot');
  
  slides.forEach(slide => (slide.style.display = 'none'));
  
  dots.forEach(dot => dot.classList.remove('active'));

  slideIndex++;
  
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].classList.add('active');
}

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    showSlides();
  }, 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

function plusSlides(n) {
  stopAutoPlay();
  slideIndex += n - 1;
  if (slideIndex < 0) {
    slideIndex = 0;
  }
  showSlides();
  startAutoPlay(); 
}

function currentSlide(n) {
  stopAutoPlay();
  slideIndex = n - 1;
  showSlides();
  startAutoPlay();
}

function initSlider() {
  showSlides();
  startAutoPlay();
}

document.addEventListener('DOMContentLoaded', initSlider);