import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Place } from '../place/place.entity';

@Entity()
export class Session extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @ManyToOne(() => Place, (place) => place.sessions)
  @JoinColumn()
  place: Place;

  @Column({ default: new Date() })
  startDate: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: false })
  isArchived: boolean;
}
