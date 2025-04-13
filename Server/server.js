const uri = "mongodb+srv://zackkasson:Bananawarrior3!@zacksproject.vrj06.mongodb.net/?retryWrites=true&w=majority&appName=ZacksProject";
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ObjectId } from 'mongodb';
import cors from 'cors'; 


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const app = express();
app.use(express.json()); // Used to Parse JSON
app.use(cors()); // Used to restrcict access to specific frontend

const dbName = "WebMapApp";
const collectionName = "climbs";

// GET all climbs
app.get('/climbs', async (req, res) => {
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const climbs = await collection.find({}).toArray();
        res.json(climbs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await client.close();
    }
});

// POST a new climb
app.post('/climbs/create', async (req, res) => {
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const { latitude, longitude, ...rest } = req.body; // Destructure incoming body so we can get rid of lat,lng

        // automatically format location
        // const newClimb = {
        //     ...rest, // Spread all other form data
        //     location: {
        //         type: "Point",
        //         coordinates: [longitude, latitude] // MongoDB GeoJSON requires [lng, lat]
        //     }
        // };

        // console.log("Formatted Climb:", newClimb);
        
        console.log("Formatted Climb:", req.body);
        const result = await collection.insertOne(req.body);

        res.status(201).json({ message: "Climb added successfully", id: result.insertedId });
    } catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await client.close();
    }
});

//UPDATE A CLIMB
app.post('/climbs/update', async (req, res) => {
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const climbId = req.body._id;
        const updatedClimb = req.body; // Use the data as received from the frontend
        updatedClimb._id = new ObjectId(climbId); // Ensure the new document retains the original _id

        const result = await collection.replaceOne(
            { _id: new ObjectId(climbId) },
            updatedClimb
        );


        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Climb not found" });
        }

        res.status(200).json({ message: "Climb updated successfully" });
    } catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await client.close();
    }
});


//DELETE A CLIMB
app.delete('/climbs/delete/:id', async (req, res) => {
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const climbId = req.params.id;

        const climb = await collection.findOne({ _id: new ObjectId(climbId) });

        // If it doesn't exist, throw error
        if (!climb) {
            return res.status(404).json({ error: "Climb not found." });
            console.log("Climb not found.")
        }

        const result = await collection.deleteOne({ _id: new ObjectId(climbId)});
        res.status(200).json({ message: "Climb deleted successfully.", id: climbId });
        console.log("Climb deleted successfully.")

    } catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await client.close();
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Server running on port", PORT));
// TO RUN LOCALLY RUN 'node server.js' and open http://localhost:5000/climbs