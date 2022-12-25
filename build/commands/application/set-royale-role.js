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
const royale_service_1 = require("../../royale-service");
exports.command = {
    command: new discord.SlashCommandBuilder().setName('set-royale-role')
        .setDescription('Set the role handed out to Battle Royale winners')
        .addRoleOption(o => o.setName('role').setDescription('Battle Royale winner role').setRequired(true)),
    async handler(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const role = interaction.options.getRole('role');
        (0, royale_service_1.set_role)(role.id);
        await interaction.editReply(`Battle royale winners will now receive the <@&${role.id}> role`);
    }
};
