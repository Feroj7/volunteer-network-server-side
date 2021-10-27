const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gwxst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('Database Connected');

        const database = client.db('volunteer_network');
        const eventCollection = database.collection('events');

        //GET API
        app.get('/events', async (req, res) => {
            const cursor = eventCollection.find({});
            const events = await cursor.toArray();
            res.send(events);
        })
        
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir); 


app.get('/', (req, res) => {
    res.send('Volunteer Network Server is Running');
})

app.listen(port, () => {
    console.log("Volunteer Network running on port", port);
})


