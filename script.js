
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission
  var signupStatus = document.getElementById('signup-status');
  var fullname = document.getElementById('fullname').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;

  // Check if all fields are filled and passwords match
  if (fullname && email && password && confirmPassword) {
    if (password === confirmPassword) {
      // Passwords match, simulate successful signup
      signupStatus.innerHTML = '<p class="success-message">Sign up successful!</p>';
      // Clear form inputs
      document.getElementById('fullname').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('confirm-password').value = '';
    } else {
      // Passwords do not match, display warning message
      signupStatus.innerHTML = '<p class="warning-message">Passwords do not match.</p>';
    }
  } else {
    // Fields are missing, display error message
    signupStatus.innerHTML = '<p class="error-message">Please fill in all fields.</p>';
  }
});

document.getElementById('show-login-button').addEventListener('click', function() {
  var loginContainer = document.getElementById('signup-container');
  loginContainer.style.display = 'block';
});

// Login Form Submission
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission
  var loginStatus = document.getElementById('login-status');
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Simulate login validation
  if (email && password) {
    // Simulating successful login
    loginStatus.innerHTML = '<p class="success-message">Login successful!</p>';
    // Clear form inputs
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  } else {
    // Simulating error in login
    loginStatus.innerHTML = '<p class="error-message">Invalid email or password.</p>';
  }
});

const bookList = document.getElementById("book-list");
const loadingMessage = document.getElementById("loading-message");
let page = 1;
let isLoading = false;

// Function to fetch books from the API
async function fetchBooks(page) {
  try {
    const response = await fetch(`https://your-api-endpoint.com/books?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching books:", error);
    return [];
  }
}

// Function to render a single book
function renderBook(book) {
  const bookItem = document.createElement("div");
  bookItem.className = "book-item";
  bookItem.innerHTML = `
    <h2>${book.title}</h2>
    <p>${book.author}</p>
    <img src="${book.thumbnail}" alt="Book Cover">
  `;
  bookList.appendChild(bookItem);
}

// Function to render the book list
function renderBooks(books) {
  books.forEach(renderBook);
}

// Function to handle scrolling and fetch more books
async function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
    isLoading = true;
    loadingMessage.style.display = "block";
    const newBooks = await fetchBooks(page);
    renderBooks(newBooks);
    page++;
    isLoading = false;
    loadingMessage.style.display = "none";
  }
}

// Attach scroll event listener for infinite scrolling
window.addEventListener("scroll", handleScroll);

// Initial fetch and render of books
fetchBooks(page)
  .then(books => {
    renderBooks(books);
    page++;
  });