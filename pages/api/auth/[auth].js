export default (req, res) => {
    if (req.method === 'POST') {
      const { username, password } = req.body;
      
      // Mock user data
      const mockUser = { username: 'testuser', password: 'password123' };
  
      if (username === mockUser.username && password === mockUser.password) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  };
  