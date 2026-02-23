export class CriarPublicacaoDto {
  tipo: 'texto' | 'emoji' | 'imagem' | 'video';
  texto?: string;
  midiaUrl?: string;
  urlRedirecionamento?: string;
  tituloRedirecionamento?: string;
}
