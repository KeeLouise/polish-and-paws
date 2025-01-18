function searchContent() {
  let searchQuery = document.getElementById('search-bar').value.trim().toLowerCase();
  let messageDiv = document.getElementById('message');

  // Clear previous highlights and message
  let highlightedElements = document.querySelectorAll('.highlight');
  highlightedElements.forEach(element => {
      element.classList.remove('highlight');
  });

  // Clear the message (hide it) initially
  messageDiv.textContent = ''; 
  messageDiv.classList.remove('show');

  // If search query is empty, show message and return
  if (!searchQuery) {
      messageDiv.textContent = 'Please enter a search term to find results.';
      messageDiv.classList.add('show');
      return; // Stop further processing
  }

  // Select text-containing elements (p, h1, h2, h3, etc.)
  let elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

  let foundMatches = false; // Flag to check if we find any matches

  elements.forEach(element => {
      let textContent = element.textContent || element.innerText;

      // If the element contains the search query, highlight the matching text
      if (textContent.toLowerCase().includes(searchQuery)) {
          highlightText(element, searchQuery);
          foundMatches = true; // Mark that we found at least one match
      }
  });

  // If no matches were found, show a message
  if (!foundMatches) {
      messageDiv.textContent = 'No results found for "' + searchQuery + '".';
      messageDiv.classList.add('show');
  }
}

// Function to highlight matching text within an element
function highlightText(element, searchQuery) {
  let regex = new RegExp(`(${searchQuery})`, 'gi'); // Regex to find the exact word, case-insensitive
  let innerHTML = element.innerHTML;
  
  // Replace the matching text with highlighted version
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