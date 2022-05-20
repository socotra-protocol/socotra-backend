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
export class Proposal {
  @Column()
  proposalId?: string;

  @Column()
  mainProposalId?: string;

  @Column()
  name: string;

  @Column()
  ipfsHash: string;

  @Column({ nullable: true })
  description?: string;

  @Column('json', { default: [] })
  choices: string[];

  @Column('json', { default: [] })
  scores: string[];

  @Column()
  state: string; // must change to ENUM

  @Column()
  tool: string; // must change to ENUM

  @Column()
  start: number;

  @Column()
  end: number;

  @Column()
  snapshot: string;

  @Column({ nullable: true })
  proposer?: string;
}
