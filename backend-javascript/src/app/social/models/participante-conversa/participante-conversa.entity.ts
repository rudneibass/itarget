import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Conversa } from '../conversa/conversa.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'social', name: 'participante_conversa' })
@Unique(['conversaUuid', 'usuarioUuid'])
export class ParticipanteConversa {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'conversa_uuid', type: 'text' })
  conversaUuid: string;

  @ManyToOne(() => Conversa)
  @JoinColumn({ name: 'conversa_uuid', referencedColumnName: 'uuid' })
  conversa: Conversa;

  @Column({ name: 'usuario_uuid', type: 'text' })
  usuarioUuid: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_uuid', referencedColumnName: 'uuid' })
  usuario: Usuario;

  @CreateDateColumn({ name: 'entrou_em', type: 'timestamp' })
  entrouEm: Date;
}
