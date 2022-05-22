import { Subdao } from 'src/modules/subdao/entities/subdao.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Proposal {
  @PrimaryColumn()
  subProposalId?: string;

  @Column()
  mainProposalId?: string;

  @ManyToOne(() => Subdao, (subdao) => subdao.proposals)
  @JoinColumn({ name: 'subdaoId', referencedColumnName: 'id' })
  subdao?: Subdao;

  @Column()
  managerAddress: string;
}
