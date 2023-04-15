// importing dataset or (database?)
const books = require('../data/books.json');

function findById(id){
    return new Promise((resolve, reject) => {
        const index = books.findIndex(b => b.id === id);
        const book = books[index];
        resolve(book);
    })

}

function grabAll () {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
}


module.exports = {
    findById,
    grabAll
}