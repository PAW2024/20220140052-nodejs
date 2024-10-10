const express = require('express'); // Mengimport express
const app = express();
const port = 3000;

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
