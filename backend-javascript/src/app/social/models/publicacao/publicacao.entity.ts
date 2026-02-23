import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organizacao } from '../organizacao/organizacao.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'social', name: 'publicacao' })
export class Publicacao {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  uuid: string;

  @Column({ name: 'organizacao_uuid', type: 'text' })
  organizacaoUuid: string;

  @ManyToOne(() => Organizacao, (organizacao) => organizacao.publicacoes)
  @JoinColumn({ name: 'organizacao_uuid', referencedColumnName: 'uuid' })
  organizacao: Organizacao;

  @Column({ name: 'usuario_uuid', type: 'text' })
  usuarioUuid: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_uuid', referencedColumnName: 'uuid' })
  usuario: Usuario;

  @Column({ type: 'varchar', length: 30 })
  tipo: string;

  @Column({ type: 'text', nullable: true })
  texto: string | null;

  @Column({ name: 'midia_url', type: 'text', nullable: true })
  midiaUrl: string | null;

  @Column({ name: 'url_redirecionamento', type: 'text', nullable: true })
  urlRedirecionamento: string | null;

  @Column({ name: 'titulo_redirecionamento', type: 'varchar', length: 255, nullable: true })
  tituloRedirecionamento: string | null;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
