import * as env from './env'
import client from './discord-client';

import * as commands from './commands';

client.login(env.DISCORD_TOKEN);

client.on('ready',async()=>{
    await commands.initialise();
    console.log(`Ready to fight!`);
});

client.on('interactionCreate',commands.interaction_handler);