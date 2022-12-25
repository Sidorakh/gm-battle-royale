import path from 'path';
import client from '../discord-client';
import * as discord from 'discord.js';
import * as fs from 'fs-extra';
import {GUILD_ID} from '../env';
import {ApplicationCommandInteraction,MessageContextMenuInteraction,UserContextMenuInteraction,ButtonInteraction,SelectMenuInteraction} from './interaction-typedefs';

const application: ApplicationCommandInteraction[] = [];
const message_context_menu: MessageContextMenuInteraction[] = [];
const user_context_menu: UserContextMenuInteraction[] = [];
const button: ButtonInteraction[] = [];
const select_menu: SelectMenuInteraction[] = [];
const interactions = {
    application,
    message_context_menu,
    user_context_menu,
    button,
    select_menu,
}

async function import_commands(directory: string) {
    const list = await fs.readdir(path.join(__dirname,directory));
    const prefix = directory;
    const out: any[] = [];
    for (const file of list) {
        // ignore the templates
        if (file.includes('template.ts')) continue;
        out.push((await import(path.join(__dirname,prefix,file))).command);
    }
    return out;
}

export async function initialise() {
    interactions.application = await import_commands('./application') as ApplicationCommandInteraction[];
    interactions.message_context_menu = await import_commands('./message_context_menu') as MessageContextMenuInteraction[];
    interactions.user_context_menu = await import_commands('./user_context_menu') as UserContextMenuInteraction[];
    interactions.button = await import_commands('./button') as ButtonInteraction[];
    interactions.select_menu = await import_commands('./select_menu') as SelectMenuInteraction[];
    const route = discord.Routes.applicationGuildCommands(client.user!.id,GUILD_ID);
    
    // easy way to check all commands
    for (const interaction of interactions.application) {
        try {
            interaction.command.toJSON();
        } catch(e) {
            console.log(`Failed to compile ${interaction.command.name}`);
        }
    }

    

    const application_commands = interactions.application.map(v=>v.command.toJSON());
    const message_context_menu_commands = interactions.message_context_menu.map(v=>v.command.toJSON());
    const user_context_menu_commands = interactions.user_context_menu.map(v=>v.command.toJSON());
    await client.rest.put(route,{
        body: [
            ...application_commands,
            ...message_context_menu_commands,
            ...user_context_menu_commands
        ]
    });
}


export async function interaction_handler(interaction: discord.Interaction<discord.CacheType>) {
    if (interaction.isAutocomplete()) {
        // autocomplete
        const cmd = interactions.application.find(v=>v.command.name == interaction.commandName);
        if (cmd && cmd.autocomplete) {
            await cmd.autocomplete(interaction);
        }
    }
    if (interaction.isChatInputCommand()) {
        const cmd = interactions.application.find(v=>v.command.name == interaction.commandName);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
    if (interaction.isMessageContextMenuCommand()) {
        const cmd =  interactions.message_context_menu.find(v=>v.command.name == interaction.commandName);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
    if (interaction.isUserContextMenuCommand()) {
        const cmd = interactions.user_context_menu.find(v=>v.command.name == interaction.commandName);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
    if (interaction.isButton()) {
        const cmd = interactions.button.find(v=>v.id == interaction.customId);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
    if (interaction.isSelectMenu()) {
        const cmd = interactions.select_menu.find(v=>v.id == interaction.customId);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
}

export function get_interactions() {
    return {
        application: [...interactions.application],
        message_context_menu: [...interactions.message_context_menu],
        user_context_menu: [...interactions.user_context_menu],
    }
}
