export class PaginatedResultDto<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function paginate<T>(data: T[], totalCount: number, page: number, size: number): PaginatedResultDto<T> {
  const totalPages = Math.max(1, Math.ceil(totalCount / size));
  return {
    data,
    totalCount,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}
