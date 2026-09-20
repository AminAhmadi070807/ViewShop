import { Injectable } from '@nestjs/common';
import { SettingDto } from './dto/setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async setting(data: SettingDto) {
    try {
      await this.settingRepository.save({
        id: '16e40641-69bb-4932-8509-f14e0c5edb1b',
        ...data,
      });

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async find() {
    try {
      const result = await this.settingRepository.find();

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result[0],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async empty() {
    try {
      await this.settingRepository.update(
        '16e40641-69bb-4932-8509-f14e0c5edb1b',
        {
          social_media: {
            eitaa: '',
            facebook: '',
            instagram: '',
            rubika: '',
            telegram: '',
            twitter: '',
            whatsApp: '',
          },
          address: {
            full_address: '',
            city: '',
            location: { Latitude: '', Longitude: '' },
            province: '',
            zip_code: '',
          },
          information: {
            title: '',
            cell_phone: '',
            full_title: '',
            service_hours: '',
            description: '',
            email: '',
          },
          journal: { description: '', title: '' },
          links: { bazaar: '', direct: '', myket: '', sibApp: '' },
          logo: { logo: '', favicon: '', night_model: '', watermark: '' },
          repair: { status: false, title: '' },
          scripts: { enamad: '', organization: '', union: '' },
          support: {
            cell_phone: '',
            instagram: '',
            telegram: '',
            whatsApp: '',
            status: false,
          },
        },
      );

      return { status: 204, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
