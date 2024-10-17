const express = require('express'); // Mengimport express
const app = express();
const todoRouters = require('./routes/todo.js');
const port = 3000;

app.use(express.json());
app.use('/todos',todoRouters);
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index'); // Mengirimkan respons "Hello, World!" ketika root URL diakses
});

app.get('/contact',(req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`); // Gunakan backticks (``) untuk template literals
});
