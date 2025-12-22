console.log("Script started!");
const xlsx = require("xlsx");
const {MongoClient} = require("mongodb");

(async () => {
    try {
        //load excel file
        const workbook = xlsx.readFile("vocab.xlsx");
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet);

        //connect to mongodb
        const uri = "mongodb://127.0.0.1:27017";
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db("dictionaryBot");
        const collection = db.collection("vocabulary");

        //formatted rows
        const formattedRows = rows.map( r => ({
            word: r.word?.toLowerCase().trim(),
            meaning: r.meaning || "",
            explanation: r.explanation || "",
            synonyms: r.synonyms ? r.synonyms.split(",").map( s => s.trim()) : [],
            imageFileId: r.imageFileId || null,
            voiceFileId: r.voiceFileId || null,
            hashtags: r.hashtags ? r.hashtags.split(",").map( h => h.trim()) : []
        }));

        //Insert into MongoDB
        const result = await collection.insertMany(formattedRows);
        console.log(`Inserted ${result.insertedCount} documents`);
        
        await client.close();
    } catch (err) {
        console.error(err);
    }
})();