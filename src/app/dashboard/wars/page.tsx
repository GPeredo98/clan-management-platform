import { WAR_STATE_LABELS } from "@/app/constants/war-states";
import CopyBox from "@/components/CopyBox";
import { CocApiRepository } from "@/core/infraestructure/repositories/coc-api.repository";
import { CurrentWarInfoUseCase } from "@/core/use-cases/current-war-info.use-case";
import { GetPendingToAttackMembersUseCase } from "@/core/use-cases/get-pending-to-attack-members.use-case";

export default async function WarsPage() {
	const cocApiRepository = new CocApiRepository();
	const getPendingToAttackMembersUseCase = new GetPendingToAttackMembersUseCase(cocApiRepository);
	const currentWarInfoUseCase = new CurrentWarInfoUseCase(cocApiRepository);
	const pendingToAttackMembers = await getPendingToAttackMembersUseCase.execute();
	const currentWarInfo = await currentWarInfoUseCase.execute();
	const winnerLabel = currentWarInfo.clanStars > currentWarInfo.opponentStars
		? "¡GANANDO! ✅"
		: currentWarInfo.clanStars < currentWarInfo.opponentStars
			? "¡PERDIENDO! ❌"
			: "¡EMPATE! ⚠️";

	const totalSeconds = Math.max(0, Math.floor(currentWarInfo.timeLeft / 1000));
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	const formattedTimeLeft = `${hours}h ${minutes}m ${seconds}s`;
	const textoParaCopiar = `⚔️ INFORMACIÓN DE LA GUERRA ⚔️

${winnerLabel}

Estado: ${WAR_STATE_LABELS[currentWarInfo.state] || currentWarInfo.state}
Tiempo restante: ${currentWarInfo.timeLeft !== null ? `${Math.floor(currentWarInfo.timeLeft / 1000)} segundos` : 'N/A'}
Estrellas del clan: ${currentWarInfo.clanStars}
Ataques restantes del clan: ${currentWarInfo.clanAttacksRemaining}
Estrellas del oponente: ${currentWarInfo.opponentStars}
Ataques restantes del oponente: ${currentWarInfo.opponentAttacksRemaining}

⚔️ MIEMBROS PENDIENTES DE ATACAR ⚔️

🔴 DOS ATAQUES PENDIENTES:
${pendingToAttackMembers.twoAttacksPending.length > 0
			? pendingToAttackMembers.twoAttacksPending.map((name: string) => `- ${name}`).join('\n')
			: 'Ninguno'}

🟡 UN ATAQUE PENDIENTE:
${pendingToAttackMembers.oneAttackPending.length > 0
			? pendingToAttackMembers.oneAttackPending.map((name: string) => `- ${name}`).join('\n')
			: 'Ninguno'}`;

	return (
		<div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
			<header className="rounded-xl bg-slate-900 p-4 shadow-lg ring-1 ring-slate-800 sm:p-6">
				<p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Estado actual</p>
				<h1 className="mt-1 text-2xl font-bold text-slate-100 sm:text-3xl">Current War</h1>
				<p className="mt-2 text-sm text-slate-300 sm:text-base">{winnerLabel}</p>
			</header>

			<section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				<div className="rounded-lg bg-slate-900 p-4 shadow-sm ring-1 ring-slate-800 transition-transform duration-200 hover:-translate-y-0.5">
					<p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Estado</p>
					<p className="mt-2 text-lg font-semibold text-slate-100">{WAR_STATE_LABELS[currentWarInfo.state] || currentWarInfo.state}</p>
				</div>
				<div className="rounded-lg bg-slate-900 p-4 shadow-sm ring-1 ring-slate-800 transition-transform duration-200 hover:-translate-y-0.5">
					<p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tiempo restante</p>
					<p className="mt-2 text-lg font-semibold text-slate-100">{formattedTimeLeft}</p>
				</div>
				<div className="rounded-lg bg-slate-900 p-4 shadow-sm ring-1 ring-slate-800 transition-transform duration-200 hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1">
					<p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Marcador</p>
					<p className="mt-2 text-lg font-semibold text-slate-100">
						Clan {currentWarInfo.clanStars} - {currentWarInfo.opponentStars} Rival
					</p>
					<p className="mt-1 text-sm text-slate-300">
						Ataques restantes: clan {currentWarInfo.clanAttacksRemaining} | rival {currentWarInfo.opponentAttacksRemaining}
					</p>
				</div>
			</section>

			<div className="rounded-xl bg-slate-900 p-3 shadow-sm ring-1 ring-slate-800 sm:p-4">
				<CopyBox text={textoParaCopiar} />
			</div>
		</div>
	);
}