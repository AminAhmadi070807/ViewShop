import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';

@Module({
  controllers: [MenusController],
  providers: [MenusService],
  imports: [TypeOrmModule.forFeature([Menu])],
})
export class MenusModule {}
