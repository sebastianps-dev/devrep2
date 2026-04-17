import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Property } from '../properties/entities/property.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Event } from '../agenda/entities/event.entity';
import { Note } from '../notes/entities/note.entity';
import { PropertyType, OperationType, PropertyStatus } from '../properties/enums/property.enums';
import { LeadSource, LeadStatus } from '../leads/enums/lead.enums';
import { EventType } from '../agenda/enums/event-type.enum';
import { NotePriority } from '../notes/enums/note-priority.enum';
import { Tenant } from '../tenants/entities/tenant.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async runSeed() {
    this.logger.log('Starting database seed...');

    try {
      // 0. Create Tenant (Inmobiliaria)
      const tenant = await this.seedTenants();

      // 1. Create Agents
      const agents = await this.seedUsers(tenant);
      
      // 2. Create Properties
      const properties = await this.seedProperties(agents, tenant);

      // 3. Create Leads
      const leads = await this.seedLeads(agents, properties);

      // 4. Create Events
      const events = await this.seedEvents(agents, leads, properties);

      // 5. Create Notes
      await this.seedNotes(agents, leads, properties, events);

      this.logger.log('Database seed completed successfully.');
      return { message: 'Seed completed successfully' };
    } catch (error) {
      this.logger.error(`Seed failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  private async seedTenants() {
    const tenantData = {
      name: 'MVCS Inmobiliaria',
      subdomain: 'localhost',
      logoUrl: 'https://cdn-icons-png.flaticon.com/512/1018/1018573.png',
      primaryColor: '#0f5c4b',
      welcomeTitle: 'Encuentra tu próximo hogar con la seguridad de un experto.',
      welcomeSubtitle: 'Agente inmobiliario debidamente registrado ante el Ministerio de Vivienda (MVCS) para su total tranquilidad legal y financiera.',
      contactEmail: 'info@mvcs-inmobiliaria.es',
      contactPhone: '+34 900 123 456',
      address: 'Calle Serrano 123, Salamanca, Madrid',
      socialLinks: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com'
      }
    };

    let tenant = await this.tenantRepository.findOne({ where: { subdomain: tenantData.subdomain } });
    if (!tenant) {
      tenant = this.tenantRepository.create(tenantData);
      tenant = await this.tenantRepository.save(tenant);
      this.logger.log(`Created tenant: ${tenantData.name}`);
    } else {
      this.logger.log(`Tenant already exists: ${tenantData.name}`);
    }
    return tenant;
  }

  private async seedUsers(tenant: Tenant) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const usersData = [
      {
        email: 'admin@ljpp.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'LJPP',
        role: 'Admin',
        tenantId: tenant.id,
      },
      {
        email: 'agente1@ljpp.com',
        password: hashedPassword,
        firstName: 'Juan',
        lastName: 'Pérez',
        role: 'Agente',
        tenantId: tenant.id,
      },
      {
        email: 'agente2@ljpp.com',
        password: hashedPassword,
        firstName: 'María',
        lastName: 'García',
        role: 'Agente',
        tenantId: tenant.id,
      },
    ];

    const users: User[] = [];
    for (const userData of usersData) {
      let user = await this.userRepository.findOne({ where: { email: userData.email } });
      if (!user) {
        user = this.userRepository.create(userData);
        user = await this.userRepository.save(user);
        this.logger.log(`Created user: ${userData.email}`);
      } else {
        this.logger.log(`User already exists: ${userData.email}`);
      }
      users.push(user);
    }
    return users;
  }

  private async seedProperties(agents: User[], tenant: Tenant) {
    const propertiesData = [
      {
        title: 'Apartamento Moderno en el Centro',
        type: PropertyType.DEPARTAMENTO,
        operation: OperationType.VENTA,
        price: 150000,
        zone: 'Centro',
        status: PropertyStatus.DISPONIBLE,
        agentId: agents[0]?.id,
        tenantId: tenant.id,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070',
      },
      {
        title: 'Casa Familiar con Jardín',
        type: PropertyType.CASA,
        operation: OperationType.VENTA,
        price: 250000,
        zone: 'Norte',
        status: PropertyStatus.DISPONIBLE,
        agentId: agents[1]?.id || agents[0]?.id,
        tenantId: tenant.id,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2070',
      },
      {
        title: 'Local Comercial Estratégico',
        type: PropertyType.LOCAL,
        operation: OperationType.ALQUILER,
        price: 0,
        rentPrice: 1200,
        zone: 'Sur',
        status: PropertyStatus.DISPONIBLE,
        agentId: agents[2]?.id || agents[0]?.id,
        tenantId: tenant.id,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069',
      },
      {
        title: 'Penthouse de Lujo',
        type: PropertyType.DEPARTAMENTO,
        operation: OperationType.VENTA,
        price: 450000,
        zone: 'Oeste',
        status: PropertyStatus.POR_LIBERARSE,
        agentId: agents[0]?.id,
        tenantId: tenant.id,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070',
      },
    ];

    const properties: Property[] = [];
    for (const propData of propertiesData) {
      if (!propData.agentId) continue;
      
      let property = await this.propertyRepository.findOne({ where: { title: propData.title } });
      if (!property) {
        property = this.propertyRepository.create(propData);
        property = await this.propertyRepository.save(property);
        this.logger.log(`Created property: ${propData.title}`);
      } else {
        this.logger.log(`Property already exists: ${propData.title}`);
      }
      properties.push(property);
    }
    return properties;
  }

  private async seedLeads(agents: User[], properties: Property[]) {
    const leadsData = [
      {
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        phone: '123456789',
        email: 'carlos@email.com',
        source: LeadSource.CONSULTA_WEB,
        status: LeadStatus.NUEVO,
        assignedAgentId: agents[1]?.id || agents[0]?.id,
        value: 150000,
        location: 'Madrid',
        properties: [properties[0]].filter(Boolean),
      },
      {
        firstName: 'Ana',
        lastName: 'Martínez',
        phone: '987654321',
        email: 'ana@email.com',
        source: LeadSource.REDES_SOCIALES,
        status: LeadStatus.CONTACTADO,
        assignedAgentId: agents[2]?.id || agents[0]?.id,
        value: 250000,
        location: 'Barcelona',
        properties: [properties[1]].filter(Boolean),
      },
      {
        firstName: 'Luis',
        lastName: 'Sánchez',
        phone: '456789123',
        email: 'luis@email.com',
        source: LeadSource.RECOMENDACION,
        status: LeadStatus.EN_SEGUIMIENTO,
        assignedAgentId: agents[0]?.id,
        value: 450000,
        location: 'Valencia',
        properties: [properties[3]].filter(Boolean),
      },
      {
        firstName: 'Elena',
        lastName: 'Gómez',
        phone: '321654987',
        email: 'elena@email.com',
        source: LeadSource.CONSULTA_WEB,
        status: LeadStatus.NEGOCIACION,
        assignedAgentId: agents[1]?.id || agents[0]?.id,
        value: 1200,
        location: 'Sevilla',
        properties: [properties[2]].filter(Boolean),
      },
    ];

    const leads: Lead[] = [];
    for (const leadData of leadsData) {
      if (!leadData.assignedAgentId) continue;

      let lead = await this.leadRepository.findOne({ where: { email: leadData.email } });
      if (!lead) {
        lead = this.leadRepository.create(leadData);
        lead = await this.leadRepository.save(lead);
        this.logger.log(`Created lead: ${leadData.email}`);
      } else {
        this.logger.log(`Lead already exists: ${leadData.email}`);
      }
      leads.push(lead);
    }
    return leads;
  }

  private async seedEvents(agents: User[], leads: Lead[], properties: Property[]) {
    const eventsData = [
      {
        title: 'Llamada Inicial Carlos',
        type: EventType.LLAMADA,
        startTime: new Date(),
        endTime: new Date(Date.now() + 3600000), // 1 hour later
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        phone: '123456789',
        email: 'carlos@email.com',
        owner: agents[1] || agents[0],
        lead: leads[0],
        properties: [properties[0]].filter(Boolean),
      },
      {
        title: 'Visita Casa Jardín',
        type: EventType.VISITA,
        startTime: new Date(Date.now() + 86400000), // Tomorrow
        endTime: new Date(Date.now() + 86400000 + 7200000), // 2 hours duration
        firstName: 'Ana',
        lastName: 'Martínez',
        owner: agents[2] || agents[0],
        lead: leads[1],
        properties: [properties[1]].filter(Boolean),
      },
    ];

    const events: Event[] = [];
    for (const eventData of eventsData) {
      let event = await this.eventRepository.findOne({ 
        where: { title: eventData.title, startTime: eventData.startTime } 
      });
      if (!event) {
        event = this.eventRepository.create(eventData);
        event = await this.eventRepository.save(event);
        this.logger.log(`Created event: ${eventData.title}`);
      } else {
        this.logger.log(`Event already exists: ${eventData.title}`);
      }
      events.push(event);
    }
    return events;
  }

  private async seedNotes(agents: User[], leads: Lead[], properties: Property[], events: Event[]) {
    const notesData = [
      {
        title: 'Interés en Hipoteca',
        content: 'El cliente Carlos está interesado en conocer opciones de hipoteca para el apartamento del centro.',
        priority: NotePriority.ALTA,
        color: 'bg-yellow-100',
        owner: agents[1] || agents[0],
        linkedLead: leads[0],
        linkedProperty: properties[0],
      },
      {
        title: 'Seguimiento Visita',
        content: 'Preparar folletos y planos de la casa con jardín para la visita de Ana.',
        priority: NotePriority.MEDIA,
        owner: agents[2] || agents[0],
        linkedEvent: events[1],
      },
    ];

    for (const noteData of notesData) {
      let note = await this.noteRepository.findOne({ 
        where: { title: noteData.title, owner: { id: noteData.owner.id } } 
      });
      if (!note) {
        note = this.noteRepository.create(noteData);
        await this.noteRepository.save(note);
        this.logger.log(`Created note: ${noteData.title}`);
      } else {
        this.logger.log(`Note already exists: ${noteData.title}`);
      }
    }
  }
}
