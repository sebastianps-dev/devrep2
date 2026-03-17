import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';
import { Lead } from '../../leads/entities/lead.entity';

export enum ClosureOperationType {
  VENTA = 'Venta',
  ALQUILER = 'Alquiler',
}

@Entity('closures')
export class Closure extends BaseEntity {
  @Column()
  clientName: string;

  @Column({ nullable: true })
  contactInfo: string;

  @Column()
  propertyTitle: string;

  @Column()
  closureDate: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalValue: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  commission: number;

  @Column({
    type: 'enum',
    enum: ClosureOperationType,
    default: ClosureOperationType.VENTA,
  })
  operationType: ClosureOperationType;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @ManyToOne(() => Property, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @ManyToOne(() => Lead, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'leadId' })
  lead: Lead;
}
