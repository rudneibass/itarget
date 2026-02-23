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

@Entity({ schema: 'social', name: 'recompensa' })
export class Recompensa {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  uuid: string;

  @Column({ name: 'organizacao_uuid', type: 'text' })
  organizacaoUuid: string;

  @ManyToOne(() => Organizacao, (organizacao) => organizacao.recompensas)
  @JoinColumn({ name: 'organizacao_uuid', referencedColumnName: 'uuid' })
  organizacao: Organizacao;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'varchar', length: 120 })
  tipo: string;

  @Column({ name: 'custo_moedas', type: 'int', default: 0 })
  custoMoedas: number;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;
}
