"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const royale_service_1 = require("../../royale-service");
exports.command = {
    id: 'royale-leave',
    async handler(interaction) {
        (0, royale_service_1.deregister_fighter)(interaction.user.id);
        await interaction.reply({ content: `You have successfuly left any future battles, <@${interaction.user.id}>`, ephemeral: true, allowedMentions: { parse: [] } });
    }
};
