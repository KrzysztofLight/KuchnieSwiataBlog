const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(cors());

const dataFilePath = path.join(__dirname, 'data/Data.json');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images/foodimages/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).single('photo');

function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    console.log('Raw data read from file:', data); // Log the raw data
    const parsedData = JSON.parse(data);
    console.log('Parsed data:', parsedData); // Log the parsed data
    return parsedData;
  } catch (error) {
    console.error('Error reading data from file:', error);
    return null;
  }
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
  const users = data.users;
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

app.get('/api/food', (req, res) => {
  const dataFood = readData();
  res.json(dataFood.food);
  console.log('Food data sent successfully');

});

app.post('/api/food', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error uploading file' });
    }

    const { name, description, ingredients, method, category } = req.body;
    const data = readData();
    if (!data) {
      return res.status(500).json({ message: 'Error reading data' });
    }
    const newId = data.food.length > 0 ? Math.max(...data.food.map(item => item.id)) + 1 : 1;
    const photoUrl = req.file ? `http://localhost:3000/Images/FoodImages/${req.file.originalname}` : '';
    const newFood = {
      id: newId,
      name,
      description,
      ingredients: JSON.parse(ingredients),
      method,
      category,
      photo: photoUrl
    };
    data.food.push(newFood);
    writeData(data);
    res.status(201).json({ message: 'Food item added successfully!' });
  });
});

app.post('/api/check-admin', (req, res) => {
  const { user } = req.body;
  if (user && user.isAdmin) {
    res.json({ isAdmin: true });
  } else {
    res.json({ isAdmin: false });
  }
});

app.delete('/api/food/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const foodIndex = data.food.findIndex(item => item.id === parseInt(id));
  if (foodIndex === -1) {
    return res.status(404).json({ message: 'Food item not found' });
  }
  data.food.splice(foodIndex, 1);
  writeData(data);
  res.status(200).json({ message: 'Food item deleted successfully' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});