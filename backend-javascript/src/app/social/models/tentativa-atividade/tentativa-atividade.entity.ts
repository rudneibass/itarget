import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Atividade } from '../atividade/atividade.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'social', name: 'tentativa_atividade' })
export class TentativaAtividade {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  uuid: string;

  @Column({ name: 'atividade_uuid', type: 'text' })
  atividadeUuid: string;

  @ManyToOne(() => Atividade)
  @JoinColumn({ name: 'atividade_uuid', referencedColumnName: 'uuid' })
  atividade: Atividade;

  @Column({ name: 'usuario_uuid', type: 'text' })
  usuarioUuid: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_uuid', referencedColumnName: 'uuid' })
  usuario: Usuario;

  @Column({ name: 'indice_pergunta', type: 'int', default: 0 })
  indicePergunta: number;

  @Column({ name: 'pergunta_iniciada_em', type: 'timestamp', nullable: true })
  perguntaIniciadaEm: Date | null;

  @Column({ type: 'int', default: 0 })
  acertos: number;

  @Column({ name: 'moedas_ganhas', type: 'int', default: 0 })
  moedasGanhas: number;

  @Column({ type: 'boolean', default: false })
  concluido: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;
}
