import { Member } from 'src/modules/member/entities/member.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('id', ['managerAddress'])
export class Subdao {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  managerAddress: string;

  @Column()
  mainTokenAddress: string;

  @Column()
  subTokenAddress: string;

  @Column({ nullable: true })
  domain?: string;

  @Column({ nullable: true })
  voteProxyAddress?: string;

  @OneToMany(() => Member, (member) => member.subdao, {
    cascade: true,
    nullable: true,
  })
  members?: Member[];
}
