import * as discord from 'discord.js';
import {ButtonInteraction} from '../interaction-typedefs';
import {deregister_fighter} from '../../royale-service';
export const command: ButtonInteraction = {
    id: 'royale-leave',
    async handler(interaction) {
        deregister_fighter(interaction.user.id);
        await interaction.reply({content:`You have successfuly left any future battles, <@${interaction.user.id}>`,ephemeral:true, allowedMentions:{parse:[]}});
    }
}