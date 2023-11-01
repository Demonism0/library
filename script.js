class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;  
        this.addToLib();
        Book.displayBooks();
    }

    addToLib() {
        myLibrary.push(this);
    }

    createCard() {
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
        title.textContent = this.title;
        author.textContent = this.author;
        pages.textContent = this.pages;
        read.textContent = this.read;
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);

        let delButton = document.createElement('button');
        card.appendChild(delButton);
        delButton.textContent = 'Delete';
        delButton.addEventListener('click', () => {
            this.delete();
        });

        let readButton = document.createElement('button');
        card.appendChild(readButton);
        if (this.read === true) {
            readButton.textContent = 'Unread';
        } else if (this.read === false) {
            readButton.textContent = 'Read';
        }
        readButton.addEventListener('click', () => {
            this.changeReadStatus();
        });
    }

    static displayBooks() {
        cards.innerHTML = ''; // clears all the currently displayed books
        for (let book of myLibrary) { // creates a card for each book
            book.createCard(); // every card is re-created
        }
    }

    delete() {
        let indexNum = myLibrary.indexOf(this);
        myLibrary.splice(indexNum, 1);
        Book.displayBooks();
    }

    changeReadStatus() {
        if (this.read === false) {
            this.read = true;
        } else if (this.read === true) {
            this.read = false;
        }
        Book.displayBooks();
    }
}

let myLibrary = [];

const cards = document.querySelector('.card-container');

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
    new Book(newBookTitle.value, newBookAuthor.value,
        Number(newBookPages.value), isBookRead);
    dialog.close();
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookPages.value = '';
})