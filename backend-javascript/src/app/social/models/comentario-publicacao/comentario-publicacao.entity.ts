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

  @Column({ name: 'publicacao_id', type: 'int' })
  publicacaoId: number;

  @ManyToOne(() => Publicacao)
  @JoinColumn({ name: 'publicacao_id', referencedColumnName: 'id' })
  publicacao: Publicacao;

  @Column({ name: 'usuario_id', type: 'int' })
  usuarioId: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario: Usuario;

  @Column({ type: 'text' })
  comentario: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
