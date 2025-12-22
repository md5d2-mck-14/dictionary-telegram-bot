const { Telegraf } = require("telegraf");
const bot = new Telegraf("8107838948:AAHOeoU6UMUuVtSgINbpQVHKrfo3uLoMsQU");

bot.start( (ctx) => {
    ctx.reply("Hello! Banjix Dictionary is alive");
});

bot.on("text", (ctx) => {
    ctx.reply("I received: " + ctx.message.text);
})

bot.launch();

console.log("Bot started");