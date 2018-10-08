const Discord = require("discord.js");
const API = "https://github.com/hydrabolt/discord.js/";
const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
 if(err) {
 return console.error(err.message);
 }
 console.log('Connected to the data SQlite database.');
  });


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});


app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://nakedmolerat.glitch.me/`);
}, 280000);
const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size}`)
  client.user.setActivity(`with nooses for ${client.users.size} people`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`with nooses for ${client.users.size} people`);
});

client.on("disconnected", function () {

	console.log("OOF!");
	process.exit(1); 

});

client.on("message", async message => {
    const swearWords = []
//If you want to add words to block, put them in the above array - Jodast
if( swearWords.some(word => message.content.includes(word)) ) {
  message.delete();
  message.reply("Stop that, this is a christian server!");
}

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "ping") {
  
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  if (command === "asl") {
    let [age, sex, location] = args; 
    message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
  }
  if (command === "trend") {
   let [query, location] = args;
    message.reply(`https://trends.google.com/trends/explore?q=${query}&geo=US`);
  }

          
  if(command === "want") {

    const m = await message.channel.send("I want you to want me");
    
  }
    if(command === "oof") {
         if(!message.member.roles.some(r=>["Administrator", "Mod", "Admin", "Moderator", "The Team"].includes(r.name)) ){
      return message.reply("Sorry, you don't have permissions to use this!");
         }
 
    const m = await message.channel.send("oof");
    m.edit(`OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOF`);
  }
  
  if(command === "allahu") {
   const m = await message.channel.send("Allahu Akbar!!!!!");
    m.edit(`Allahu Akbar! https://www.youtube.com/watch?v=qabGYz1LoH4`);
  }
  
  var memes = [`https://www.youtube.com/watch?v=nkCfws0jtVA`, `https://www.youtube.com/watch?v=kbsJVkThWbU`, `https://www.youtube.com/watch?v=CcnzvIM5XX0`, `https://www.youtube.com/watch?v=ARTzw4VEenU`, `https://www.youtube.com/watch?v=bfCR0dEDO1A`, `https://www.youtube.com/watch?v=ssIY8NYwvh4`]
  function rand() {
    var rm = memes[Math.floor(Math.random() * memes.length)];
    return rm;
  }
  if(command === "meme") {
  message.reply(rand());
}


  if(command === "say") {
     const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {

    if(!message.member.roles.some(r=>["Administrator", "Moderator", "RED", "Bots"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {

    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      await member.ban(reason)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
await member.ban(reason)
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
      if(!message.member.roles.some(r=>["Administrator", "Moderator", "RED", "Bots"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
  }
  
  //This is the main data storage function
  if(command === "maketable") {
    let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
 if(err) {
 return console.error(err.message);
 }
      
 console.log('Connected to the data SQlite database.');
     
  });
 db.run(`CREATE TABLE IF NOT EXISTS playlists (userid integer, username text, userplaylist integer)`);    
          
db.close((err) => {
  if (err) {
    console.error(err.message);
  }

  console.log('Close the database connection.');
});
  };
  if(command === "addme") {
    db.run(`INSERT INTO playlists(userid, username, userplaylist) VALUES(${message.author.id}, ${message.author}, AUTO_INCREMENT)`, ['C'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  }); 
  }
  
}

);



client.login(config.token);
