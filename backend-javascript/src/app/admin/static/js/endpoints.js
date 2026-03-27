const 
endpoints = {
    video: {
        get: '/video',
        list: '/video/all',
        all: '/video/all',
        edit: '/video/edit',
        save: '/video/save'
    },
    organizacao: {
        get: '/organizacao',
        list: '/organizacao/all',
        all: '/organizacao/all',
        edit: '/organizacao/edit',
        save: '/organizacao/save'
    },
    usuario: {
        all: '/usuario-social/all',
        colaboradores: '/usuario-social/colaboradores',
        organizacoes: '/usuario-social/organizacoes'
    },
    jogo: {
        all: '/jogo/all',
        organizacoes: '/jogo/organizacoes'
    },
    recompensa: {
        all: '/recompensa/all',
        organizacoes: '/recompensa/organizacoes'
    },
    arquivo: {
        form: '/arquivo/form',
        uploadLocalServer: '/arquivo/upload-local-server',  
        delete: '/arquivo',
        list: '/arquivo/all',
        get: '/arquivo'
    }
}