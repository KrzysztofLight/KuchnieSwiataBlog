const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const dataFilePath = path.join(__dirname, 'data/Data.json');

function readData() {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  let data = readData();
  const users = data.users; // Updated to match new structure
  const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    id: newId,
    name,
    email,
    password: hashedPassword,
    isAdmin: false
  };
  users.push(newUser);
  writeData(data);
  res.status(201).json({ message: 'User registered successfully!' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const data = readData();
  if (!data) {
    return res.status(500).json({ message: 'Error reading data' });
  }
  console.log('Data read from file:', data);
  const users = data.users; // Updated to match new structure
  const user = users.find(u => u.email === email);

  if (!user) {
    console.log(`User with email ${email} not found`);
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful', user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});