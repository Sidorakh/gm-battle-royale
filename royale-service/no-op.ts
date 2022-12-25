type SkipTurn = ((n: string)=>string);
type HealTurn = ((n: string,v: number)=>string);
type HurtTurn = ((n: string, v: number)=>string);

export const skips: SkipTurn[] = [
    n=>`⏭ ${n} got stuck in a while loop while trying to collide with \`obj_wall\``,
    n=>`⏭ ${n} got distracted by something shiny`,
    n=>`⏭ ${n} was too busy muttering to themselves to notice the battle going on around them`,
    n=>`⏭ ${n} found themselves engrossed in the riveting document that is the GameMaker Manual`,
    n=>`⏭ ${n} decided to needlessly optimise their code, in direct violation of Commandment XIII`,
];

export const heals: HealTurn[] = [
    (n,v)=>`🔼 ${n} found a potion, healing ${v} hp`,
    (n,v)=>`🔼 ${n} ate some pizza and recovered ${v} hp`,
    (n,v)=>`🔼 ${n} drank some Coca Cola, recovering ${v} hp`,
    (n,v)=>`🔼 ${n} drank a super potion and healed ${v} hp`,
    (n,v)=>`🔼 ${n} ate some chips and recovered ${v} hp`,
    (n,v)=>`🔼 ${n} called upon the power of Mark Overmars to fix their body and gained ${v} hp in the process`,
    (n,v)=>`🔼 ${n} drank some Fanta Orange, healing ${v} hp`,
];

export const hurts: HurtTurn[] = [
    (n,v)=>`🔽 ${n} stepped on a LEGO brick, losing ${v} hp`,
    (n,v)=>`🔽 ${n} drank a super potion.. but it was expired! This cost them ${v} hp`,
    (n,v)=>`🔽 ${n} sneezed so hard it threw their back out, and lost ${v} hp`,
    (n,v)=>`🔽 ${n} ran right into a wall, losing ${v} hp`,
    (n,v)=>`🔽 ${n} leant back too far on a chair while watching the battle and hit the ground, costing them ${v} hp`,
    (n,v)=>`🔽 ${n} tripped over their own feet and fell flat on their face, and lost ${v} hp`,
    (n,v)=>`🔽 ${n} poked a bear and suffered the consequences, losing ${v} hp`,
    (n,v)=>`🔽 ${n} got stuck in an escalator, and barely escaped with their life, losing ${v} hp in the process`,
    (n,v)=>`🔽 ${n} tried to open a can of Fanta Orange, but cut themselves on the ringpull, losing ${v} hp`,
    (n,v)=>`🔽 ${n} opened a can and drank it.. unfortunately, it was Pepsi, so they lost ${v} hp`,
];

export default {skips,heals,hurts};