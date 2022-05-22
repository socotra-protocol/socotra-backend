import { Member } from 'src/modules/member/entities/member.entity';
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
@Unique('id', ['payoutId', 'subdaoId', 'memberAddress'])
export class Payout {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  payoutId: string;

  @Column()
  memberAddress: string;

  @Column()
  subdaoId: string;

  @Column()
  isPaid: string;

  @ManyToOne(() => Subdao, (subdao) => subdao.members)
  @JoinColumn({ name: 'subdaoId', referencedColumnName: 'id' })
  subdao?: Subdao;

  @Column()
  memberId: string;

  @ManyToOne(() => Member, (member) => member.payouts)
  @JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
  member?: Member;
}
