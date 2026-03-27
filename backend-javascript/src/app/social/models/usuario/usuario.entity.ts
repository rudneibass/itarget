import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organizacao } from '../organizacao/organizacao.entity';
import { PermissaoUsuario } from '../permissao-usuario/permissao-usuario.entity';

@Entity({ schema: 'social', name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  uuid: string;

  @Column({ name: 'organizacao_id', type: 'int' })
  organizacaoId: number;

  @ManyToOne(() => Organizacao, (organizacao) => organizacao.usuarios, { eager: false })
  @JoinColumn({ name: 'organizacao_id', referencedColumnName: 'id' })
  organizacao: Organizacao;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  apelido: string | null;

  @Column({ name: 'url_avatar', type: 'text', nullable: true })
  urlAvatar: string | null;

  @Column({ name: 'hash_qr', type: 'text', unique: true })
  hashQr: string;

  @Column({ type: 'int', default: 0 })
  moedas: number;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;

  @OneToOne(() => PermissaoUsuario, (permission) => permission.usuario)
  permission: PermissaoUsuario;
}
