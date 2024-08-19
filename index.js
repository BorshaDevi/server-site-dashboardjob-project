const express=require('express')
const cors=require('cors')
const app=express()
require('dotenv').config()
const port=process.env.PORT || 5000

app.use(cors())
app.use(express.json())


console.log(`${process.env.DataBase_name}`)

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DataBase_name}:${process.env.DataBase_pass}@cluster0.uqcmivv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    
    const categoryCollection =client.db("IndianJob") .collection("dashboradCatagory");
    const widgetCollection =client.db("IndianJob") .collection("widgets");
  
    app.get('/cardWidget' ,async(req,res)=>{
      const result=await widgetCollection.find().toArray()
      res.send(result)
    })
    app.get('/dashboradCategory',async(req,res)=>{
      const cursor = await categoryCollection.find().toArray()
      
      res.send(cursor)
    })
    app.post('/widget',async(req,res)=>{
      const data=req.body
     const result= await widgetCollection.insertOne(data)
     res.send(result)
    })
    app.delete('/widgetDelete/:id',async(req,res)=>{
      const Id=req.params.id
      const query={_id: new ObjectId(Id)}
     
      const widget=await widgetCollection.deleteOne(query)
      res.send(widget)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('working')
})
app.listen(port,()=> {
     console.log(`The server is working${port}`)
})