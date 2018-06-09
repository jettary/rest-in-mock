import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'jsonb', default: '{}' })
  public model: object = {};

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
