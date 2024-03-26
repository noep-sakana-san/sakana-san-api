import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Address } from '../address/address.entity';
import { Session } from '../session/session.entity';
import { Project } from '../project/project.entity';

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

  @OneToMany(() => Project, (project) => project.place, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  projects: Project[];
}
