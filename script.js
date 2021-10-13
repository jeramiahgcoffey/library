function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let readStatus;
        if (!read) readStatus = "not read yet";
        else readStatus = "completed";
        return `${title} by ${author}, ${pages} pages, ${readStatus}`;
    };
}

const theHungerGames = new Book("The Hunger Games", "test", 999, true);

console.log(theHungerGames.info());
