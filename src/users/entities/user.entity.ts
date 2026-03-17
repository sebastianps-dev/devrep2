import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Property } from '../../properties/entities/property.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Por seguridad, no devolvemos el password por defecto
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: 'Agente' })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Property, (property) => property.agent)
  properties: Property[];
}
