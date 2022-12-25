import * as discord from 'discord.js';
import {SelectMenuInteraction} from '../interaction-typedefs';
export const command: SelectMenuInteraction = {
    id: 'select',
    async handler(interaction) {
        await interaction.deferReply({ephemeral:true});
    }
}