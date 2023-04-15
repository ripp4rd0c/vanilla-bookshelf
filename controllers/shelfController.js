const Bookshelf = require('../models/shelfModel');

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


module.exports = {
    getBookById,
    getAllBooks
}