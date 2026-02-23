import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Publicacao } from '../publicacao/publicacao.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'social', name: 'comentario_publicacao' })
export class ComentarioPublicacao {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'publicacao_uuid', type: 'text' })
  publicacaoUuid: string;

  @ManyToOne(() => Publicacao)
  @JoinColumn({ name: 'publicacao_uuid', referencedColumnName: 'uuid' })
  publicacao: Publicacao;

  @Column({ name: 'usuario_uuid', type: 'text' })
  usuarioUuid: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_uuid', referencedColumnName: 'uuid' })
  usuario: Usuario;

  @Column({ type: 'text' })
  comentario: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
