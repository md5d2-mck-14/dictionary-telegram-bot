const { Telegraf } = require("telegraf");
const { MongoClient } = require("mongodb");

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
    const uri = process.env.MONGO_URI;//we use process.env.MONGOURI for Railway

    console.log("Using Mongo URI:", uri); // temporary debug

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("dictionaryBot");
    wordsCollection = db.collection("vocabulary");
    
    console.log("MongoDB connected");
}

async function startBot () {
    await connectDB();//connect mongodb first
    await bot.launch();//then start telegram bot
    console.log("Bot started");
}
startBot();