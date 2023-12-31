import * as discord from 'discord.js';
import {ApplicationCommandInteraction} from '../interaction-typedefs';
import {deregister_fighter} from '../../royale-service';
export const command: ApplicationCommandInteraction = {
    command: new discord.SlashCommandBuilder()  .setName('remove-fighter')
                                                .setDescription('Removes a specified fighter from the pool')
                                                .addUserOption(opt=>opt.setName('user').setDescription('The user to remove').setRequired(true)),
    async handler(interaction: discord.ChatInputCommandInteraction<discord.CacheType>) {
        await interaction.deferReply({ephemeral:true});
        const user = interaction.options.get('user',true).user;
        if (user) {
            deregister_fighter(user.id);
            interaction.editReply(`<@${user.id}> has been removed`);
        } else {
            interaction.editReply(`User ID invalid`);
        }
    }
}