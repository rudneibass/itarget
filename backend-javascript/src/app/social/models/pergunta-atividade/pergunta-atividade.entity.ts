import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Atividade } from '../atividade/atividade.entity';

@Entity({ schema: 'social', name: 'pergunta_atividade' })
export class PerguntaAtividade {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'atividade_uuid', type: 'text' })
  atividadeUuid: string;

  @ManyToOne(() => Atividade)
  @JoinColumn({ name: 'atividade_uuid', referencedColumnName: 'uuid' })
  atividade: Atividade;

  @Column({ type: 'int' })
  ordem: number;

  @Column({ type: 'text' })
  pergunta: string;

  @Column({ name: 'resposta_correta', type: 'text' })
  respostaCorreta: string;
}
