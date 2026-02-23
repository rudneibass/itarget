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

@Entity({ schema: 'social', name: 'jogo' })
export class Jogo {
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
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string | null;

  @Column({ type: 'text' })
  url: string;

  @Column({ name: 'custo_moedas', type: 'int', default: 0 })
  custoMoedas: number;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;
}
