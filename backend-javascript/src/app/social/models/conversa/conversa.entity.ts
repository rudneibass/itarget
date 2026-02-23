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

@Entity({ schema: 'social', name: 'conversa' })
export class Conversa {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  uuid: string;

  @Column({ name: 'organizacao_uuid', type: 'text' })
  organizacaoUuid: string;

  @ManyToOne(() => Organizacao)
  @JoinColumn({ name: 'organizacao_uuid', referencedColumnName: 'uuid' })
  organizacao: Organizacao;

  @Column({ name: 'criado_por_usuario_uuid', type: 'text' })
  criadoPorUsuarioUuid: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'criado_por_usuario_uuid', referencedColumnName: 'uuid' })
  criadoPorUsuario: Usuario;

  @Column({ type: 'varchar', length: 255, nullable: true })
  titulo: string | null;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
