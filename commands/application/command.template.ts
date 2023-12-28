import * as discord from 'discord.js';
import {ApplicationCommandInteraction} from '../interaction-typedefs';
export const command: ApplicationCommandInteraction = {
    command: new discord.SlashCommandBuilder()  .setName('slash-command')
                                                .setDescription('a command'),
    async handler(interaction: discord.ChatInputCommandInteraction<discord.CacheType>) {
        await interaction.deferReply({ephemeral:true});
    }
}