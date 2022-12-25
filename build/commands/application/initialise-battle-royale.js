"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord = __importStar(require("discord.js"));
exports.command = {
    command: new discord.SlashCommandBuilder().setName('initialise-battle-royale')
        .setDescription('Send the battle royale signup message'),
    async handler(interaction) {
        await interaction.deferReply({ ephemeral: false });
        const row = new discord.ActionRowBuilder()
            .addComponents(new discord.ButtonBuilder()
            .setCustomId('royale-enter')
            .setStyle(discord.ButtonStyle.Primary)
            .setLabel('Join the fight!'))
            .addComponents(new discord.ButtonBuilder()
            .setCustomId('royale-leave')
            .setStyle(discord.ButtonStyle.Danger)
            .setLabel('Leave the battle'));
        await interaction.editReply({ content: 'Enter or leave the battle royale using the buttons below!', components: [row] });
    }
};
