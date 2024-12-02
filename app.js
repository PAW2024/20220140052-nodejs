const express = require('express'); // Mengimpor express
const app = express();
const todoRouters = require('./routes/tododb.js'); // lokal
require('dotenv').config();
const port = process.env.PORT;
const db = require('./database/db');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
// Mengimpor middleware
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/middleware.js');

app.use(expressLayouts);
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Konfigurasi express-session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Gunakan secret key yang aman
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));

// Routes
app.use('/todos', todoRouters);
app.set('view engine', 'ejs');

// Menggunakan route auth
app.use('/', authRoutes);

// Route untuk halaman utama
app.get('/', isAuthenticated, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layout',
        currentPage: 'home',  // Pass 'home' as the current page
        showNavbar: true
    });
});

// Route untuk halaman todo-view
app.get('/todo-view', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM todos', (err, todos) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('todo', {
            layout: 'layouts/main-layout',
            todos: todos,
            currentPage: 'todo',  // Pass 'todo' as the current page
            showNavbar: true
        });
    });
});

// Route untuk halaman contact
app.get('/contact', isAuthenticated, (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layout',
        currentPage: 'contact',  // Pass 'contact' as the current page
        showNavbar: true
    });
});


// Contoh untuk halaman login yang tidak membutuhkan navbar
app.get('/login', (req, res) => {
    res.render('login', {
        layout: 'layouts/main-layout',
        showNavbar: false  // Tidak menampilkan navbar di halaman login
    });
});


// Route untuk logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login'); // Redirect ke halaman login setelah logout
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
