const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const usersFilePath = path.join(__dirname, 'data/Data.json');

function readUsers() {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data).users;
}

function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2));
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  let users = readUsers();
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
  writeUsers(users);
  res.status(201).json({ message: 'User registered successfully!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});