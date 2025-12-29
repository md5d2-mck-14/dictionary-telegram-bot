console.log("MONGO_URI:", process.env.MONGO_URI);

const { Telegraf } = require("telegraf");
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGO_URI);//we use process.env.MONGOURI for Railway
let wordsCollection;
const bot = new Telegraf(process.env.BOT_TOKEN);//we use process.env.BOT_TOKEN for Railway

bot.start( (ctx) => {
    ctx.reply("Hello! Banjix Dictionary is alive");
});

bot.on("text", (ctx) => {
    const input = ctx.message.text.toLowerCase().trim();
    console.log("User searched: ", input);
})

async function connectDB () {
    await mongoClient.connect();
    const db = mongoClient.db("dictionaryBot");
    wordsCollection = db.collection("vocabulary");
    console.log("MongoDB connected");
}
connectDB();
bot.launch();

console.log("Bot started");