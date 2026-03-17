import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { PropertyType, OperationType, PropertyStatus } from '../enums/property.enums';

@Entity('properties')
export class Property extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  type: PropertyType;

  @Column({
    type: 'enum',
    enum: OperationType,
  })
  operation: OperationType;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  rentPrice: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  rentCurrency: string;

  @Column()
  zone: string;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: PropertyStatus.BORRADOR,
  })
  status: PropertyStatus;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  coordinates: string;

  @Column({ nullable: true })
  reference: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalArea: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  builtArea: number;

  @Column({ type: 'int', nullable: true })
  bedrooms: number;

  @Column({ type: 'int', nullable: true })
  bathrooms: number;

  @Column({ type: 'int', nullable: true })
  parkingSpaces: number;

  @Column('simple-json', { nullable: true })
  amenities: string[];

  @Column({ nullable: true })
  contactName: string;

  @Column({ nullable: true })
  contactLastName: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ type: 'text', nullable: true })
  internalNotes: string;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'agentId' })
  agent: User;

  @Column()
  agentId: string;
}
