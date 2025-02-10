//Search Script OOP
class SearchHighlighter {
  constructor(searchBarId, messageDivId) {
    this.searchBar = document.getElementById(searchBarId);
    this.messageDiv = document.getElementById(messageDivId);

    this.searchButton = document.querySelector('button');
    this.searchButton.addEventListener('click', () => this.searchContent());
  }

  searchContent() {
    let searchQuery = this.searchBar.value.trim().toLowerCase();

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

class ExactSearchHighlighter extends SearchHighlighter {
  constructor(searchBarId, messageDivId) {
    super(searchBarId, messageDivId);
  }

  searchContent() {
    let searchQuery = this.searchBar.value.trim().toLowerCase();
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

      if (textContent.toLowerCase() === searchQuery) {
        this.highlightText(element, searchQuery);
        foundMatches = true;
      }
    });

    if (!foundMatches) {
      this.displayMessage(`No exact match found for "${searchQuery}"`);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SearchHighlighter('search-bar', 'message');
  
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

// Service Script


class Service {
  constructor(title, price, dogSize) {
    this.title = title;
    this.price = price;
    this.dogSize = dogSize;
  }

  displayInfo() {
    return `${this.title} - Price: $${this.price} - Suitable for: ${this.dogSize} dogs`;
  }
}

class GroomingService extends Service {
  constructor(title, price, dogSize, includesTeethCleaning) {
    super(title, price, dogSize);
    this.includesTeethCleaning = includesTeethCleaning;
  }

  displayInfo() {
    let info = super.displayInfo();
    if (this.includesTeethCleaning) {
      info += " (Includes Teeth Cleaning)";
    }
    return info;
  }
}

class BathingService extends Service {
  constructor(title, price, dogSize, includesBlowDry) {
    super(title, price, dogSize);
    this.includesBlowDry = includesBlowDry;
  }

  displayInfo() {
    let info = super.displayInfo();
    if (this.includesBlowDry) {
      info += " (Includes Blow Dry)";
    }
    return info;
  }
}