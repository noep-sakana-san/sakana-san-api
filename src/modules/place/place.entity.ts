import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Address } from '../address/address.entity';

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
}
