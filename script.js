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
        if (!this.isBookInLibrary(bookToAdd)) {
            this.books.push(bookToAdd);
        }
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

    getBook(title) {
        return this.books.find((book) => book.title === title);
    }

    isBookInLibrary(bookToCheck) {
        return this.books.some(
            (book) =>
                book.title === bookToCheck.title &&
                book.author === bookToCheck.author
        );
    }
}

const myLibrary = new Library();

// User Interface
const bookModal = document.querySelector(".add-book-modal");
const openBookModalButton = document.querySelector(".btn-open-modal");
const closeBookModalButton = document.querySelector(".btn-close-modal");
const addBookForm = document.querySelector("#add-book-form");
const libraryGrid = document.querySelector("#library-container");
const overlay = document.querySelector(".overlay");

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

        bookTitle.textContent = `"${book.title}"`;
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
    saveLocal();
    populateLibraryGrid();
}

function removeBookFromLibrary(index) {
    myLibrary.removeBook(index);
    saveLocal();
    populateLibraryGrid();
}

function createBookFromInput() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("has-read").checked;
    addBookToLibrary(title, author, pages, hasRead);
}

// Event Handlers
function openBookModal() {
    bookModal.classList.add("active");
    overlay.style.display = "block";
    addBookForm.reset();
}

function closeBookModal() {
    bookModal.classList.remove("active");
    overlay.style.display = "none";
}

function submitBook(e) {
    e.preventDefault();
    createBookFromInput();
    closeBookModal();
}

function toggleReadStatus(e) {
    const title =
        e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', "");
    const book = myLibrary.getBook(title);
    book.read = !book.read;
    saveLocal();
    populateLibraryGrid();
}

function removeBook(e) {
    removeBookFromLibrary(e.target.dataset.indexNumber);
}

function handleKeyPress(e) {
    if (e.key === "Escape") {
        closeBookModal();
    }
}

openBookModalButton.onclick = openBookModal;
closeBookModalButton.onclick = closeBookModal;
addBookForm.onsubmit = submitBook;
window.onkeydown = handleKeyPress;

// Local storage
const saveLocal = () => {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary.books));
};

const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem("myLibrary"));
    if (books) {
        myLibrary.books = books.map((book) => JSONToBook(book));
    } else {
        myLibrary.books = [];
    }
    populateLibraryGrid();
};

const JSONToBook = (book) => {
    return new Book(book.title, book.author, book.pages, Boolean(book.read));
};

window.onload = restoreLocal;
