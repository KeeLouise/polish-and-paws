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

//Hamburger menu script
function toggleMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const hamburger = document.querySelector('.hamburger-menu');
  
  mobileNav.classList.toggle('active');
  hamburger.classList.toggle('active');
}

document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);
document.querySelector('.hamburger-menu').addEventListener('touchstart', toggleMenu);

// Booking Script
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");

  const dateField = document.getElementById("date-field");
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  dateField.setAttribute("min", todayFormatted);

  const timeField = document.getElementById("time-field");
  timeField.setAttribute("min", "08:30");
  timeField.setAttribute("max", "18:00");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    const fullName = document.getElementById("full-name");
    const dogName = document.getElementById("dogs-name");
    const email = document.getElementById("email-field");
    const phone = document.getElementById("phone-field");
    const date = document.getElementById("date-field");
    const time = document.getElementById("time-field");
    const service = document.getElementById("your-message");

    document.querySelectorAll(".error-message").forEach(msg => msg.remove());

    function showError(input, message) {
      const errorMsg = document.createElement("div");
      errorMsg.className = "error-message";
      errorMsg.style.color = "red";
      errorMsg.style.fontSize = "12px";
      errorMsg.style.marginTop = "5px";
      errorMsg.textContent = message;

      if (input.parentElement) {
        input.parentElement.appendChild(errorMsg);
      }

      isValid = false;
    }

    if (fullName.value.trim() === "") {
      showError(fullName, "Full name is required");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email, "Enter a valid email address");
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value.trim())) {
      showError(phone, "Enter a valid phone number (10 digits)");
    }

    const selectedDate = new Date(date.value);
    if (!date.value.trim()) {
      showError(date, "Please select a booking date.");
    } else if (selectedDate < today) {
      showError(date, "You cannot select a past date.");
    }

    const selectedTime = time.value;
    if (!time.value.trim()) {
      showError(time, "Please select a booking time.");
    } else if (selectedTime < "08:30" || selectedTime > "18:00") {
      showError(time, "Time must be between 08:30 AM and 06:00 PM.");
    }

    if (service.value.trim() === "") {
      showError(service, "Please enter the service required.");
    }

    if (isValid) {
      alert("Booking has been received!");
      form.submit();
    }
  });
});


//Bubble animation script
function createBubble() {
  const section = document.querySelector('body');
  const createElement = document.createElement('span');
  var size = Math.random() * 60 +20;

  createElement.style.width = size + 'px';
  createElement.style.height = size + 'px';
  createElement.style.left = Math.random() * innerWidth + "px";
  section.appendChild(createElement);

  setTimeout(() => {
      createElement.remove();
  }, 2500);
}

setInterval(createBubble, 200);
