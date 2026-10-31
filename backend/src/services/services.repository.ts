import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PageRequest } from '../common/pagination/page.js';
import { ServiceDoc, ServiceDocument } from './schemas/service.schema.js';
import { Service, ServiceData } from './service.model.js';

// Only layer that knows about Mongoose: it receives and returns plain domain objects.
@Injectable()
export class ServicesRepository {
  constructor(
    @InjectModel(ServiceDoc.name) private readonly model: Model<ServiceDoc>,
  ) {}

  async findPage(
    tenantId: string,
    { page, size }: PageRequest,
  ): Promise<[Service[], number]> {
    const [docs, total] = await Promise.all([
      this.model
        .find({ tenantId })
        .sort({ name: 1, _id: 1 })
        .skip(page * size)
        .limit(size)
        .exec(),
      this.model.countDocuments({ tenantId }).exec(),
    ]);
    return [docs.map(toService), total];
  }

  async findById(tenantId: string, id: string): Promise<Service | null> {
    if (!isValidObjectId(id)) {
      return null;
    }
    const doc = await this.model.findOne({ _id: id, tenantId }).exec();
    return doc ? toService(doc) : null;
  }

  async create(tenantId: string, data: ServiceData): Promise<Service> {
    const doc = await this.model.create({ ...data, tenantId });
    return toService(doc);
  }
}

function toService(doc: ServiceDocument): Service {
  const {
    name,
    description,
    timeSegments,
    requiresHairLength,
    hairLengthModifiers,
    imageUrl,
    hourRange,
  } = doc.toObject();
  return {
    id: doc.id,
    name,
    description,
    timeSegments,
    requiresHairLength,
    ...(hairLengthModifiers && { hairLengthModifiers }),
    ...(imageUrl && { imageUrl }),
    ...(hourRange && { hourRange }),
  };
}
