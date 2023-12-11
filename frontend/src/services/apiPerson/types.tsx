export interface Person {
    id: number;
    sequencia: string,
    numero?: string;
    nome_completo?: string;
    apelido?: string;
    endereco?: string;
    cpf?: string;
    telefone_fixo?: string;
    cel_01?: string;
    dta_nascimento?: string;
    sexo?: string;
    sus?: string;
    mae?: string;
    ref_pai?: number;
    total_qtde?: string;
    total_economizado?: string;
    id_agentesocial?: number;
    agentesocial?: string;
  };

  export interface RequestByPerson {
    id?: number,
    protocolo?: string,
    setor?: string,
    descricao?: string,
    qtde?: string,
    data: string,
    previsao?: string,
    data_final: string,
    data_finalizacao?: string,
    vlr_unitario?: string,
    total?: string
  }

  export interface FamilyByPerson {
		sequencia?: string,
    nome_completo?: string,
		numero?: string,
		cpf?: string,
		fonte_renda?: string,
		id?: number,
		pessoa_id?: number,
		ref_pai?: number,
		parentesco?: string
	}