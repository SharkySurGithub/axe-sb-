const { Client, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');

const config = require('./settings.json');
const password = config.password
const client = new Client({
    readyStatus: false,
    checkUpdate: false,
  autoRedeemNitro:false,
  password:password
});


client.snipes = new Collection();
client.commands = new Collection();
client.aliases = new Collection();




const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file} [Commande]`)

    console.log(`✅・${file}`)
    client.commands.set(props.help.name, props)
} 

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        console.log(`✅・${file} - ${folder} [Commande]`)
        client.commands.set(command.name, command)
        
    }
})

const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
        console.log(`✅・${file} [Events]`)
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
        console.log(`✅・${file} [Events]`)
    }
}

const eventSubFolders = fs.readdirSync('./events/').filter(f => !f.endsWith('.js'))
eventSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./events/${folder}/`).filter(f => f.endsWith('.js'))
    
    for (const file of commandFiles) {
        const event = require(`./events/${folder}/${file}`)
        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
            console.log(`✅・${file} - ${folder} [Events]`)
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
            console.log(`✅・${file} - ${folder} [Events]`)
        }
    }
})
process.on('unhandledRejection', err => {
    console.log(`[ERROR] Unhandled promise rejection: ${err.message}.`);
    console.log(err);
  });
  
  



    client.login(config.token)
