import { db } from '@/core/db'

export default async function MiembrosPage() {
  const databaseNotas = await db.member.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Notas de Miembros</h1>
      <div className="mt-4">
        {databaseNotas.map((nota) => (
          <div key={nota.id} className="border-b py-2">
            <p className="font-semibold">{nota.fullName}</p>
            <p className="text-gray-600">{nota.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}