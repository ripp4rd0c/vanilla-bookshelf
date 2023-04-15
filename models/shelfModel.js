// importing dataset or (database?)
const books = require('../data/books.json');

function findById(id){
    return new Promise((resolve, reject) => {
        const index = books.findIndex(b => b.id === id);
        const book = books[index];
        resolve(book);
    })

}

module.exports = {
    findById
}