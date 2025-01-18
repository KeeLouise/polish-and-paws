//Search bar script
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

//Service List Script
const services = [
    { title: "Bath, Blowdry & Brush (Small Dog)", price: 30, dogSize: "Small " },
    { title: "Bath, Blowdry & Brush (Medium Dog)", price: 50, dogSize: "Medium " },
    { title: "Bath, Blowdry & Brush (Large Dog)", price: 70, dogSize: "Large " },
    { title: "Full Grooming (Small Dog)", price: 50, dogSize: "Small " },
    { title: "Full Grooming (Medium Dog)", price: 70, dogSize: "Medium " },
    { title: "Full Grooming (Large Dog)", price: 90, dogSize: "Large " },
    { title: "Nail Trim (All Breeds)", price: 20, dogSize: "All " },
    { title: "Flea Treatment (All Breeds)", price: 30, dogSize: "All " },
    { title: "Teeth Cleaning (All Breeds - Behaviour Dependent)", price: 25, dogSize: "All " }
];

const serviceList = document.getElementById('service-list');
const dogSizeFilter = document.getElementById('dog-size-filter');

function renderServices(filteredServices) {
    serviceList.innerHTML = '';
    filteredServices.forEach(service=> {
        const serviceItem = document.createElement('li');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
        <h3>${service.title}</h3>
        <p>Price: $${service.price}</p>
        <p>Suitable for: ${service.dogSize}dogs</p>
        `;
        serviceList.appendChild(serviceItem);

    });
}
renderServices(services);

function filterServices(){
    const selectedSize = dogSizeFilter.value;

    const filteredServices = services.filter(service=>
        selectedSize ==='All ' || service.dogSize === selectedSize || service.dogSize === 'All '
    );

    renderServices(filteredServices);
    
}

dogSizeFilter.addEventListener('change', filterServices);