import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Publicacao } from '../publicacao/publicacao.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'social', name: 'curtida_publicacao' })
@Unique(['publicacaoUuid', 'usuarioUuid'])
export class CurtidaPublicacao {
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

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
