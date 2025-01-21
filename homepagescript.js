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

    // the below line will reset any previous highlighted text
    this.resetHighlights();

    this.messageDiv.textContent = '';
    this.messageDiv.classList.remove('show');

    if (!searchQuery) {
      this.displayMessage('Please enter asearch term');
      return;
    }
  }}