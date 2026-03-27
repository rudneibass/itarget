import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organizacao } from '../organizacao/organizacao.entity';

@Entity({ schema: 'social', name: 'perfil_instagram' })
export class PerfilInstagram {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  uuid: string;

  @Column({ name: 'organizacao_id', type: 'int' })
  organizacaoId: number;

  @ManyToOne(() => Organizacao)
  @JoinColumn({ name: 'organizacao_id', referencedColumnName: 'id' })
  organizacao: Organizacao;

  @Column({ type: 'varchar', length: 120 })
  perfil: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  categoria: string | null;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;
}
