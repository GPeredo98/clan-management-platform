import { ClanWarAttack } from "./clan-war-attack.interface";

export interface WarMember {
	tag: string;
	name: string;
	townHallLevel: number;
	mapPosition: number;
	opponentAttacks: number;
	bestOpponentAttack?: ClanWarAttack;
	attacks?: ClanWarAttack[];
}