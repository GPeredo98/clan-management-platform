import { getClanInfo } from '@/core/api/coc-service';
import { Member } from '@/core/api/interfaces/member.interface';

export default async function MiembrosPage() {
  const clanData = await getClanInfo();

  return (
    <div className="p-6">
      <div className="mb-8 p-6 bg-slate-800 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">{clanData.name}</h1>
        <p className="text-slate-400 mt-1">{clanData.description}</p>
        
        <div className="flex gap-6 mt-4 text-sm font-semibold">
          <div>Puntos de Clan: <span className="text-amber-400">{clanData.clanPoints}</span></div>
          <div>Miembros conectados: <span className="text-amber-400">{clanData.members}/50</span></div>
          <div>Nivel de Clan: <span className="text-amber-400">{clanData.clanLevel}</span></div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Lista de Integrantes y Notas Internas</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-gray-700">Nombre</th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">Rango</th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">Donaciones</th>
              <th className="px-4 py-2 text-left font-bold text-gray-700">Nota del Sistema (Postgres)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clanData.memberList.map((member: Member) => {
              return (
                <tr key={member.tag} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {member.name} <span className="text-xs text-gray-400">{member.tag}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{member.role}</td>
                  <td className="px-4 py-3 text-gray-600">
                    ⬆️ {member.donations} / ⬇️ {member.donationsReceived}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}