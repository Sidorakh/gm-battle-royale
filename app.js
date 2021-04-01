require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const crypto = require('crypto');
const SECONDS = 1000;
client.login(process.env.TOKEN);
/** @type {discord.GuildChannel} */ 
let channel = null;

class Fighter {
    hp = 50;
    /** @type {Weapon}*/
    weapon = null;
    inventory = [];
    name = "";
    symbol="";
    id="";
    constructor (name,symbol,id) {
        this.name = name;
        this.symbol = symbol;
        this.id = id;
    }
}

class Weapon {
    name="";
    damage=1;
    constructor (name,damage) {
        this.name = name;
        this.damage = damage;
    }
}

let state = {
    /** @type {Fighter[]} */
    fighters: [],
    stage: 'waiting',
    /** @type {discord.Message} */
    message: null,
};


const /** @type {Weapon[]} */ weapons = [
    new Weapon("Big Bonk",3),
    new Weapon("Spork",1),
    new Weapon("Comically Oversized Mallet",5),
    new Weapon("Butter Knife",3),
    new Weapon("Tuning Fork",5),
    new Weapon("Long Sword",6),
    new Weapon("Whip",2),
    new Weapon("Bowling Pin",2),
    new Weapon("Bowling Ball",4),
    new Weapon("Blade of Grass",2),
    new Weapon("Pitchfork",3),
    new Weapon("Inflatable Baseball Bat",1),
    new Weapon("Fire Punch",6),
    new Weapon("Ice Punch",4),
    new Weapon("Thunder Punch",4),
    new Weapon("Frozen Meat Knife",5),
    new Weapon("Fingergun",6),
    new Weapon("Treebuchet",4),
    new Weapon("Dried Date",10),
    new Weapon("Sack of Potatoes",4),
    new Weapon("Very Short Sword",5),
    new Weapon("Minigun",7),
    new Weapon("Ping-Pong Paddle",3),
    new Weapon("Jar",3),
    new Weapon("Mace",3),
    new Weapon("Bow and Arrow",3),
    new Weapon("Plasma Rifle",4),
    new Weapon("Chaingun",5),
    new Weapon("Super Shotgun",7),
    new Weapon("Wii-Fit Balance Board",2),
    new Weapon("Nunchucks",4),
    new Weapon("Wii Nunchucks",2),
    new Weapon("Fuel Rod Cannon",6),
    new Weapon("Gravity Hammer",6),
    new Weapon("Gauss Cannon",7),
    new Weapon("Needler",3),
    new Weapon("Netherite Hoe",5),
    new Weapon("Crossbow",5),
    new Weapon("Ballista",6),
    new Weapon("Railgun",6),
    new Weapon("Hwacha",5),
    new Weapon("Slime Pickaxe",3),
    new Weapon("Nuclear Pickaxe",6),
    new Weapon("Regular Punch",2),
    new Weapon("Copy of Shaun Spalding’s Collision Code",10),
    new Weapon("Sticky Bomb Launcher",6),
    new Weapon("Large Wrench",4),
    new Weapon("Portal Gun",5),
    new Weapon("Gravity Gun",5),
    new Weapon("Crowbar",4),
    new Weapon("Lightsaber",7),
    new Weapon("Hot Take",2),
    new Weapon("Hot Wheels Track",4),
    new Weapon("Batarang",5),
    new Weapon("Chopstick",3),
    new Weapon("Uncomfortable Hug",4),
    new Weapon("Fish Slap",4),
    new Weapon("TypeError",4),
    new Weapon("Rubber Chicken",4),
    new Weapon("NULL",4),
    new Weapon("Dobonhonkero",4),
    new Weapon("Fossilized Copy of GM8",5),
    new Weapon("Pirated Copy of GMS2",5),
    new Weapon("Clone of Mark Overmars",5),
    new Weapon("Army of Five-Year Olds",7),
    new Weapon("Large Bone", 4),
    new Weapon("Dual Quaternion",6),
    new Weapon("View Matrix",4),
    new Weapon("Shader Fragment",4),
    new Weapon("Large 1.4 Script",4),
    new Weapon("Wet Sock",4),
    new Weapon("GM Commandment Stone",4),
    new Weapon("Gamer Chair",5),
    new Weapon("Blinding RGB Lights",3),
    new Weapon("Folding Chair",6),
    new Weapon("health-- call",1),
    new Weapon("Gratuitous Screenshake",4),
    new Weapon("Bottle of Gamefeel Juice",3),
    new Weapon("Circular Sawblade",6),
    new Weapon("Nokia 3310",9),
    new Weapon("Undertale Fangame",3),
    new Weapon("Game That’s Totally Not an Undertale Fangame",3),
    new Weapon("Katana",6),
    new Weapon("Sawgrass Sword",4),
    new Weapon("Walking Jury Table",4),
    new Weapon("YAL Doll",6),
    new Weapon("Oatmeal Raisin Cookie",2),
    new Weapon("Cold Glass of Milk",3),
    new Weapon("Loosely Weapon-Shaped Object",3),
    new Weapon("Falling Piano",7),
    new Weapon("Silent But Deadly Gas",4),
    new Weapon("Garfield Joke",2),
    new Weapon("Hot Pocket Straight From the Microwave",4),
    new Weapon("Compliment",1),
    new Weapon("Insult",4),
    new Weapon("Bad Vibe",3),
    new Weapon("Good Insult",6),
    new Weapon("Weak Karate Chop",2),
    new Weapon("Snek with a Knife",5),
    new Weapon("struct",4),
    new Weapon("Wet Finger in the Ear",5),
    new Weapon("Tickle",2),
    new Weapon("One Inch Punch",3),
    new Weapon("Sharp Object",4),
    new Weapon("Dry Stick",3),
    new Weapon("Bottle containing 8 Fluid Ounces of Mystery Liquid",8),
    new Weapon("Death Stare",3),
    new Weapon("Sidewalk Slam",5),
    new Weapon("Drop Kick",4),
    new Weapon("Shrump",3),
    new Weapon("Fanart of Mimpy",4),
    new Weapon("Birthday Greeting",3),
    new Weapon("execute_string function call",4),
    new Weapon(" a a-an aa a bad case of stuttering",2),
    new Weapon("godot.dev",3),
    new Weapon("Forgotten Semicolon",3),
    new Weapon("Unsolicited DM",7),
    new Weapon("Help Question in Lounge",3),
    new Weapon("@everyone mention",5),
    new Weapon("Huge Blue Robot",4),
    new Weapon("Mechanical Pencil",2),
    new Weapon("instance_destroy() call",4),
    new Weapon("Sad Rat",1),
    new Weapon("Grumpy Pug",6),
    new Weapon("Sick Burn",3),
    new Weapon("Red Shirt",2),
    new Weapon("Can of Pepsi",6),
    new Weapon("Unusual Facial Expression",2),
    new Weapon("Fish With Legs",5),
    new Weapon("Banhammer",9),
    new Weapon("Banhammer",9),
    new Weapon("<a:pacman_right:825657172981579806>",4)
]
const no_op = {
    skip: [
        '%name% got stuck in a while loop while trying to collide with `obj_wall`',
        '%name% got distracted by something shiny',
        '%name% was too busy muttering to themselves to notice the battle going on around them',
    ],
    heal: [
        {
            message: '%name% found a potion, recovering %v%hp!',
            heal: 20,
        },
        {
            message: '%name% ate some pizza, and recovered %v%hp!',
            heal: 10
        },
        {
            message: '%name% ate a bunch of grapes, and recovered %v%hp!',
            heal: 8,
        }
    ],
    hurt: [
        {
            message: '%name% stepped on a lego brick, and lost %v%hp',
            hurt: 20
        },
        {
            message: '%name% drank a super potion.. but it was expired! This cost them %v%hp',
            hurt: 20,
        }
    ],
    get_skip(/** @type {Fighter} */ fighter){
        const num = Math.floor(Math.random()*this.skip.length);
        return {
            message: this.skip[num].replace('%name%',fighter.name),
            type:'skip'
        }
    },
    get_heal(/** @type {Fighter} */ fighter){
        const num = Math.floor(Math.random()*this.heal.length);
        return {
            message: this.heal[num].message.replace('%name%',fighter.name).replace('%v%',this.heal[num].heal),
            heal: this.heal[num].heal,
            type:'heal'
        };
    },
    get_hurt(/** @type {Fighter} */ fighter){
        const num = Math.floor(Math.random()*this.hurt.length);
        return {
            message: this.hurt[num].message.replace('%name%',fighter.name).replace('%v%',this.hurt[num].hurt),
            hurt: this.hurt[num].hurt,
            type:'hurt'
        };
    },
    
}
    

function sleep(ms) {
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    });
};

client.on('ready',async()=>{
    const guild = await client.guilds.fetch(process.env.GUILD);
    channel = guild.channels.resolve(process.env.CHANNEL);
});
client.on('message',async (msg)=>{
    //console.log(msg.member.roles.cache);
    if (msg.member.roles.cache.find(r=>r.id=='324536542737727488') == undefined) return;
    if (msg.author.id == client.user.id) return;
    //if (msg.channel.id != process.env.CHANNEL) {
    //    return;
    //}
    if (msg.content.trim() == '!battle info') {
        if (msg.deletable) msg.delete();
        return msg.channel.send(`This is the Battle Royale Bot!`);
    }
    if (msg.content.trim() == '!battle init') {
        if(msg.deletable) {
            msg.delete();
        }
        const message = await msg.channel.send({
            embed: {
                title: "lets get ready to RUMBLE",
                description: "React to this message with :crossed_swords: to enter!",
                color: 11022898,
                timestamp: "2021-03-06T00:43:05.866Z",
                footer: {
                    text: "Built by @Sidorakh#8297"
                },
                author: {
                    "name": "GameMaker Battle Royale"
                }
            }
        });
        await message.react('⚔');
        state.message = message;
    }
    if (msg.content.trim() == '!battle begin') {
        if(msg.deletable) {
            msg.delete();
        }
        battle_step(msg.channel);
    }
});

async function battle_step(/** @type {discord.TextChannel*/ channel){
    const symbols = [
        ':red_square:',
        ':orange_square:',
        ':yellow_square:',
        ':green_square:',
        ':blue_square:',
        ':purple_square:',
        ':brown_square:',
        ':black_square:',
        ':white_square:',
        ':red_circle:',
        ':orange_circle:',
        ':yellow_circle:',
        ':green_circle:',
        ':blue_circle:',
        ':purple_circle:',
        ':brown_circle:',
        ':black_circle:',
        ':white_circle:',
        ':heart:',
        ':orange_heart:',
        ':yellow_heart:',
        ':green_heart:',
        ':blue_heart:',
        ':purple_heart:',
        ':brown_heart:',
        ':black_heart:',
        ':white_heart:',
    ];
    
    //const users = [{name:'Sidorakh',id:'141365209435471872'},{name:'shallowwater',id:'416804210894700564'},{name:'saratonin',id:'528368759551950848'},{name:'Mimpy',id:'230877503345000448'}];
    //const users = [{name:'Sidorakh',id:'141365209435471872'},{name:'baku',id:'225891587798859776'},{name:'Zandy',id:'261596299051270145'},{name:'Mimpy',id:'230877503345000448'}];
    const users = [];
    if (state.message != null) {
        state.message.reactions.cache.get('⚔').users.cache.each(user=>{
            if (user.id == client.user.id) return;
            users.push({name:user.username,id:user.id});
        });
    }
    let i = 0;
    state.fighters = [];
    for (const user of users) {
        state.fighters.push(new Fighter(user.name,'symbols[i]',user.id));
        i++;
    }
    const fields = [];
    for (const fighter of state.fighters) {
        fields.push({
            name: fighter.name,
            value: 'HP: ' + fighter.hp,
            inline: true,
        });
    }
    await channel.send({
        content:"The fighters are getting ready! ",
        embed: {
            fields
        }
    });
    await channel.send('Let the games begin!');
    let turn = 0;
    /** @type {Fighter} */
    let winner = null;
    while (winner == null) {
        turn += 1;
        await channel.send(`Turn ${turn};`);
        for (const fighter of state.fighters) {
            if (fighter.hp <= 0) continue;
            const num = Math.random();
            const chance = fighter.weapon == null ? 0.9 : 0.1;
            if (num < chance) {
                fighter.weapon = weapons[Math.floor(Math.random()*weapons.length)];
                await channel.send(`${fighter.name} picked up a ${fighter.weapon.name}`)
                await sleep(1*SECONDS);
            }
        }
        // console.log(state.fighters);
        // and now.. to FIGHT
        for (const fighter of state.fighters) {
            if (fighter.hp <= 0) {
                continue;
            }
            const targets = state.fighters.filter(v=>v.name != fighter.name && v.hp > 0) 
            if (targets.length == 0) {
                // I think this means someone won
                break;
            }
            const num = Math.random();
            if (num < 0.1) {
                let msg = []
                switch (Math.floor(Math.random()*3)) {
                    case 0:
                        // Skip
                        msg = no_op.get_skip(fighter);
                    break;
                    case 1:
                        // Heal
                        msg = no_op.get_heal(fighter);
                    break;
                    case 2:
                        // Hurt
                        msg = no_op.get_hurt(fighter);
                    break;
                }
                switch (msg.type) {
                    case 'heal': 
                        fighter.hp += msg.heal;
                    break;
                    case 'hurt':
                        fighter.hp -= msg.hurt;
                    break;
                }
                await channel.send(msg.message);
                if (fighter.hp <= 0) {
                    await channel.send(`${fighter.name} succumbed to their fatal injuries!`)
                }
                continue;
            }
            const target = targets[Math.floor(Math.random()*(targets.length))];
            const hit = Math.random();
            if (hit < 0.9) {
                const weapon = fighter.weapon ? `a${['a','e','i','o','u'].indexOf(fighter.weapon.name[0].toLowerCase()) != -1 ? 'n' : ''} ${fighter.weapon.name}` : 'their own bare hands';
                const damage = fighter.weapon ? fighter.weapon.damage : Math.floor(Math.random()*2);
                target.hp -= damage;
                await channel.send(`${fighter.name} attacked ${target.name} with ${weapon}, dealing ${damage == 0 ? 'no' : (damage+'hp')} damage`);
                if (damage == 0) { 
                    await channel.send(`but ${target.name} was unaffected!`);
                }
                if (target.hp <= 0) {
                    await channel.send(`${fighter.name} has killed ${target.name} with ${weapon}`);
                    target.hp = 0;
                }
            } else {
                await channel.send(`${fighter.name} tried to attack ${target.name}, but missed completely!`);
            }
            await sleep(2*SECONDS);
        }

        const fields = [];
        for (const fighter of state.fighters) {
            fields.push({
                name: fighter.name,
                value: 'HP: ' + fighter.hp,
                inline: true,
            });
        }
        await channel.send({
            content:`Turn ${turn} is over:`,
            embed: {
                fields
            }
        });
        if (state.fighters.filter(v=>v.hp > 0).length == 1) {
            winner = state.fighters.filter(v=>v.hp>0)[0];
            console.log(`Looks like everone else is dead, so, ${winner.name} has won!`);
            break;
        }
        if (state.fighters.filter(v=>v.hp>0).length==0) {
            break;
        }
        await sleep(10*SECONDS);
        
    }
    if (winner == null) {
        await channel.send('Every fighter has fallen! There is no winner!')
    } else {
        if (winner.elder_god != false) {
            await channel.send(`Fighter <@${winner.id}> has emerged victorious!`);
            (await channel.guild.members.fetch(winner.id)).roles.add('826256397800833104');
        } else {
            await channel.send(`Elder god ${winner.name} has emerged victorious!`)
        }
    }

}

console.log('Ret-2-Go!');