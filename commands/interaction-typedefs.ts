import * as discord from 'discord.js';

export interface ApplicationCommandInteraction {
    command: discord.SlashCommandBuilder | discord.SlashCommandSubcommandsOnlyBuilder | Omit<discord.SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    handler: (interaction: discord.ChatInputCommandInteraction<discord.CacheType>) => void | Promise<void>;
    autocomplete?: (interaction: discord.AutocompleteInteraction<discord.CacheType>) => void | Promise<void>;
}

export interface MessageContextMenuInteraction {
    command: discord.ContextMenuCommandBuilder;
    handler: (interaction: discord.MessageContextMenuCommandInteraction) => void | Promise<void>;
    description: string;
}

export interface UserContextMenuInteraction {
    command: discord.ContextMenuCommandBuilder;
    handler: (interaction: discord.UserContextMenuCommandInteraction) => void | Promise<void>;
    description: string;
}

export interface ButtonInteraction {
    id: string;
    handler: (interaction: discord.ButtonInteraction<discord.CacheType>) => void | Promise<void>;
}

export interface SelectMenuInteraction {
    id: string;
    handler: (interaction: discord.SelectMenuInteraction<discord.CacheType>) => void | Promise<void>;
}

