import { ClanType, WarFrequency } from "../enums";
import { IconUrls } from "./icon-urls.interface";
import { Member } from "./member.interface";


export interface Clan {
	tag: string;
	name: string;
	description: string;
	type: ClanType;
	clanLevel: number;
	clanPoints: number;
	clanBuilderBasePoints: number;
	clanCapitalPoints: number;
	members: number;
	warWinStreak: number;
	warWins: number;
	warTies: number;
	warLosses: number;
	warFrequency: WarFrequency;
	isWarLogPublic: boolean;
	isFamilyFriendly: boolean;
	memberList: Member[];
	labels: Array<{ id: number; name: string; iconUrls: IconUrls }>;
	location: { id: number; name: string; isCountry: boolean; countryCode: string };
	badgeUrls: IconUrls;
	clanCapital: {
		capitalHallLevel: number;
		districts: Array<{ id: number; name: string; districtHallLevel: number }>;
	};
}