// importing dataset or (database?)
let books = require('../data/books.json');
const { writeToDatabase } = require('../utils');
const { v4:uuidv4 } = require('uuid')

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

function create(book){
    return new Promise((resolve, _) => {
        const newBook = {id: uuidv4(), ...book};
        books.push(newBook);
        writeToDatabase(JSON.stringify(books));
        resolve(newBook);
    })
}

function remove(id){
    return new Promise((resolve, _) => {
        books = books.filter(b => b.id!== id);
        writeToDatabase(JSON.stringify(books));
        resolve();
    }) 
}

function update(id, book){
    return new Promise((resolve, _) => {
        const index = books.findIndex(b => b.id === id);
        books[index] = {id, ...book};
        writeToDatabase(JSON.stringify(books));
        resolve(books[index]);
    })
}

module.exports = {
    findById,
    grabAll,
    create,
    remove,
    update
}