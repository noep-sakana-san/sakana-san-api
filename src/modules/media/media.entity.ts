import { MediaType } from '../../types';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Tattoo } from '../tattoo/tattoo.entity';
import { Flash } from '../flash/flash.entity';

@Entity()
export class Media extends BaseEntity {
  @Column()
  url: string;

  @Column({ nullable: false, default: '' })
  localPath: string;

  @Column({ nullable: false, default: '' })
  filename: string;

  @Column()
  type: MediaType;

  @Column()
  size: number;

  @ManyToOne(() => Tattoo, (tattoo) => tattoo.images)
  @JoinColumn()
  tattoo: Tattoo;

  @ManyToOne(() => Tattoo, (tattoo) => tattoo.healeds)
  @JoinColumn()
  tattooAfter: Tattoo;

  @ManyToOne(() => Flash, (flash) => flash.images)
  @JoinColumn()
  flash: Tattoo;
}
