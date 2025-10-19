const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 9000;

// In-memory storage (in production, use a real database)
const users = new Map();
const sessions = new Map();

// Default admin user
users.set('admin@maasaibeadwork.com', {
  id: 'admin-1',
  email: 'admin@maasaibeadwork.com',
  password: hashPassword('admin123'), // Change this in production!
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  createdAt: new Date().toISOString()
});

// Helper functions
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function verifyToken(token) {
  return sessions.get(token);
}

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(bodyParser.json());

// Auth middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  const session = verifyToken(token);
  if (!session) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  
  req.user = session.user;
  next();
}

// Load seed data
const seedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'seed.json'), 'utf8')
);

// ============================================
// AUTH ROUTES
// ============================================

// Register new user
app.post('/store/auth/register', (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  if (users.has(email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const user = {
    id: `user-${Date.now()}`,
    email,
    password: hashPassword(password),
    firstName: first_name || '',
    lastName: last_name || '',
    role: 'customer',
    createdAt: new Date().toISOString()
  };
  
  users.set(email, user);
  
  // Create session
  const token = generateToken();
  sessions.set(token, {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    },
    expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  });
  
  res.json({
    customer: {
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName
    },
    token
  });
});

// Login
app.post('/store/auth', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  const user = users.get(email);
  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  
  // Create session
  const token = generateToken();
  sessions.set(token, {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    },
    expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  });
  
  res.json({
    customer: {
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName
    },
    token
  });
});

// Get current user
app.get('/store/auth', requireAuth, (req, res) => {
  res.json({
    customer: {
      id: req.user.id,
      email: req.user.email,
      first_name: req.user.firstName,
      last_name: req.user.lastName
    }
  });
});

// Logout
app.delete('/store/auth', requireAuth, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  sessions.delete(token);
  res.json({ message: 'Logged out successfully' });
});

// ============================================
// PRODUCT ROUTES
// ============================================
app.get('/store/products', (req, res) => {
  const { limit = 50, handle } = req.query;
  
  let products = seedData.products;
  
  // Filter by handle if provided
  if (handle) {
    products = products.filter(p => p.handle === handle);
  }
  
  // Apply limit
  products = products.slice(0, parseInt(limit));
  
  res.json({ products });
});

app.get('/store/products/:id', (req, res) => {
  const product = seedData.products.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json({ product });
});

app.get('/store/regions', (req, res) => {
  res.json({ regions: seedData.regions });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Admin routes
app.get('/admin', (req, res) => {
  const userCount = users.size;
  const sessionCount = sessions.size;
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Maasai Beadwork - Admin</title>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            max-width: 1000px;
            margin: 50px auto;
            padding: 20px;
            background: #F5F5F0;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 { color: #BB0A1E; margin-bottom: 10px; }
          h2 { color: #0A6E29; margin-top: 30px; }
          .info { background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .warning { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
          .success { background: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; }
          .products { margin-top: 30px; }
          .product { padding: 10px; border-bottom: 1px solid #eee; }
          .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
          .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
          .stat-number { font-size: 2em; font-weight: bold; color: #BB0A1E; }
          .stat-label { color: #666; margin-top: 5px; }
          a { color: #BB0A1E; text-decoration: none; }
          a:hover { text-decoration: underline; }
          code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
          .credentials { background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🌍 Maasai Beadwork - Admin Dashboard</h1>
          <p style="color: #666;">Simple Backend Server</p>
          
          <div class="success">
            <strong>✅ Backend Status:</strong> Running on port ${PORT}
          </div>
          
          <div class="stats">
            <div class="stat-card">
              <div class="stat-number">${seedData.products.length}</div>
              <div class="stat-label">Products</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${userCount}</div>
              <div class="stat-label">Registered Users</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${sessionCount}</div>
              <div class="stat-label">Active Sessions</div>
            </div>
          </div>
          
          <h2>🔐 Authentication</h2>
          <div class="credentials">
            <p><strong>Default Admin Account:</strong></p>
            <p>📧 Email: <code>admin@maasaibeadwork.com</code></p>
            <p>🔑 Password: <code>admin123</code></p>
            <p style="margin-top: 10px; color: #856404;">⚠️ Change this password in production!</p>
          </div>
          
          <div class="info">
            <p><strong>Authentication Endpoints:</strong></p>
            <ul>
              <li><code>POST /store/auth/register</code> - Register new user</li>
              <li><code>POST /store/auth</code> - Login</li>
              <li><code>GET /store/auth</code> - Get current user (requires token)</li>
              <li><code>DELETE /store/auth</code> - Logout (requires token)</li>
            </ul>
          </div>
          
          <h2>🔗 Quick Links</h2>
          <ul>
            <li><a href="http://localhost:3000" target="_blank">🏪 View Storefront</a></li>
            <li><a href="/store/products" target="_blank">📦 Products API</a></li>
            <li><a href="/health" target="_blank">❤️ Health Check</a></li>
          </ul>
          
          <h2>📦 Products (${seedData.products.length})</h2>
          <div class="products">
            ${seedData.products.map(p => `
              <div class="product">
                <strong>${p.title}</strong> - $${(p.variants[0].prices[0].amount / 100).toFixed(2)}
                <br><small style="color: #666;">${p.subtitle}</small>
              </div>
            `).join('')}
          </div>
          
          <h2>📊 API Endpoints</h2>
          <div class="info">
            <p><strong>Public Endpoints:</strong></p>
            <ul>
              <li><code>GET /store/products</code> - List all products</li>
              <li><code>GET /store/products?handle=product-handle</code> - Get product by handle</li>
              <li><code>GET /store/regions</code> - List regions</li>
            </ul>
          </div>
          
          <div class="warning">
            <p><strong>⚠️ Note:</strong> This is a simplified backend server without database persistence. Data resets on server restart.</p>
            <p>For full Medusa.js features (database, full admin dashboard, order management), install PostgreSQL and run <code>npm run dev</code>.</p>
            <p>See <code>QUICKSTART.md</code> for database setup instructions.</p>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🌍 Maasai Beadwork - Backend Server                 ║
║                                                        ║
║   Status: ✅ Running                                   ║
║   Port: ${PORT}                                           ║
║   Products: ${seedData.products.length}                                       ║
║                                                        ║
║   API: http://localhost:${PORT}/store/products          ║
║   Admin: http://localhost:${PORT}/admin                 ║
║   Health: http://localhost:${PORT}/health               ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});
