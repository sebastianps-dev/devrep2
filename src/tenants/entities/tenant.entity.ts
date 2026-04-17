import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('tenants')
export class Tenant extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  subdomain: string;

  @Column({ unique: true, nullable: true })
  customDomain: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ default: '#0f5c4b' })
  primaryColor: string;

  @Column({ nullable: true })
  secondaryColor: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  address: string;

  @Column('simple-json', { nullable: true })
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };

  @Column({ nullable: true })
  welcomeTitle: string;

  @Column({ type: 'text', nullable: true })
  welcomeSubtitle: string;
}
