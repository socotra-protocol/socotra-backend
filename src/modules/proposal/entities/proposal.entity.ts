import { Subdao } from 'src/modules/subdao/entities/subdao.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Proposal {
  @Column()
  subProposalId?: string;

  @Column()
  mainProposalId?: string;

  @PrimaryColumn()
  managerAddress: string;
}
