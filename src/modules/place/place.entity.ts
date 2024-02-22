import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Address } from '../address/address.entity';
import { Session } from '../session/session.entity';
import { Tattoo } from '../tattoo/tattoo.entity';

@Entity()
export class Place extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @OneToOne(() => Address, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  address?: Address;

  @OneToMany(() => Session, (session) => session.place)
  @JoinColumn()
  sessions: Session[];

  @OneToMany(() => Tattoo, (tattoo) => tattoo.place)
  @JoinColumn()
  tattoos: Tattoo[];
}
