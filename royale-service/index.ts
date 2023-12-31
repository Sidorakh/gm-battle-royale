import * as fs from 'fs-extra';
import * as discord from 'discord.js';

import weapons,{Weapon} from './weapons';
import noop from './no-op';
import symbols from './symbols';
import Fighter from './fighter';
import client from '../discord-client';
import {GUILD_ID} from '../env';

const PICKUP_CHANCE_UNARMED = 0.9;
const PICKUP_CHANCE_ARMED = 0.1;
const HIT_CHANCE = 0.9;
const BREAK_CHANCE = 0.1;
const MAX_FIST_DAMAGE = 3;
const NO_OP_CHANCE = 0.1;

const ONE_SECOND = 1000;

const members: string[] = [];
const fighters = new Map<string, Fighter>();
const options = {
    channel_id: '',
    role_id:'',
}

let royale_underway = false;

function load_list() {
    let str = '[]';
    const fname = './save/fighters.json';
    if (fs.existsSync(fname)) {
        str = fs.readFileSync(fname,'utf8');
    }
    const users = JSON.parse(str);
    members.push(...users);
}

function save_list() {
    fs.writeFileSync('./save/fighters.json',JSON.stringify(members,null,4));
}

function load_options(){
    let str = '[]';
    const fname = './save/options.json';
    if (fs.existsSync(fname)) {
        str = fs.readFileSync(fname,'utf8');
    }
    const new_options = JSON.parse(str);
    options.channel_id = new_options.channel_id;
    options.role_id = new_options.role_id;
}

function save_options() {
    fs.writeFileSync('./save/options.json',JSON.stringify(options,null,4));
}

load_list();
load_options();

export function set_channel(channel_id: string) {
    options.channel_id = channel_id;
    save_options();
}

export function set_role(role_id: string) {
    options.role_id = role_id;
    save_options();
}

export function clear_fighters() {
    fighters.clear();
}

export function register_fighter(id: string): boolean {
    if (!members.includes(id)) {
        members.push(id);
        save_list();
        return true;
    }
    return false;
}

export function deregister_fighter(id: string): boolean {
    const index = members.indexOf(id);
    if (index != -1) {
        members.splice(index,1);
        save_list();
        return true;
    }
    return false;
}

function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function setup_fighters() {
    const guild = await client.guilds.fetch(GUILD_ID);
    fighters.clear();
    const users = [...members];
    shuffle(users);
    users.splice(21);
    for (const id of users) {
        const member = await guild.members.fetch(id);
        fighters.set(id, new Fighter(member.displayName,id));
    }
}

function sleep(ms: number) {
    return new Promise<void>(resolve=>{
        setTimeout(()=>{
            resolve();
        },ms);
    });
}

function a_or_an(phrase: string) {
    return `a${['a','e','i','o','u','@'].indexOf(phrase[0].toLowerCase()) != -1 ? 'n' : ''}`;
}

export function check_fighter_rostered(id: string) {
    return members.includes(id);
}

export function begin_fight() {
    if (royale_underway) {
        return false;
    }
    start_fight();
    return true;
}

function escape(val: string) {
    return val.replaceAll('\\','\\\\').replaceAll('_','\\_').replaceAll('*','\\*').replaceAll('||','\\|\\|');
}

async function start_fight() {
    royale_underway = true;
    await setup_fighters();
    let turn = 0;
    const channel = await client.channels.fetch(options.channel_id) as discord.GuildTextBasedChannel;
    const fields: discord.APIEmbedField[] = [];
    for (const fighter of fighters.values()) {
        fields.push({
            name: fighter.name,
            value: `HP: ${fighter.hp}`,
            inline: true,
        });
    }
    await channel.send({content:`The fighters are getting ready`,embeds:[{fields}]});

    let winner: null | Fighter = null;
    while (winner == null && [...fighters.values()].filter(v=>v.hp > 0).length > 1) {
        turn += 1;
        await channel.send(`Turn ${turn}`);
        for (const fighter of fighters.values()) {
            if (fighter.hp <= 0) continue;

            if (Math.random() < NO_OP_CHANCE) {
                const opt = Math.floor(Math.random()*3);
                let msg = '';
                const amount =  Math.floor(Math.random()*3)+1;
                if (opt == 0) {         // heal
                    const heal = noop.heals[Math.floor(Math.random()*noop.heals.length)];
                    msg = heal('**' + escape(fighter.name) + '**',amount);
                    fighter.hp += amount;
                } else if (opt == 1) {  // hurt
                    const hurt = noop.hurts[Math.floor(Math.random()*noop.hurts.length)];
                    msg = hurt('**' + escape(fighter.name) + '**',amount);
                    fighter.hp -= amount;
                } else {                // skip
                    const skip = noop.skips[Math.floor(Math.random()*noop.skips.length)];
                    msg = skip('**' + escape(fighter.name) + '**');
                }
                await channel.send(msg);
                if (fighter.hp < 0) {
                    await channel.send(`❌ **${escape(fighter.name)}** succumbed to their fatal injuries`);
                }
                continue;
            }
            
            const chance = fighter.weapon == null ? PICKUP_CHANCE_UNARMED : PICKUP_CHANCE_ARMED;
            if (Math.random() < chance) {
                fighter.weapon = weapons[Math.floor(Math.random()*weapons.length)];
                await channel.send(`🗡 **${escape(fighter.name)}** picked up ${a_or_an(fighter.weapon.name)} ${fighter.weapon.name}`);
            }
            const targets = [...fighters.values()].filter(v=>v.id != fighter.id && v.hp > 0);
            const target = targets[Math.floor(targets.length*Math.random())];
            const hit = Math.random();
            if (targets.length > 0) {
                if (hit < HIT_CHANCE) {
                    const weapon = fighter.weapon ? `${a_or_an(fighter.weapon.name)} ${fighter.weapon.name}` : 'their own bare hands';
                    const damage = fighter.weapon ? fighter.weapon.damage : Math.floor(Math.random()*MAX_FIST_DAMAGE);
                    target.hp -= damage;
                    await channel.send({content:`⚔ **${escape(fighter.name)}** attacked **${escape(target.name)}** with ${weapon}${damage == 0 ? '' : ', dealing ' + (damage+'hp')} damage`,allowedMentions:{parse:[]}});
                    if (damage == 0) {
                        await channel.send({content:`..but **${escape(target.name)}** was unaffected!`,allowedMentions:{parse:[]}})
                    } else {
                        if (Math.random() < BREAK_CHANCE && fighter.weapon) {
                            await channel.send(`💥 **${escape(fighter.name)}'s** ${fighter.weapon.name} broke!`)
                            fighter.weapon = null;
                        }
                    }
                    if (target.hp <= 0) {
                        await channel.send(`❌ **${escape(fighter.name)}** has killed **${escape(target.name)}** with ${weapon}`);
                        target.hp = 0;
                    }
                } else {
                    await channel.send(`**${escape(fighter.name)}** tried to attack **${escape(target.name)}**, but missed completely!`);
                }
            } else {
                await channel.send(`**${escape(fighter.name)}** looked around the battlefield in confusion`);
            }
            await sleep(2*ONE_SECOND);
        }
        const fields: discord.APIEmbedField[] = [];
        for (const fighter of fighters.values()) {
            fields.push({
                name: fighter.name,
                value: `HP: ${fighter.hp}`,
                inline: true,
            });

        }
        await channel.send({content:`Turn ${turn} is over!`,embeds:[{fields,color:0x9acd4a}]})
        if ([...fighters.values()].filter(v=>v.hp > 0).length == 1) {
            winner = [...fighters.values()].filter(v=>v.hp > 0)[0];
            console.log(`Looks like everone else is dead, so, ${winner.name} has won!`);
        }
    }
    if (winner == null) {
        channel.send(`Every fighter has fallen, there is no winner!`);
    } else {
        await channel.send(`Fighter <@${winner.id}> has emerged victorous!`);
        (await channel.guild.members.fetch(winner.id)).roles.add(options.role_id);
    }
    royale_underway = false;
}