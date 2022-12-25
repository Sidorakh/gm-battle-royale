import * as discord from 'discord.js';
import {ApplicationCommandInteraction} from '../interaction-typedefs';
import {set_role} from '../../royale-service';
export const command: ApplicationCommandInteraction = {
    command: new discord.SlashCommandBuilder()  .setName('set-royale-role')
                                                .setDescription('Set the role handed out to Battle Royale winners')
                                                .addRoleOption(o=>o.setName('role').setDescription('Battle Royale winner role').setRequired(true)),
    async handler(interaction: discord.ChatInputCommandInteraction<discord.CacheType>) {
        await interaction.deferReply({ephemeral:true});
        const role = interaction.options.getRole('role')!;
        set_role(role.id);
        await interaction.editReply(`Battle royale winners will now receive the <@&${role.id}> role`);

    }
}