import { MediaType } from '../../types';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Project } from '../project/project.entity';

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

  @ManyToOne(() => Project, (project) => project.images)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Project, (project) => project.healeds)
  @JoinColumn()
  healeds: Project;
}
