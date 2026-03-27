import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Jogo } from '../jogo/jogo.entity';
import { Publicacao } from '../publicacao/publicacao.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'public', name: 'organizacao' })
export class Organizacao {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  slug: string | null;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterado_em', type: 'timestamp' })
  alteradoEm: Date;

  @OneToMany(() => Usuario, (usuario) => usuario.organizacao)
  usuarios: Usuario[];

  @OneToMany(() => Jogo, (jogo) => jogo.organizacao)
  jogos: Jogo[];

  @OneToMany(() => Publicacao, (publicacao) => publicacao.organizacao)
  publicacoes: Publicacao[];
}
