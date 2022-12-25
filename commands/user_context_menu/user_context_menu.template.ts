import * as discord from 'discord.js';
import {UserContextMenuInteraction} from '../interaction-typedefs';
export const command: UserContextMenuInteraction = {
    description: 'Makes the bot say words',
    command: new discord.ContextMenuCommandBuilder().setType(discord.ApplicationCommandType.User)
                                                    .setName('User'),
    async handler(interaction) {
        await interaction.deferReply({ephemeral:true});
    }
}