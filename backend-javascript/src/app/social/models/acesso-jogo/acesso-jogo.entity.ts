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
@Unique(['jogoId', 'usuarioId'])
export class AcessoJogo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'jogo_id', type: 'int' })
  jogoId: number;

  @ManyToOne(() => Jogo)
  @JoinColumn({ name: 'jogo_id', referencedColumnName: 'id' })
  jogo: Jogo;

  @Column({ name: 'usuario_id', type: 'int' })
  usuarioId: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario: Usuario;

  @Column({ name: 'custo_moedas', type: 'int', default: 0 })
  custoMoedas: number;

  @CreateDateColumn({ name: 'liberado_em', type: 'timestamp' })
  liberadoEm: Date;
}
