// models/category.js - Category model
const db = require('../services/db');

class Category {
    // Category properties
    id;
    name;
    
    constructor(id = null) {
        this.id = id;
    }
    
    // Get category by ID
    async getCategoryById() {
        if (!this.id) return false;
        
        const sql = "SELECT * FROM Categories WHERE id = ?";
        const result = await db.query(sql, [this.id]);
        
        if (result.length) {
            this.name = result[0].name;
            return true;
        }
        return false;
    }
    
    // Get all categories
    static async getAllCategories() {
        const sql = "SELECT * FROM Categories ORDER BY name";
        return await db.query(sql);
    }
}

module.exports = Category;