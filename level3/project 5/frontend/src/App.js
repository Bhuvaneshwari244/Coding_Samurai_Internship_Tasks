import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [view, setView] = useState('login'); // 'login', 'shop', 'cart'
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from our backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const login = (e) => {
    e.preventDefault();
    // Fake login call
    axios.post('http://localhost:5000/api/login', { email: 'test@test.com' })
      .then(res => {
        setUser(res.data);
        setView('shop');
      });
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(product.name + " added to cart!");
  };

  return (
    <div className="App">
      <nav style={{ padding: '20px', backgroundColor: '#282c34', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <h2>MERN Shop</h2>
        {user && (
          <div>
            <span>Hello, {user.name} </span>
            <button onClick={() => setView('shop')}>Products</button>
            <button onClick={() => setView('cart')}>Cart ({cart.length})</button>
            <button onClick={() => { setUser(null); setView('login'); }}>Logout</button>
          </div>
        )}
      </nav>

      <main style={{ padding: '20px' }}>
        {view === 'login' && (
          <div style={{ margin: '50px auto', width: '300px', textAlign: 'center' }}>
            <h3>Please Sign In</h3>
            <form onSubmit={login}>
              <input type="email" placeholder="Email" required style={{ padding: '10px', width: '100%', marginBottom: '10px' }} />
              <input type="password" placeholder="Password" required style={{ padding: '10px', width: '100%', marginBottom: '10px' }} />
              <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Login</button>
            </form>
          </div>
        )}

        {view === 'shop' && (
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {products.map(p => (
              <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', width: '200px', borderRadius: '8px' }}>
                <img src={p.image} alt={p.name} style={{ width: '100px', height: '100px', backgroundColor: '#eee' }} />
                <h3>{p.name}</h3>
                <p>${p.price}</p>
                <button onClick={() => addToCart(p)} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}

        {view === 'cart' && (
          <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? <p>Cart is empty</p> : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && <h3>Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</h3>}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;