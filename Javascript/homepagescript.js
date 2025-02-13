// Search Script
class SearchHighlighter {
  constructor(searchBarId, searchButtonId, messageDivId) {
    this.searchBar = document.getElementById(searchBarId);
    this.messageDiv = document.getElementById(messageDivId);
    this.searchButton = document.getElementById(searchButtonId);

    if (this.searchButton) {
      this.searchButton.addEventListener('click', () => this.searchContent());
    } else {
      console.error('Search button not found!');
    }
  }
  searchContent() {
    let searchQuery = this.searchBar.value.trim().toLowerCase();
    this.resetHighlights();

    this.messageDiv.textContent = '';
    this.messageDiv.classList.remove('show');

    if (!searchQuery) {
      this.showMessage('Please enter a search term');
      return;
    }

    let elements = document.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, span, label, input, textarea, select'
    );
    let foundMatches = false;

    elements.forEach(element => {
      let textContent = element.textContent || element.innerText;

      if (textContent.toLowerCase().includes(searchQuery)) {
        this.highlightText(element, searchQuery);
        foundMatches = true;
      }
    });

    if (!foundMatches) {
      this.showMessage(`No results for "${searchQuery}"`);
    }
  }

  highlightText(element, searchQuery) {
    searchQuery = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let regex = new RegExp(`(${searchQuery})`, 'gi');
    let innerHTML = element.innerHTML;
    element.innerHTML = innerHTML.replace(regex, `<span class="highlight">$1</span>`);
  }

  resetHighlights() {
    let highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
      element.classList.remove('highlight');
    });
  }

  showMessage(message) {
    this.messageDiv.textContent = message;
    this.messageDiv.classList.add('show');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SearchHighlighter('search-bar', 'search-button', 'message');
});

// Nav Script
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

// Gallery Script
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

// Newsletter script
const toggleButton = document.getElementById('newsletter-toggle');
const dropdown = document.getElementById('newsletter-dropdown');
const form = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('newslettermessage');

toggleButton.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  dropdown.style.maxHeight = dropdown.style.maxHeight === '300px' ? '0' : '300px';
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    messageDiv.textContent = 'Please enter a valid email address!';
    messageDiv.classList.add('error');
    messageDiv.classList.remove('success');
    messageDiv.style.display = 'block';
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    messageDiv.textContent = 'Please enter a valid email address!';
    messageDiv.classList.add('error');
    messageDiv.classList.remove('success');
    messageDiv.style.display = 'block';
    return;
  }

  messageDiv.textContent = `Thank you for joining our Newsletter, ${email}!`;
  messageDiv.classList.add('success');
  messageDiv.classList.remove('error');
  messageDiv.style.display = 'block';

  
  emailInput.value = '';
});

