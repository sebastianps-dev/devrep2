import { Entity, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';
import { LeadSource, LeadStatus } from '../enums/lead.enums';

@Entity('leads')
export class Lead extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: LeadSource,
  })
  source: LeadSource;

  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NUEVO,
  })
  status: LeadStatus;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  value: number;

  @Column({ default: false })
  isHot: boolean;

  @Column({ default: false })
  isLate: boolean;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  noAptoReason: string;

  @Column({ type: 'text', nullable: true })
  noAptoDescription: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedAgentId' })
  assignedAgent: User;

  @Column()
  assignedAgentId: string;

  @ManyToMany(() => Property)
  @JoinTable({
    name: 'lead_properties',
    joinColumn: { name: 'leadId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'propertyId', referencedColumnName: 'id' },
  })
  properties: Property[];
}
