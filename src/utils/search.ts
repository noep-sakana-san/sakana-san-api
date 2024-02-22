import { Raw } from 'typeorm';

export function searchByString(search?: string) {
  return search
    ? Raw((alias) => `LOWER(${alias}) Like '%${search.toLowerCase()}%'`)
    : undefined;
}
