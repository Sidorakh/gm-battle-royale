import * as discord from 'discord.js';
import {ButtonInteraction} from '../interaction-typedefs';
import {register_fighter} from '../../royale-service';
export const command: ButtonInteraction = {
    id: 'royale-enter',
    async handler(interaction) {
        register_fighter(interaction.user.id);
        await interaction.reply({content:`Congratulations,  <@${interaction.user.id}>, you have successfully joined the fight!`,ephemeral:true, allowedMentions:{parse:[]}});
    }
}