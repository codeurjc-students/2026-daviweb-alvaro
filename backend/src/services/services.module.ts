import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceDoc, ServiceSchema } from './schemas/service.schema.js';
import { ServicesController } from './services.controller.js';
import { ServicesRepository } from './services.repository.js';
import { ServicesService } from './services.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceDoc.name, schema: ServiceSchema },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
