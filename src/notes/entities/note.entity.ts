import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';
import { Lead } from '../../leads/entities/lead.entity';
import { Event } from '../../agenda/entities/event.entity';
import { NotePriority } from '../enums/note-priority.enum';

@Entity('notes')
export class Note extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: NotePriority,
    default: NotePriority.MEDIA,
  })
  priority: NotePriority;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @ManyToOne(() => Property, { nullable: true, onDelete: 'SET NULL' })
  linkedProperty: Property;

  @ManyToOne(() => Lead, { nullable: true, onDelete: 'SET NULL' })
  linkedLead: Lead;

  @ManyToOne(() => Event, { nullable: true, onDelete: 'SET NULL' })
  linkedEvent: Event;
}
