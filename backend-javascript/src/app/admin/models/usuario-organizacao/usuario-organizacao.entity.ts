import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'public', name: 'usuario_organizacao' })
export class UsuarioOrganizacao {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'usuario_id', type: 'int' })
  usuarioId: number;

  @Column({ name: 'organizacao_id', type: 'int' })
  organizacaoId: number;

  @Column({ type: 'varchar', length: 20, default: 'COLABORADOR' })
  tipo: string;

  @Column({ name: 'criado_por_usuario_id', type: 'int', nullable: true })
  criadoPorUsuarioId: number | null;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;
}