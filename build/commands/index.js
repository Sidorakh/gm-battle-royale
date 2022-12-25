"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_interactions = exports.interaction_handler = exports.initialise = void 0;
const path_1 = __importDefault(require("path"));
const discord_client_1 = __importDefault(require("../discord-client"));
const discord = __importStar(require("discord.js"));
const fs = __importStar(require("fs-extra"));
const env_1 = require("../env");
const application = [];
const message_context_menu = [];
const user_context_menu = [];
const button = [];
const select_menu = [];
const interactions = {
    application,
    message_context_menu,
    user_context_menu,
    button,
    select_menu,
};
async function import_commands(directory) {
    const list = await fs.readdir(path_1.default.join(__dirname, directory));
    const prefix = directory;
    const out = [];
    for (const file of list) {
        // ignore the templates
        if (file.includes('template.ts'))
            continue;
        out.push((await Promise.resolve().then(() => __importStar(require(path_1.default.join(__dirname, prefix, file))))).command);
    }
    return out;
}
async function initialise() {
    interactions.application = await import_commands('./application');
    interactions.message_context_menu = await import_commands('./message_context_menu');
    interactions.user_context_menu = await import_commands('./user_context_menu');
    interactions.button = await import_commands('./button');
    interactions.select_menu = await import_commands('./select_menu');
    const route = discord.Routes.applicationGuildCommands(discord_client_1.default.user.id, env_1.GUILD_ID);
    // easy way to check all commands
    for (const interaction of interactions.application) {
        try {
            interaction.command.toJSON();
        }
        catch (e) {
            console.log(`Failed to compile ${interaction.command.name}`);
        }
    }
    const application_commands = interactions.application.map(v => v.command.toJSON());
    const message_context_menu_commands = interactions.message_context_menu.map(v => v.command.toJSON());
    const user_context_menu_commands = interactions.user_context_menu.map(v => v.command.toJSON());
    await discord_client_1.default.rest.put(route, {
        body: [
            ...application_commands,
            ...message_context_menu_commands,
            ...user_context_menu_commands
        ]
    });
}
exports.initialise = initialise;
async function interaction_handler(interaction) {
    if (interaction.isAutocomplete()) {
        // autocomplete
        const cmd = interactions.application.find(v => v.command.name == interaction.commandName);
        if (cmd && cmd.autocomplete) {
            await cmd.autocomplete(interaction);
        }
    }
    if (interaction.isChatInputCommand()) {
        const cmd = interactions.application.find(v => v.command.name == interaction.commandName);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
    if (interaction.isMessageContextMenuCommand()) {
        const cmd = interactions.message_context_menu.find(v => v.command.name == interaction.commandName);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
    if (interaction.isUserContextMenuCommand()) {
        const cmd = interactions.user_context_menu.find(v => v.command.name == interaction.commandName);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
    if (interaction.isButton()) {
        const cmd = interactions.button.find(v => v.id == interaction.customId);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
    if (interaction.isSelectMenu()) {
        const cmd = interactions.select_menu.find(v => v.id == interaction.customId);
        if (cmd) {
            await cmd.handler(interaction);
        }
    }
}
exports.interaction_handler = interaction_handler;
function get_interactions() {
    return {
        application: [...interactions.application],
        message_context_menu: [...interactions.message_context_menu],
        user_context_menu: [...interactions.user_context_menu],
    };
}
exports.get_interactions = get_interactions;
