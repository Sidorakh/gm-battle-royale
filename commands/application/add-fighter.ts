import * as discord from 'discord.js';
import {ApplicationCommandInteraction} from '../interaction-typedefs';
import {register_fighter} from '../../royale-service';
export const command: ApplicationCommandInteraction = {
    command: new discord.SlashCommandBuilder()  .setName('add-fighter')
                                                .setDescription('Adds a specified fighter to the pool')
                                                .addUserOption(opt=>opt.setName('user').setDescription('The user to add').setRequired(true)),
    async handler(interaction: discord.ChatInputCommandInteraction<discord.CacheType>) {
        await interaction.deferReply({ephemeral:true});
        const user = interaction.options.get('user',true).user;
        if (user) {
            register_fighter(user.id);
            interaction.editReply(`<@${user.id}> has been added`);
        } else {
            interaction.editReply(`User ID invalid`);
        }
    }
}