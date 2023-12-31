import * as discord from 'discord.js';
import {ApplicationCommandInteraction} from '../interaction-typedefs';
import { check_fighter_rostered } from '../../royale-service';
export const command: ApplicationCommandInteraction = {
    command: new discord.SlashCommandBuilder()  .setName('is-rostered')
                                                .setDescription('Check if a given user is rostered, or the commands user if nobody is specified')
                                                .addUserOption(opt=>opt.setDescription('User to check').setName('user').setRequired(false)),
    async handler(interaction: discord.ChatInputCommandInteraction<discord.CacheType>) {
        await interaction.deferReply({ephemeral:true});
        const id = (interaction.options.get('user')?.user || interaction.user).id;
        const is_rostered = check_fighter_rostered(id);
        interaction.editReply(`<@${id}> has ${is_rostered ? 'joined the battle!' : 'not joined the battle'}`);
    }
}