// Search Script OOP
class SearchHighlighter {
  constructor(searchBarId, searchButtonId, messageDivId) {
    this.searchBar = document.getElementById(searchBarId);
    this.messageDiv = document.getElementById(messageDivId);
    this.searchButton = document.getElementById(searchButtonId);

    if (this.searchButton) {
      this.searchButton.addEventListener('click', () => this.searchContent());
    }
  }

  searchContent() {
    let searchQuery = this.searchBar.value.trim().toLowerCase();

    // Reset any previous highlights
    this.resetHighlights();

    this.messageDiv.textContent = '';
    this.messageDiv.classList.remove('show');

    if (!searchQuery) {
      this.displayMessage('Please enter a search term');
      return;
    }

    let elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    let foundMatches = false;

    elements.forEach(element => {
      let textContent = element.textContent || element.innerText;

      if (textContent.toLowerCase().includes(searchQuery)) {
        this.highlightText(element, searchQuery);
        foundMatches = true;
      }
    });

    if (!foundMatches) {
      this.displayMessage(`No results found for "${searchQuery}"`);
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

  displayMessage(message) {
    this.messageDiv.textContent = message;
    this.messageDiv.classList.add('show');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SearchHighlighter('search-bar', 'search-button', 'message');
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

