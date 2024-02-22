import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Media } from '../media/media.entity';
import { Place } from '../place/place.entity';

@Entity()
export class Tattoo extends BaseEntity {
  @Column({ default: new Date() })
  date: Date;

  @OneToMany(() => Media, (media) => media.tattoo)
  @JoinColumn()
  images: Media[];

  @Column({ default: true })
  isVisible: boolean;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Media, (media) => media.tattooAfter, {
    nullable: true,
  })
  @JoinColumn()
  afterImages?: Media[];

  @ManyToOne(() => Place, (place) => place.tattoos, {
    nullable: true,
  })
  @JoinColumn()
  place?: Place;
}
