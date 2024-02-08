import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Place } from '../place/place.entity';

@Entity()
export class Session extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @OneToOne(() => Place, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  place: Place;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
