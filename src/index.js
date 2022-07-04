/**
 *
 */


// imports
const JSONdb = require('simple-json-db');
const TelegramBot = require('node-telegram-bot-api');

// settings from argv
// telegram bot token
const bot_token = process.argv[2];
const admin_id = parseInt(process.argv[3]);

if(!bot_token) throw new Error("pls setup bot token in your nodejs call");
if(!admin_id) throw new Error("pls setup your user id in your nodejs call");



// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(bot_token, { polling: true });
const data = new JSONdb('./data.json');

const isThisMsgFromAdmin = require('./isThisMsgFromAdmin')(admin_id);


// checking database ...
if(!data.get('list')){
    data.set('list', []);
}


// // // // getter

// "/start"
bot.onText(/\/start/, (msg, match) => {
    // normal start
    bot.sendMessage(msg.chat.id, "Hey, send /get for a random entry from my list.");
    if(isThisMsgFromAdmin(msg)) bot.sendMessage(msg.chat.id, "... just you can use /admin for adding and removing ...");
});

// "/start get"
// TODO

// "/get"
bot.onText(/^\/get$/, (msg, match) => {
    const list = data.get('list');
    if(list.length == 0){
        bot.sendMessage(msg.chat.id, "There are no elements in my list ... i will send a message to the admin with this information.");
        bot.sendMessage(admin_id, "There are no elements in my list .............");
        return;
    }

    bot.sendMessage(msg.chat.id, list[Math.floor(Math.random()*list.length)], {disable_web_page_preview: false});

});


// "/list"
// TODO // BUG ... 4000 zeichen ... :/

// "/admin"
// TODO

// errors ... sad
bot.on('polling_error', function(err){
    console.error('polling_error', err);
})
bot.on('webhook_error', function(err){
    console.error('webhook_error', err);
})
bot.on('error', function(err){
    console.error('error', err);
})
