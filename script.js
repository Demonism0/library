function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}
let myLibrary = [];

function displayBooks() {
    cards.innerHTML = ''; // clears all the currently displayed books
    for (let book of myLibrary) { // creates a card for each book
        let card = document.createElement('div');
        card.classList.add('book');
        cards.appendChild(card);

        let title = document.createElement('p');
        let author = document.createElement('p')
        let pages = document.createElement('p');
        let read = document.createElement('p');
        title.classList.add('title');
        author.classList.add('author');
        pages.classList.add('pages');
        read.classList.add('read');
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.read;
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);

        // indexNum will be "remapped" every time displayBooks() is called
        // displayBooks is called every time 'Delete' button is clicked so that
        // indexNum will always correspond to the correct Array index
        let indexNum = myLibrary.indexOf(book);
        let delButton = document.createElement('button');
        card.appendChild(delButton);
        delButton.textContent = 'Delete';
        delButton.addEventListener('click', () => {
            myLibrary.splice(indexNum, 1);
            displayBooks();
        });

        let readButton = document.createElement('button');
        card.appendChild(readButton);
        if (book.read === true) {
            readButton.textContent = 'Unread';
        } else if (book.read === false) {
            readButton.textContent = 'Read';
        }
        readButton.addEventListener('click', () => {
            book.changeReadStatus()
        });
    }
}
const cards = document.querySelector('.card-container');

Book.prototype.changeReadStatus = function() {
    if (this.read === false) {
        this.read = true;
    } else if (this.read === true) {
        this.read = false;
    }
    displayBooks();
}

const dialog = document.querySelector('dialog');
const showButton = document.querySelector('button#new');
const cfmButton = document.querySelector('button#cfm');
const cancelButton = document.querySelector('button#cancel');
const newBookTitle = document.querySelector('#title');
const newBookAuthor = document.querySelector('#author');
const newBookPages = document.querySelector('#pages');
const newBookRead = document.querySelector('#read');

showButton.addEventListener('click', () => {
    dialog.showModal();
});
cancelButton.addEventListener('click', () => {
    dialog.close();
})
cfmButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!newBookTitle.value || !newBookAuthor.value || !newBookPages.value) {
        alert('You need to fill in all the boxes!');
        return;
    }
    let isBookRead;
    if (newBookRead.checked) {
        isBookRead = true;
    } else {
        isBookRead = false;
    }
    newBook = new Book(newBookTitle.value, newBookAuthor.value,
        Number(newBookPages.value), isBookRead);
    addBookToLibrary(newBook);
    dialog.close();
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookPages.value = '';
    displayBooks();
})