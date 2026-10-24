import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceDoc, ServiceSchema } from './schemas/service.schema.js';
import { ServicesRepository } from './services.repository.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceDoc.name, schema: ServiceSchema },
    ]),
  ],
  providers: [ServicesRepository],
})
export class ServicesModule {}
