import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'public', name: 'arquivo' })
export class Arquivo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  slug: string | null;

  @Column({ name: 'entidade_pai', type: 'varchar', length: 255 })
  entidadePai: string;

  @Column({ name: 'entidade_pai_id', type: 'int' })
  entidadePaiId: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'int' })
  tamanho: number;

  @Column({ type: 'jsonb', nullable: true })
  configuracao: Record<string, any> | null;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;

  @Column({ name: 'criado_por_usuario_id', type: 'int' })
  criadoPorUsuarioId: number;

  @Column({ name: 'alterado_por_usuario_id', type: 'int' })
  alteradoPorUsuarioId: number;
}
