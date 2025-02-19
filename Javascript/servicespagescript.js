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

//Hamburger menu script

function toggleMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const hamburger = document.querySelector('.hamburger-menu');
  
  mobileNav.classList.toggle('active');
  hamburger.classList.toggle('active');
}

document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);
document.querySelector('.hamburger-menu').addEventListener('touchstart', toggleMenu);

// Navigation Script
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

class NailTrimService extends Service {
  constructor(title, price, dogSize, isForAllBreeds) {
    super(title, price, dogSize);
    this.isForAllBreeds = isForAllBreeds;
  }

  displayInfo() {
    let info = super.displayInfo();
    if (this.isForAllBreeds) {
      info += " (Available for All Breeds)";
    }
    return info;
  }
}

const services = [
  new GroomingService("Full Grooming (Small Dog)", 50, "Small", true),
  new GroomingService("Full Grooming (Medium Dog)", 70, "Medium", false),
  new GroomingService("Full Grooming (Large Dog)", 90, "Large", false),
  new BathingService("Bath, Blowdry & Brush (Small Dog)", 30, "Small", true),
  new BathingService("Bath, Blowdry & Brush (Medium Dog)", 50, "Medium", true),
  new BathingService("Bath, Blowdry & Brush (Large Dog)", 70, "Large", true),
  new NailTrimService("Nail Trim (All Breeds)", 20, "All", true),
];

document.addEventListener('DOMContentLoaded', () => {
  renderServices(services);
  document.getElementById('dog-size-select').addEventListener('change', filterServices);
});

function renderServices(servicesToRender) {
  const serviceList = document.getElementById('service-list');
  serviceList.innerHTML = ''; 
  
  servicesToRender.forEach(service => {
    const serviceItem = document.createElement('li');
    serviceItem.className = 'service-item';
    serviceItem.innerHTML = `
      <h3>${service.title}</h3>
      <p>${service.displayInfo()}</p>
    `;
    serviceList.appendChild(serviceItem);
  });
}

function filterServices() {
  const selectedSize = document.getElementById('dog-size-select').value;
  const filteredServices = services.filter(service => 
    selectedSize === 'All' || service.dogSize === selectedSize || service.dogSize === 'All'
  );

  renderServices(filteredServices);
}