const http = require('http');
const {
    getBookById,
    getAllBooks,
    
} = require('./controllers/shelfController');

const server = http.createServer((req, res) => {
    const route = req.url;
    // /api/books/:id   [GET PUT DELETE]
    // /api/books/      [GET POST]

    const pathToBook = /\/api\/books\/([0-9a-z\-]+)/;
    const validRootPath = /\/api\/books\/?/;
    let m, id;

    if((m = route.match(pathToBook)) && req.method === 'GET'){
        id = m[1]
        getBookById(id, req, res);
    }
    else if ((m = route.match(pathToBook)) && req.method === 'PUT'){

    }
    else if ((m = route.match(pathToBook)) && req.method === 'DELETE'){

    }
    else if(route.match(validRootPath) && req.method === 'GET'){
        getAllBooks(req, res);
    }
    else if (route.match(validRootPath) && req.method === 'POST') {

    }


    else{
        res.writeHead(404, {
            'content-type': 'application/javascript'
        });
        res.end(JSON.stringify({ message: "ROUTE NOT FOUND" }))
    }
});


const PORT = process.env.PORT || 5000
server.listen(PORT)

