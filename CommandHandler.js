
module.exports = {
    name: 'messageCreate',
    execute(message, client) {

        const config = require('../settings.json');
            
          try {
        const prefix = `${config.prefix}`

     
       
        if (message.author.id !== message.client.user.id) return;
            let messageArray = message.content.split(" ");
            let cmd = messageArray[0];
            let args = messageArray.slice(1);

             if(!cmd.startsWith(prefix)) return;
        
             let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.alias.get(cmd.slice(prefix.length))
             if(!commandfile) return

           
             if(commandfile) {
                commandfile.run(client,message,args);    
        
             }


             


        
            } catch(e) {
                return
            }   
        }
       
    }