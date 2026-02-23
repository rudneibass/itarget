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

@Entity({ schema: 'social', name: 'atividade' })
export class Atividade {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  uuid: string;

  @Column({ name: 'organizacao_uuid', type: 'text' })
  organizacaoUuid: string;

  @ManyToOne(() => Organizacao)
  @JoinColumn({ name: 'organizacao_uuid', referencedColumnName: 'uuid' })
  organizacao: Organizacao;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao: string | null;

  @Column({ name: 'moedas_por_acerto', type: 'int', default: 1 })
  moedasPorAcerto: number;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;
}
