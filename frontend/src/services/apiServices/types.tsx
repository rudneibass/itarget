export type ServiceType = {
		icone: string,
		setor_id: number,
		setor: string,
		qtde: string,
		vlrunit: string,
		total: string,
		erro?: string
	}


export type GroupServiceType = {
		setor_id: number,
		setor: string,
		servico: string,
		servico_id: number,
		qtde: string,
		vlrunit: string,
		total: string,
		erro?: string
	}

export type GroupServiceTotals = {
		qtde_pessoas: number,
		qtde_atendimentos: number,
		total: number
	}	