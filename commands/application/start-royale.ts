import * as discord from 'discord.js';
import {ApplicationCommandInteraction} from '../interaction-typedefs';
import {begin_fight} from '../../royale-service';
export const command: ApplicationCommandInteraction = {
    command: new discord.SlashCommandBuilder()  .setName('start-royale')
                                                .setDescription('Start the battle!'),
    async handler(interaction: discord.ChatInputCommandInteraction<discord.CacheType>) {
        if (begin_fight()) {
            await interaction.reply({ephemeral:false,content:`Let the games begin!`});
        } else {
            await interaction.reply({ephemeral:true,content:`A battle is already underway!`});
        }
    }
}