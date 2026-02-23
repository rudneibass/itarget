import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recompensa } from '../recompensa/recompensa.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'social', name: 'resgate_recompensa' })
export class ResgateRecompensa {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'recompensa_uuid', type: 'text' })
  recompensaUuid: string;

  @ManyToOne(() => Recompensa)
  @JoinColumn({ name: 'recompensa_uuid', referencedColumnName: 'uuid' })
  recompensa: Recompensa;

  @Column({ name: 'usuario_uuid', type: 'text' })
  usuarioUuid: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_uuid', referencedColumnName: 'uuid' })
  usuario: Usuario;

  @Column({ name: 'custo_moedas', type: 'int' })
  custoMoedas: number;

  @Column({ type: 'varchar', length: 40, default: 'pendente' })
  status: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
