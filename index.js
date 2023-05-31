const express = require('express');
const cors = require('cors');
const Validator = require('validator');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware............
app.use(cors());
app.use(express.json());









const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4qgafns.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const userCollection = client.db("regform").collection("users");


    app.post('/users', async (req, res) => {
      const user = req.body;
      if (!Validator.isLength(user.name)) {
        res.status(400).json({ error: 'Please enter your name.' });
        return;
      }

      if (!Validator.isEmail(user.email)) {
        res.status(400).json({ error: 'Please enter a valid email address.' });
        return;
      }

      if (!Validator.isLength(user.password, { min: 6 })) {
        res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        return;
      }


     

      console.log(user)
      const result = await userCollection.insertOne(user);
      res.send(result);
    })


  }

  finally {


  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send(' Hello form registration form ');
})



app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})