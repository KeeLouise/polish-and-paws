//Search script
class Search {
  constructor(searchBarId, messageId, searchButtonId) {
    this.searchBar = document.getElementById(searchBarId);
    this.messageDiv = document.getElementById(messageId);
    this.searchButton = document.getElementById(searchButtonId);
    this.searchButton.addEventListener('click', () => this.searchContent());
  }

  searchContent() {
    let searchQuery = this.searchBar.value.trim().toLowerCase();
    this.clearHighlights();

    this.messageDiv.textContent = '';
    this.messageDiv.classList.remove('show');

    if (!searchQuery) {
      this.showMessage('Please enter a search term');
      return;
    }

    let foundMatches = false;

    let elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, input, textarea');
    
    elements.forEach(element => {
      let textContent = '';
      if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
        textContent = element.value.toLowerCase();
      } else {
        textContent = element.textContent || element.innerText;
      }
      if (textContent.includes(searchQuery)) {
        this.highlightText(element, searchQuery);
        foundMatches = true;
      }
    });

    if (!foundMatches) {
      this.showMessage(`No results found for "${searchQuery}"`);
    }
  }

  clearHighlights() {
    let highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
      element.classList.remove('highlight');
      element.innerHTML = element.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
    });

    let formFields = document.querySelectorAll('input.highlight, textarea.highlight');
    formFields.forEach(field => {
      field.classList.remove('highlight');
      field.style.backgroundColor = '';
    });
  }

  highlightText(element, searchQuery) {
    let regex = new RegExp(`(${searchQuery})`, 'gi');
    
    if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
      element.style.backgroundColor = '#ffff99';
    } else {
      let innerHTML = element.innerHTML;
      element.innerHTML = innerHTML.replace(regex, `<span class="highlight">$1</span>`);
    }
  }

  showMessage(message) {
    this.messageDiv.textContent = message;
    this.messageDiv.classList.add('show');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const search = new Search('search-bar', 'message', 'search-button');
});

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
