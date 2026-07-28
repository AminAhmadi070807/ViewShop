import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Setting')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json', nullable: false })
  information: {
    full_title: string;
    title: string;
    description: string;
    service_hours: string;
    cell_phone: string;
    email: string;
  };

  @Column({ type: 'json', nullable: false })
  journal: {
    title: string;
    description: string;
  };

  @Column({ type: 'json', nullable: false })
  address: {
    full_address: string;
    province: string;
    city: string;
    zip_code: string;
    location: {
      Latitude: string;
      Longitude: string;
    };
  };

  @Column({ type: 'json', nullable: false })
  scripts: {
    enamad: string;
    organization: string;
    union: string;
  };

  @Column({ type: 'json', nullable: false })
  social_media: {
    instagram?: string;
    telegram?: string;
    twitter?: string;
    facebook?: string;
    whatsApp?: string;
    eitaa?: string;
    rubika?: string;
  };

  @Column({ type: 'json', nullable: false })
  links: {
    direct: string;
    bazaar?: string;
    myket?: string;
    sibApp?: string;
  };

  @Column({ type: 'json', nullable: false })
  support: {
    status: boolean;
    cell_phone: string;
    instagram?: string;
    whatsApp?: string;
    telegram?: string;
  };

  @Column({ type: 'json', nullable: false })
  repair: {
    status: boolean;
    title: string;
  };

  @Column({ type: 'json', nullable: false })
  logo: {
    logo: string;
    favicon: string;
    watermark: string;
    night_model: string;
  };
}
