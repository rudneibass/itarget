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
        all: '/usuario/all',
        organizacoes: '/usuario/organizacoes'
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
        uploadS3: '/arquivo/upload-s3',
        download: '/arquivo/download',
        delete: '/arquivo/delete',
        list: '/arquivo/list',
        get: '/arquivo/get',
        save: '/arquivo/save'
    }
}