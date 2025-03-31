// app.js - Main application file
const express = require('express');
const path = require('path');
const Game = require('./models/game');
const Tip = require('./models/tip');
const Category = require('./models/category');
const User = require('./models/user');

// Initialize express app
const app = express();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../static')));

// Set up the Pug templating engine
app.set('view engine', 'pug');
app.set('views', '/usr/src/app/app/views');

// Home page route
app.get('/', async (req, res) => {
    try {
        // Get recent tips and games for the home page
        const tips = await Tip.getAllTips();
        const games = await Game.getAllGames();
        const categories = await Category.getAllCategories();
        
        res.render('home', {
            title: 'Game Gurus - Gaming Tips & Tricks',
            tips: tips.slice(0, 3), // Show only 3 tips
            games: games,
            categories: categories
        });
    } catch (error) {
        console.error('Error loading home page:', error);
        res.status(500).send('Server error');
    }
});

// Games list route
app.get('/games', async (req, res) => {
    try {
        const games = await Game.getAllGames();
        const categories = await Category.getAllCategories();
        
        res.render('games', {
            title: 'All Games',
            games: games,
            categories: categories
        });
    } catch (error) {
        console.error('Error loading games:', error);
        res.status(500).send('Server error');
    }
});

// Game detail route
app.get('/games/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const game = new Game(gameId);
        
        // Get game details
        await game.getGameById();
        
        // Get game categories
        const categories = await game.getGameCategories();
        
        // Get tips for this game
        const tips = await game.getGameTips();
        
        res.render('game-detail', {
            title: game.title,
            game: game,
            categories: categories,
            tips: tips
        });
    } catch (error) {
        console.error('Error loading game details:', error);
        res.status(500).send('Server error');
    }
});

// Filter games by category
app.get('/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = new Category(categoryId);
        
        // Get category details
        await category.getCategoryById();
        
        // Get games in this category
        const games = await Game.getGamesByCategory(categoryId);
        
        // Get all categories for navigation
        const categories = await Category.getAllCategories();
        
        res.render('games', {
            title: `${category.name} Games`,
            games: games,
            categories: categories,
            currentCategory: categoryId
        });
    } catch (error) {
        console.error('Error loading category games:', error);
        res.status(500).send('Server error');
    }
});

// Tips list route
app.get('/tips', async (req, res) => {
    try {
        const tips = await Tip.getAllTips();
        
        res.render('tips', {
            title: 'All Tips & Tricks',
            tips: tips
        });
    } catch (error) {
        console.error('Error loading tips:', error);
        res.status(500).send('Server error');
    }
});

// Tip detail route
app.get('/tips/:id', async (req, res) => {
    try {
        const tipId = req.params.id;
        const tip = new Tip(tipId);
        
        // Get tip details
        await tip.getTipById();
        
        res.render('tip-detail', {
            title: tip.title,
            tip: tip
        });
    } catch (error) {
        console.error('Error loading tip details:', error);
        res.status(500).send('Server error');
    }
});

// Users list route
app.get('/users', async (req, res) => {
    try {
        const users = await User.getAllUsers();
        
        res.render('users', {
            title: 'Community Members',
            users: users
        });
    } catch (error) {
        console.error('Error loading users:', error);
        res.status(500).send('Server error');
    }
});

// User profile route
app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = new User(userId);
        
        // Get user details
        await user.getUserById();
        
        // Get tips by this user
        const userTips = await user.getUserTips();
        
        res.render('user-detail', {
            title: `${user.username}'s Profile`,
            user: user,
            tips: userTips
        });
    } catch (error) {
        console.error('Error loading user profile:', error);
        res.status(500).send('Server error');
    }
});

// Auth routes (placeholders for Sprint 3)
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});

// About page
app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About Game Gurus'
    });
});

// 404 - Not Found
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

module.exports = app;