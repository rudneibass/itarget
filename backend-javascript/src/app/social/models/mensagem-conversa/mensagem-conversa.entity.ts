import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversa } from '../conversa/conversa.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'social', name: 'mensagem_conversa' })
export class MensagemConversa {
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

  @Column({ type: 'text' })
  conteudo: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
