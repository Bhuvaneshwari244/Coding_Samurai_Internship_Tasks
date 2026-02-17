const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- MOCK DATA (Updated with Real Images) ---
const products = [
    { 
        id: 1, 
        name: 'Wireless Headphones', 
        price: 79.99, 
        description: 'Noise cancelling, 20h battery.', 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' 
    },
    { 
        id: 2, 
        name: 'Smart Watch', 
        price: 199.99, 
        description: 'Tracks heart rate and steps.', 
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80' 
    },
    { 
        id: 3, 
        name: 'Gaming Mouse', 
        price: 49.99, 
        description: 'RGB lights, high precision.', 
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=300&q=80' 
    },
    { 
        id: 4, 
        name: 'Laptop Stand', 
        price: 29.99, 
        description: 'Aluminum, adjustable height.', 
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=300&q=80' 
    }
];

// --- ROUTES ---

// 1. Get All Products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 2. Login (Fake success for demo)
app.post('/api/login', (req, res) => {
    // Accepts any email/password for the demo video
    res.json({ name: "Intern Demo User", email: req.body.email, token: "fake-jwt-token" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});