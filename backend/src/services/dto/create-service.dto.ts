import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
import type {
  HairLengthModifier,
  HairLengthModifiers,
  HourRange,
  ServiceData,
  TimeSegment,
} from '../service.model.js';

const HH_MM = /^([01]\d|2[0-3]):[0-5]\d$/;

// Nested objects need @Type to become DTO instances; as plain objects their fields have no rules,
// so the whitelist rejects every one of them, even in a valid request.

class TimeSegmentDto implements TimeSegment {
  @IsInt()
  @Min(1)
  duration: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  breakAfter?: number;
}

class HairLengthModifierDto implements HairLengthModifier {
  @IsInt()
  @Min(0)
  time: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSegmentDto)
  segments?: TimeSegmentDto[];
}

class HairLengthModifiersDto implements HairLengthModifiers {
  @ValidateNested()
  @Type(() => HairLengthModifierDto)
  short: HairLengthModifierDto;

  @ValidateNested()
  @Type(() => HairLengthModifierDto)
  medium: HairLengthModifierDto;

  @ValidateNested()
  @Type(() => HairLengthModifierDto)
  long: HairLengthModifierDto;
}

class HourRangeDto implements HourRange {
  @Matches(HH_MM)
  start: string;

  @Matches(HH_MM)
  end: string;
}

export class CreateServiceDto implements ServiceData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSegmentDto)
  timeSegments: TimeSegmentDto[];

  @IsBoolean()
  requiresHairLength: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => HairLengthModifiersDto)
  hairLengthModifiers?: HairLengthModifiersDto;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HourRangeDto)
  hourRange?: HourRangeDto;
}
