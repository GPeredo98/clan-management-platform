import { getClanInfo } from '@/core/api/coc-service';
import { Member } from '@/core/api/interfaces/member.interface';

export const dynamic = 'force-dynamic';

export default async function MiembrosPage() {
  const clanData = await getClanInfo();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="rounded-xl bg-slate-900 p-4 text-white shadow-lg ring-1 ring-slate-800 sm:p-6">
        <h1 className="text-2xl font-bold sm:text-3xl">{clanData.name}</h1>
        <p className="mt-1 text-sm text-slate-300 sm:text-base">{clanData.description}</p>

        <div className="mt-4 grid grid-cols-1 gap-3 text-sm font-semibold sm:grid-cols-3 sm:gap-4">
          <div className="rounded-lg bg-slate-800 p-3 ring-1 ring-slate-700 transition-transform duration-200 hover:-translate-y-0.5">
            Puntos de Clan: <span className="text-amber-400">{clanData.clanPoints}</span>
          </div>
          <div className="rounded-lg bg-slate-800 p-3 ring-1 ring-slate-700 transition-transform duration-200 hover:-translate-y-0.5">
            Miembros conectados: <span className="text-amber-400">{clanData.members}/50</span>
          </div>
          <div className="rounded-lg bg-slate-800 p-3 ring-1 ring-slate-700 transition-transform duration-200 hover:-translate-y-0.5">
            Nivel de Clan: <span className="text-amber-400">{clanData.clanLevel}</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-100">Lista de Integrantes y Notas Internas</h2>

      <div className="space-y-3 md:hidden">
        {clanData.memberList.map((member: Member) => {
          return (
            <article key={member.tag} className="rounded-lg border border-slate-700 bg-slate-900 p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
              <h3 className="text-base font-semibold text-slate-100">{member.name}</h3>
              <p className="mt-0.5 text-xs text-slate-400">{member.tag}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">Rango</dt>
                  <dd className="font-medium text-slate-200">{member.role}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">Donaciones</dt>
                  <dd className="font-medium text-slate-200">
                    ⬆️ {member.donations} / ⬇️ {member.donationsReceived}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">Nota del Sistema</dt>
                  <dd className="font-medium text-slate-400">Sin nota</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>

      <div className="hidden overflow-x-auto rounded-lg border border-slate-700 bg-slate-900 md:block">
        <table className="min-w-full divide-y divide-slate-700 text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-slate-200">Nombre</th>
              <th className="px-4 py-3 text-left font-bold text-slate-200">Rango</th>
              <th className="px-4 py-3 text-left font-bold text-slate-200">Donaciones</th>
              <th className="px-4 py-3 text-left font-bold text-slate-200">Nota del Sistema (Postgres)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {clanData.memberList.map((member: Member) => {
              return (
                <tr key={member.tag} className="transition-colors duration-200 hover:bg-slate-800">
                  <td className="px-4 py-3 font-medium text-slate-100">
                    {member.name} <span className="text-xs text-slate-500">{member.tag}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{member.role}</td>
                  <td className="px-4 py-3 text-slate-300">
                    ⬆️ {member.donations} / ⬇️ {member.donationsReceived}
                  </td>
                  <td className="px-4 py-3 text-slate-400">Sin nota</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}