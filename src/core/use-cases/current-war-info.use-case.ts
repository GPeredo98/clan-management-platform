import { CocApiRepository } from "../infraestructure/repositories/coc-api.repository";

export class CurrentWarInfoUseCase {
	constructor(private readonly cocApiRepository: CocApiRepository) { }

	async execute() {
		const currentWarInfo = await this.cocApiRepository.getCurrentWarInfo();
		const timeLeft = currentWarInfo.endTime ? new Date(currentWarInfo.endTime).getTime() - Date.now() : null;
		const info = {
			state: currentWarInfo.state,
			timeLeft: timeLeft === null || Number.isNaN(timeLeft) ? 0 : timeLeft,
			clanStars: currentWarInfo.clan.stars,
			clanAttacksRemaining: currentWarInfo.teamSize * currentWarInfo.attacksPerMember - currentWarInfo.clan.attacks,
			opponentStars: currentWarInfo.opponent.stars,
			opponentAttacksRemaining: currentWarInfo.teamSize * currentWarInfo.attacksPerMember - currentWarInfo.opponent.attacks
		}
		return info;
	}
}