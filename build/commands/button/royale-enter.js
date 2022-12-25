"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const royale_service_1 = require("../../royale-service");
exports.command = {
    id: 'royale-enter',
    async handler(interaction) {
        (0, royale_service_1.register_fighter)(interaction.user.id);
        await interaction.reply({ content: `Congratulations,  <@${interaction.user.id}>, you have successfully joined the fight!`, ephemeral: true, allowedMentions: { parse: [] } });
    }
};
