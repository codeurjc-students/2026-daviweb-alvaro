export interface PageRequest {
  page: number;
  size: number;
}

export interface Page<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
  hasMore: boolean;
}

export function buildPage<T>(
  items: T[],
  total: number,
  { page, size }: PageRequest,
): Page<T> {
  return { items, page, size, total, hasMore: (page + 1) * size < total };
}
