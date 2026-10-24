export type HairLength = 'short' | 'medium' | 'long';

export interface TimeSegment {
  duration: number;
  breakAfter?: number;
}

export interface HairLengthModifier {
  time: number;
  segments?: TimeSegment[];
}

export type HairLengthModifiers = Record<HairLength, HairLengthModifier>;

export interface HourRange {
  start: string;
  end: string;
}

// Mirrors the ServiceDTO of the frontend domain, so its HTTP adapter maps it directly.
export interface ServiceData {
  name: string;
  description: string;
  timeSegments: TimeSegment[];
  requiresHairLength: boolean;
  hairLengthModifiers?: HairLengthModifiers;
  imageUrl?: string;
  hourRange?: HourRange;
}

export interface Service extends ServiceData {
  id: string;
}
