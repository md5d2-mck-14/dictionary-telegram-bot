const { MongoClient } = require("mongodb");

// Replace with your own MongoDB connection string
const uri = "mongodb://127.0.0.1:27017"; 

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("testdb");
        const collection = db.collection("users");

        // Example insert
        const result = await collection.insertOne({ name: "Alice", age: 25 });
        console.log("Inserted:", result.insertedId);

    } finally {
        await client.close();
    }
}

run().catch(console.error);