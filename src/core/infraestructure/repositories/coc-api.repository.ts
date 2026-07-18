export class CocApiRepository {
	async getClanInfo() {
		const token = process.env.COC_API_KEY;
		const clanTag = process.env.COC_CLAN_TAG;

		if (!token || !clanTag) {
			throw new Error('Faltan configurar las variables de entorno de Clash of Clans');
		}
		const cleanClanTag = encodeURIComponent(clanTag);

		const response = await fetch(`https://api.clashofclans.com/v1/clans/${cleanClanTag}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			},
			next: { revalidate: 300 }
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error al consultar la API de CoC: ${response.status} - ${errorText}`);
		}

		return await response.json();
	}

	async getCurrentWarInfo() {
		const token = process.env.COC_API_KEY;
		const clanTag = process.env.COC_CLAN_TAG;
		if (!token || !clanTag) {
			throw new Error('Faltan configurar las variables de entorno de Clash of Clans');
		}
		const cleanClanTag = encodeURIComponent(clanTag);

		const response = await fetch(`https://api.clashofclans.com/v1/clans/${cleanClanTag}/currentwar`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			},
			next: { revalidate: 300 }
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error al consultar la API de CoC: ${response.status} - ${errorText}`);
		}
		return await response.json();
	}
}