import * as discord from 'discord.js';
import {ButtonInteraction} from '../interaction-typedefs';
export const command: ButtonInteraction = {
    id: 'button',
    async handler(interaction) {
        await interaction.deferReply({ephemeral:true});
    }
}