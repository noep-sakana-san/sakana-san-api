import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Media } from '../media/media.entity';

@Entity()
export class Flash extends BaseEntity {
  @OneToMany(() => Media, (media) => media.flash)
  @JoinColumn()
  images: Media[];

  @Column({ default: true })
  isVisible: boolean;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: true })
  isFavorite: boolean;
}
