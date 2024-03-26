import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Media } from '../media/media.entity';
import { Place } from '../place/place.entity';
import { ProjectType } from '../../types';

@Entity()
export class Project extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ProjectType,
    default: ProjectType.TATTOO,
  })
  type: ProjectType;

  @Column({ default: new Date() })
  date: Date;

  @OneToMany(() => Media, (media) => media.project)
  @JoinColumn()
  images: Media[];

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: true })
  isFavorite: boolean;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Media, (media) => media.healeds, {
    nullable: true,
  })
  @JoinColumn()
  healeds?: Media[];

  @ManyToOne(() => Place, (place) => place.projects, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  place?: Place;
}
