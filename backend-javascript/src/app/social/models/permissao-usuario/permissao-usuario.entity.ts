import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'social', name: 'permissao_usuario' })
export class PermissaoUsuario {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'usuario_uuid', type: 'text', unique: true })
  usuarioUuid: string;

  @OneToOne(() => Usuario, (user) => user.permission)
  @JoinColumn({ name: 'usuario_uuid', referencedColumnName: 'uuid' })
  usuario: Usuario;

  @Column({ name: 'pode_postar_midia', type: 'boolean', default: false })
  podePostarMidia: boolean;

  @Column({ name: 'pode_postar_link', type: 'boolean', default: false })
  podePostarLink: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;
}
