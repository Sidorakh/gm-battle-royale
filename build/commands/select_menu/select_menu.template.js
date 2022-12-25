"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    id: 'select',
    async handler(interaction) {
        await interaction.deferReply({ ephemeral: true });
    }
};
