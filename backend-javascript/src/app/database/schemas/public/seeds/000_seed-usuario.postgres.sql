/*
login: admin@admin
senha: 123
*/
INSERT INTO public.usuario ("uuid",nome,email,senha_hash,ativo,criado_em,alterado_em) VALUES
	 ('0c2af102-23d2-4859-8e99-9d3d70bf5796','admin'
	 ,'admin@admin'
	 ,'c780888d802d28f2ed74de6a652cbf9a:2c06fba87583844415b5015ffdc4d8285c9f286c76ba571015c27a39f9371f4d'
	 ,true
	 ,now()
	 ,now()
);
