import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubDao {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  domain?: string;

  @Column()
  managerAddress: string;

  @Column()
  mainTokenAddress: string;

  @Column()
  subTokenAddress: string;
}