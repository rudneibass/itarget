import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('video')
export class Video {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  uuid: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'alterao_em', type: 'timestamp' })
  alteracaoEm: Date;

  @Column({ name: 'criado_por', type: 'varchar', length: 255, nullable: true })
  criadoPor: string | null;

  @Column({ name: 'alterado_por', type: 'varchar', length: 255, nullable: true })
  alteradoPor: string | null;

  @Column({ type: 'date', nullable: true })
  data: string | null;

  @Column({ type: 'text', nullable: true })
  url: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  titulo: string | null;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  imagem: string | null;
}
