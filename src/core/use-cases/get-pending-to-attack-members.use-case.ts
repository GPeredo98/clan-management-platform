import { WarMember } from "../api/interfaces/war-member.interface";
import { CocApiRepository } from "../infraestructure/repositories/coc-api.repository";

export class GetPendingToAttackMembersUseCase {
	constructor(private readonly cocApiRepository: CocApiRepository) { }

	async execute() {
		const currentWarInfo = await this.cocApiRepository.getCurrentWarInfo();
		const twoAttacksPending = currentWarInfo.clan.members.filter((member: WarMember) => {
			return member.attacks === undefined || member.attacks.length === 0;
		});
		const oneAttackPending = currentWarInfo.clan.members.filter((member: WarMember) => {
			return member.attacks?.length === 1;
		});
		const pendingToAttackMembers = {
			twoAttacksPending: twoAttacksPending.map((member: WarMember) => member.name),
			oneAttackPending: oneAttackPending.map((member: WarMember) => member.name)
		}
		return pendingToAttackMembers;
	}
}