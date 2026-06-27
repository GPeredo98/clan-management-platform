import { ClanMemberRole } from "../enums";
import { IconUrls } from "./icon-urls.interface";
import { PlayerHouse } from "./player-house.interface";

export interface Member {
	tag: string;
	name: string;
	role: ClanMemberRole;
	townHallLevel: number;
	expLevel: number;
	clanRank: number;
	previousClanRank: number;
	donations: number;
	donationsReceived: number;
	trophies: number;
	builderBaseTrophies: number;
	league?: { id: number; name: string; iconUrls: IconUrls };
	playerHouse?: PlayerHouse;
}