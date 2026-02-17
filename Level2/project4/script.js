// script.js (Full CRUD functionality)

const postForm = document.getElementById('postForm');
const blogPostsDiv = document.getElementById('blogPosts');
const messageElement = document.getElementById('message');

const editModal = document.getElementById('editModal');
const closeButton = document.querySelector('.close-button');
const editForm = document.getElementById('editForm');
const editPostIdInput = document.getElementById('editPostId');
const editPostTitleInput = document.getElementById('editPostTitle');
const editPostContentInput = document.getElementById('editPostContent');


// --- Helper: Render posts from the API response ---
const renderPosts = (posts) => {
    blogPostsDiv.innerHTML = '';
    
    if (posts.length === 0) {
        blogPostsDiv.innerHTML = '<p>No posts found. Be the first to publish!</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-card');
        postElement.dataset.id = post._id; // Store ID for actions
        
        const date = new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p class="date">Published on: ${date}</p>
            <p>${post.content}</p>
            <div class="actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        blogPostsDiv.appendChild(postElement);
    });
};

// --- READ Operation: Fetch all posts ---
const fetchPosts = async () => {
    try {
        const response = await fetch('/posts');
        const posts = await response.json();
        renderPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        blogPostsDiv.innerHTML = '<p>Could not load posts. Ensure the Node.js server is running and connected to MongoDB.</p>';
    }
};

// --- CREATE Operation: Handle form submission ---
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    messageElement.textContent = 'Publishing...';
    
    try {
        const response = await fetch('/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });

        const result = await response.json();

        if (response.ok) {
            messageElement.textContent = `Post "${result.title}" published successfully!`;
            postForm.reset();
            fetchPosts(); // Refresh the list
        } else {
            messageElement.textContent = `Error publishing post: ${result.message}`;
        }

    } catch (error) {
        console.error('Network error:', error);
        messageElement.textContent = 'A network error occurred while publishing.';
    }
});


// --- DELETE & EDIT Event Delegation ---
blogPostsDiv.addEventListener('click', (e) => {
    const postCard = e.target.closest('.post-card');
    if (!postCard) return;

    const postId = postCard.dataset.id;

    if (e.target.classList.contains('delete-btn')) {
        // DELETE Operation
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost(postId);
        }
    } else if (e.target.classList.contains('edit-btn')) {
        // Prepare EDIT Modal
        const title = postCard.querySelector('h3').textContent;
        const content = postCard.querySelector('p:not(.date)').textContent; 
        
        editPostIdInput.value = postId;
        editPostTitleInput.value = title;
        editPostContentInput.value = content;
        
        editModal.style.display = 'block';
    }
});

const deletePost = async (id) => {
    messageElement.textContent = 'Deleting post...';
    try {
        const response = await fetch(`/posts/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            messageElement.textContent = result.message;
            fetchPosts(); // Refresh the list
        } else {
            messageElement.textContent = `Error deleting: ${result.message}`;
        }
    } catch (error) {
        messageElement.textContent = 'A network error occurred during deletion.';
    }
};

// --- UPDATE Operation: Handle Edit Form Submission ---
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = editPostIdInput.value;
    const title = editPostTitleInput.value;
    const content = editPostPostContentInput.value;
    
    editModal.style.display = 'none';
    messageElement.textContent = 'Saving changes...';

    try {
        const response = await fetch(`/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });

        const result = await response.json();

        if (response.ok) {
            messageElement.textContent = 'Post updated successfully!';
            fetchPosts(); // Refresh the list
        } else {
            messageElement.textContent = `Error updating: ${result.message}`;
        }
    } catch (error) {
        messageElement.textContent = 'A network error occurred during update.';
    }
});


// --- Modal Close Logic ---
closeButton.onclick = function() {
    editModal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == editModal) {
        editModal.style.display = 'none';
    }
};


// Initial load
document.addEventListener('DOMContentLoaded', fetchPosts);