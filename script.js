class Book {
    constructor(
        title = "Unknown",
        author = "Unknown",
        pages = "Unknown",
        read = false
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(bookToAdd) {
        this.books.push(bookToAdd);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }
}

const myLibrary = new Library();

// User Interface
const bookModal = document.querySelector(".add-book-modal");
const openBookModalButton = document.querySelector(".btn-open-modal");
const closeBookModalButton = document.querySelector(".btn-close-modal");
const addBookForm = document.querySelector("#add-book-form");
const libraryGrid = document.querySelector("#library-container");

function clearLibraryGrid() {
    while (libraryGrid.firstChild) {
        libraryGrid.removeChild(libraryGrid.lastChild);
    }
}

function populateLibraryGrid() {
    clearLibraryGrid();
    let index = 0;
    for (const book of myLibrary.books) {
        const newCard = document.createElement("div");
        const bookTitle = document.createElement("div");
        const bookAuthor = document.createElement("div");
        const bookPages = document.createElement("div");
        const cardButtons = document.createElement("div");
        const bookReadStatus = document.createElement("div");
        const removeButton = document.createElement("div");

        newCard.classList.add("card");
        bookTitle.classList.add("title");
        bookAuthor.classList.add("author");
        bookPages.classList.add("pages");
        cardButtons.classList.add("card-btn-container");
        bookReadStatus.classList.add("read-status", "noselect");
        removeButton.classList.add("remove-button", "noselect");

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.pages + " Pages";
        if (!book.read) {
            bookReadStatus.textContent = "Not Read";
        } else {
            bookReadStatus.textContent = "Read";
            bookReadStatus.classList.toggle("read");
        }
        removeButton.textContent = "Remove Book";

        removeButton.dataset.indexNumber = index;

        bookReadStatus.addEventListener("click", toggleReadStatus);
        removeButton.addEventListener("click", removeBook);

        newCard.appendChild(bookTitle);
        newCard.appendChild(bookAuthor);
        newCard.appendChild(bookPages);
        cardButtons.appendChild(bookReadStatus);
        cardButtons.appendChild(removeButton);
        newCard.appendChild(cardButtons);

        libraryGrid.appendChild(newCard);

        index++;
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.addBook(new Book(title, author, pages, read));
    populateLibraryGrid();
}

function removeBookFromLibrary(index) {
    myLibrary.removeBook(index);
    populateLibraryGrid();
}

function changeReadStatus(status) {
    return status == "Read" ? "Not Read" : "Read";
}

function createBookFromInput() {
    const title = `"${document.getElementById("title").value}"`;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("has-read").checked;
    addBookToLibrary(title, author, pages, hasRead);
}

// Event Handlers
function openBookModal() {
    bookModal.style.display = "block";
    addBookForm.reset();
}

function closeBookModal() {
    bookModal.style.display = "none";
}

function submitBook(e) {
    e.preventDefault();
    createBookFromInput();
    closeBookModal();
}

function toggleReadStatus(e) {
    e.target.classList.toggle("read");
    e.target.textContent = changeReadStatus(e.target.textContent);
}

function removeBook(e) {
    removeBookFromLibrary(e.target.dataset.indexNumber);
    populateLibraryGrid();
}

openBookModalButton.onclick = openBookModal;
closeBookModalButton.onclick = closeBookModal;
addBookForm.onsubmit = submitBook;

window.onload = populateLibraryGrid;
