import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  street: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  zipCode: string;

  @Column({ default: '' })
  country: string;
}
