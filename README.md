# GM Battle Royale
Because who hasn't wanted some nice clean murderous fun!

## Setup

1. Create a .env file in the main directory with the following items, replacing `token` with a Discord Bot token and `guild` with the ID of the guild/server you're running the bot in
```env
DISCORD_TOKEN=token
GUILD_ID=guild
```
2. Install dependencies with `npm install`
3. Start the bot, either by compiling with `tsc` (obtained with `npm i -g typescript`) or using a package such as `ts-node`
4. Run the `/set-royale-role` command to specify the role each winner gets
5. Run the `/set-royale-channel` command to specify where the battle should take place (accepts any text based channel)
6. Run `/initialise-battle-royale` to send the signup message
7. Have every competitor click the `Join Battle` button on the signup message
8. Run `/start-royale` to begin a round!

## Notes:

- Up to 21 members can participate at once, if more than 21 players have entered, a random selection of all entrants are chosen
- If you wish to modify available weapons, they're all listed in `./royale-service/weapons.ts`
- If you wish to modify any skip, heal, and hurt turn messages, they're all in `./royale-service/no-op.ts`
- Chances for each event are listed in `./royale-service/index.ts` as constant values


