import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Jogo } from '../jogo/jogo.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ schema: 'social', name: 'acesso_jogo' })
@Unique(['jogoUuid', 'usuarioUuid'])
export class AcessoJogo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'jogo_uuid', type: 'text' })
  jogoUuid: string;

  @ManyToOne(() => Jogo)
  @JoinColumn({ name: 'jogo_uuid', referencedColumnName: 'uuid' })
  jogo: Jogo;

  @Column({ name: 'usuario_uuid', type: 'text' })
  usuarioUuid: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_uuid', referencedColumnName: 'uuid' })
  usuario: Usuario;

  @Column({ name: 'custo_moedas', type: 'int', default: 0 })
  custoMoedas: number;

  @CreateDateColumn({ name: 'liberado_em', type: 'timestamp' })
  liberadoEm: Date;
}
