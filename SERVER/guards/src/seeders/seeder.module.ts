import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from '../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
})
export class SeederModule {}
