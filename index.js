const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const Product = require('./modules/products'); // Capital "P"
const dotenv=require('dotenv');
dotenv.config()


app.listen(3000, () => {
    console.log('nodemon');
  });
 

app.get('/', (req, res) => {
    res.send('This is the node response sent');
});

// Retrieve all the items from the database
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// Retrieve only the items required(user specifies)
app.get('/api/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// Post all the items
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }

});

// Update an item in the DB

app.put('/api/products/:id', async (req, res) => {
  try {
    
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if(!product){
      return res.status(404).json({message: "Product not found"});
    }

    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// Delete an item from the DB

app.delete('/api/products/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const product = await Product.findByIdAndDelete(id);

    if(!product){
      return res.status(404).json({message: "Product not found"});
    }

    res.status(200).json({ message : 'Product deleted successfully'});
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


mongoose.connect(process.env.MONGO_CONNECTION_STRING)
   .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Connection Failed',err);
  });
