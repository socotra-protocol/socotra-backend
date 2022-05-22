import { Payout } from 'src/modules/payout/entities/payout.entity';
import { Subdao } from 'src/modules/subdao/entities/subdao.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['memberAddress', 'subdaoId'])
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  memberAddress: string;

  @Column()
  subdaoId: string;

  @ManyToOne(() => Subdao, (subdao) => subdao.members)
  @JoinColumn({ name: 'subdaoId', referencedColumnName: 'id' })
  subdao?: Subdao;

  @OneToMany(() => Payout, (payout) => payout.member, {
    cascade: true,
    nullable: true,
  })
  payouts?: Payout[];
}
