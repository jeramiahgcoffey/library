let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
} 

Book.prototype.info = function () {
    let readStatus;
    if (!read) readStatus = "not read yet";
    else readStatus = "completed";
    return `${title} by ${author}, ${pages} pages, ${readStatus}`;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("The Hunger Games", "test", 999, true)
addBookToLibrary("The Hunger Games", "test", 999, true)
addBookToLibrary("The Hunger Games", "test", 999, false)
addBookToLibrary("The Hunger Games", "test", 999, true)
addBookToLibrary("The Hunger Games", "test", 999, true)
addBookToLibrary("The Hunger Games", "test", 999, true)
addBookToLibrary("This is My Book", "Jeramiah Coffey", 1929283, true)
// console.log(myLibrary)

function displayLibrary() {
    const library = document.querySelector("#library-container");

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i]
        const libraryContainer = document.querySelector("#library-container")

        const newCard = document.createElement("div");
        newCard.classList.add("card");
        libraryContainer.appendChild(newCard);

        const cardTop = document.createElement("div");
        cardTop.classList.add("card-top");

        const bookTitle = document.createElement("div");
        bookTitle.classList.add("title");
        bookTitle.textContent = book.title;
        cardTop.appendChild(bookTitle);

        const bookAuthor = document.createElement("div");
        bookAuthor.classList.add("author")
        bookAuthor.textContent = book.author;
        cardTop.appendChild(bookAuthor);
        newCard.appendChild(cardTop);

        const bookPages = document.createElement("div");
        bookPages.classList.add("pages");
        bookPages.textContent = book.pages + " Pages";
        newCard.appendChild(bookPages);

        const bookReadStatus = document.createElement("div");
        bookReadStatus.classList.add("read-status");
        let readTextContent;
        if (!book.read) readTextContent = "Incomplete";
        else readTextContent = "Completed"
        bookReadStatus.textContent = readTextContent;
        newCard.appendChild(bookReadStatus);

        libraryContainer.appendChild(newCard);
    }
}
displayLibrary()