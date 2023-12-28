import * as discord from 'discord.js';
import {ApplicationCommandInteraction} from '../interaction-typedefs';
export const command: ApplicationCommandInteraction = {
    command: new discord.SlashCommandBuilder()  .setName('initialise-battle-royale')
                                                .setDescription('Send the battle royale signup message'),
    async handler(interaction: discord.ChatInputCommandInteraction<discord.CacheType>) {
        await interaction.deferReply({ephemeral:false});
        const row = new discord.ActionRowBuilder<discord.ButtonBuilder>()
                                .addComponents(new discord.ButtonBuilder()
                                                            .setCustomId('royale-enter')
                                                            .setStyle(discord.ButtonStyle.Primary)
                                                            .setLabel('Join the fight!'))
                                .addComponents(new discord.ButtonBuilder()
                                                            .setCustomId('royale-leave')
                                                            .setStyle(discord.ButtonStyle.Danger)
                                                            .setLabel('Leave the battle')
        );
        await interaction.editReply({content:'Enter or leave the battle royale using the buttons below!',components:[row]});
    }
}