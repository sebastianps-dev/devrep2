import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Lead } from '../../leads/entities/lead.entity';
import { Property } from '../../properties/entities/property.entity';
import { EventType } from '../enums/event-type.enum';

@Entity('events')
export class Event extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.OTRO,
  })
  type: EventType;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({ nullable: true })
  description: string;

  // Campos de contacto (para cuando no hay lead o para respaldo)
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @ManyToOne(() => Lead, (lead) => lead.id, { nullable: true })
  lead: Lead;

  @ManyToMany(() => Property)
  @JoinTable({
    name: 'event_properties',
    joinColumn: { name: 'eventId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'propertyId', referencedColumnName: 'id' },
  })
  properties: Property[];
}
