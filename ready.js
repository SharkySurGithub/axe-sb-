const { joinVoiceChannel } = require('@discordjs/voice');
const { CustomStatus } = require('discord.js-selfbot-rpc');


module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const r = new CustomStatus()
       .setState(`T'iras pas loin si tu fais l'perso /whitehall & /novaworld`) 
       .setEmoji(`:x:`);
       client.user.setPresence(r.toData());
   
        console.log(`${client.user.username} est connecté sur le sb !`);
   
   

    }
    }