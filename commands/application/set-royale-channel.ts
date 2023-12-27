import * as discord from 'discord.js';
import {ApplicationCommandInteraction} from '../interaction-typedefs';
import {set_channel} from '../../royale-service';
export const command: ApplicationCommandInteraction = {
    command: new discord.SlashCommandBuilder()  .setName('set-royale-channel')
                                                .setDescription('Set the channel where the Battle Royale will take place')
                                                .addChannelOption(o=>o.setName('channel').setDescription('Channel for the battle royale').setRequired(true).addChannelTypes(discord.ChannelType.GuildText,discord.ChannelType.PublicThread,discord.ChannelType.PrivateThread)),
    async handler(interaction: discord.ChatInputCommandInteraction<discord.CacheType>) {
        await interaction.deferReply({ephemeral:true});
        const channel = interaction.options.get('channel');
        set_channel(channel!.channel!.id);
        await interaction.editReply(`Set the battle royale channel to <#${channel!.channel!.id}>`);
    }
}