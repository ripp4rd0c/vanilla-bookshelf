const Bookshelf = require('../models/shelfModel');
const { parseBodyData } = require('../utils');

async function getAllBooks(req, res){
    try {
        const books = await Bookshelf.grabAll();
        res.writeHead(200, {
            'content-type': 'applicaton/json'
        }).end(JSON.stringify(books))
    } catch (error) {
        console.log(error);
    }
}

async function getBookById(id, req, res){
    try {
        const book = await Bookshelf.findById(id);
        if(!book){
            res.writeHead(404, {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
        else{
            res.writeHead(200, {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(book));
        }    
    } catch (error) {
        console.log(error);
    }
}

async function addBook(req, res) {
    try {
        const data = await parseBodyData(req);
        const newBook = await Bookshelf.create(data);
        res.writeHead(201, {
            'content-type': 'application/json'
        }).end(JSON.stringify(newBook));
    } catch (error) {
        console.log(error);
    }
}

async function deleteBook(id, res) {
    try {
        const book = Bookshelf.findById(id);
        if(!book){
            res.writeHead(404, {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
        else{
            await Bookshelf.remove(id);
            res.writeHead(200, {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify({ message: `Book ${id} removed succesfully` }));

        }
    } catch (error) {
        console.log(error);
    }
}

async function updateBook(id, req, res){
    try {
        const old = await Bookshelf.findById(id);
        if(!old){
            res.writeHead(404, {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
        else{
            const { name, author } = await parseBodyData(req);
            const newBook = {
                name: name || old.name,
                author: author || old.author // order matters before and after the || operator
            }
            console.log(newBook);
            const updatedBook = await Bookshelf.update(id, newBook);
            res.writeHead(201, {
                'content-type': 'application/json'
            })
            res.end(JSON.stringify(updatedBook));
        }
        
    } catch (error) {
        
    }
}

module.exports = {
    getBookById,
    getAllBooks,
    addBook,
    deleteBook,
    updateBook
}