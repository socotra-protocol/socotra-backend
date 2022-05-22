import { Subdao } from 'src/modules/subdao/entities/subdao.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['mainProposalId', 'subProposalId', 'managerAddress'])
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  subProposalId?: string;

  @Column()
  mainProposalId?: string;

  @Column()
  managerAddress: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  target?: string;
}
