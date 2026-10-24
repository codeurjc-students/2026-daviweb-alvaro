import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type {
  HairLengthModifiers,
  HourRange,
  TimeSegment,
} from '../service.model.js';

@Schema({ _id: false })
class TimeSegmentDoc implements TimeSegment {
  @Prop({ required: true, min: 1 })
  duration: number;

  @Prop({ min: 0, default: 0 })
  breakAfter: number;
}
const TimeSegmentSchema = SchemaFactory.createForClass(TimeSegmentDoc);

@Schema({ _id: false })
class HairLengthModifierDoc {
  @Prop({ required: true, min: 0 })
  time: number;

  @Prop({ type: [TimeSegmentSchema], default: undefined })
  segments?: TimeSegment[];
}
const HairLengthModifierSchema = SchemaFactory.createForClass(
  HairLengthModifierDoc,
);

@Schema({ _id: false })
class HairLengthModifiersDoc implements HairLengthModifiers {
  @Prop({ type: HairLengthModifierSchema, required: true })
  short: HairLengthModifierDoc;

  @Prop({ type: HairLengthModifierSchema, required: true })
  medium: HairLengthModifierDoc;

  @Prop({ type: HairLengthModifierSchema, required: true })
  long: HairLengthModifierDoc;
}

@Schema({ _id: false })
class HourRangeDoc implements HourRange {
  @Prop({ required: true })
  start: string;

  @Prop({ required: true })
  end: string;
}

@Schema({ collection: 'services', timestamps: true })
export class ServiceDoc {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [TimeSegmentSchema], default: [] })
  timeSegments: TimeSegment[];

  @Prop({ default: false })
  requiresHairLength: boolean;

  @Prop({ type: SchemaFactory.createForClass(HairLengthModifiersDoc) })
  hairLengthModifiers?: HairLengthModifiers;

  @Prop()
  imageUrl?: string;

  @Prop({ type: SchemaFactory.createForClass(HourRangeDoc) })
  hourRange?: HourRange;
}

export type ServiceDocument = HydratedDocument<ServiceDoc>;

export const ServiceSchema = SchemaFactory.createForClass(ServiceDoc);

// Every query filters by tenant and lists by name: this index serves both without an in-memory sort.
ServiceSchema.index({ tenantId: 1, name: 1, _id: 1 });
