// models/game.js - Game model
const db = require('../services/db');

class Game {
    // Game properties
    id;
    title;
    description;
    platform;
    release_date;
    
    constructor(id = null) {
        this.id = id;
    }
    
    // Get game by ID
    async getGameById() {
        if (!this.id) return false;
        
        const sql = "SELECT * FROM Games WHERE id = ?";
        const result = await db.query(sql, [this.id]);
        
        if (result.length) {
            this.title = result[0].title;
            this.description = result[0].description;
            this.platform = result[0].platform;
            this.release_date = result[0].release_date;
            return true;
        }
        return false;
    }
    
    // Get all games
    static async getAllGames() {
        const sql = "SELECT * FROM Games ORDER BY title";
        return await db.query(sql);
    }
    
    // Get games by category
    static async getGamesByCategory(categoryId) {
        const sql = `
            SELECT g.* 
            FROM Games g 
            JOIN Game_Category gc ON g.id = gc.game_id 
            WHERE gc.category_id = ?
        `;
        return await db.query(sql, [categoryId]);
    }
    
    // Get categories for a game
    async getGameCategories() {
        if (!this.id) return [];
        
        const sql = `
            SELECT c.* 
            FROM Categories c 
            JOIN Game_Category gc ON c.id = gc.category_id 
            WHERE gc.game_id = ?
        `;
        return await db.query(sql, [this.id]);
    }
    
    // Get tips for a game
    async getGameTips() {
        if (!this.id) return [];
        
        const sql = `
            SELECT t.*, u.username 
            FROM Tips t 
            JOIN Users u ON t.user_id = u.id 
            WHERE t.game_id = ?
        `;
        return await db.query(sql, [this.id]);
    }
}

module.exports = Game;