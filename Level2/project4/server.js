const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// --- IN-MEMORY STORAGE (Bypasses MongoDB) ---
// This acts as your "database" for the video demo
let posts = [
    { 
        _id: '1', 
        title: 'Welcome to My Blog', 
        content: 'This is a sample post running without a database connection!', 
        createdAt: new Date() 
    }
];

// --- API ROUTES ---

// 1. READ (Get All Posts)
app.get('/posts', (req, res) => {
    res.json(posts);
});

// 2. CREATE (Add a New Post)
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    const newPost = {
        _id: Date.now().toString(), // Generate a unique ID based on time
        title,
        content,
        createdAt: new Date()
    };

    posts.unshift(newPost); // Add to the top of the list
    console.log("New post added:", title);
    res.status(201).json(newPost);
});

// 3. DELETE (Delete Post)
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    posts = posts.filter(post => post._id !== id);
    console.log("Post deleted:", id);
    res.json({ message: 'Deleted Post Successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("You can now open index.html in your browser!");
});