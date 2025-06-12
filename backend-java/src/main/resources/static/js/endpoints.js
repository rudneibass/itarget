const 
endpoints = {
    publicacao: {
        get: '/publicacoes/id',
        list: '/publicacoes/all',
        form: '/publicacoes/form',
        save: '/publicacoes/save'  
    },
    arquivo: {
        form: '/arquivo/form',
        uploadLocalServer: '/arquivo/upload-local-server',  
        uploadS3: '/arquivo/upload-s3',
        download: '/arquivo/download',
        delete: '/arquivo/delete',
        list: '/arquivo/list',
        get: '/arquivo/id',
        save: '/arquivo/save'
    }
}