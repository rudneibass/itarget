export interface ListContextType  {
  state: { data: ListType[] | undefined, paginationLinks: Array<PaginatedListLinksType>, isLoading: boolean }
  setStateContext: ({data, paginationLinks, isLoading }: {data: [], paginationLinks: Array<PaginatedListLinksType>,  isLoading?: boolean}) => void
  renderFormTab: ({ title, eventKey, content }: { eventKey: string, title: string, content: JSX.Element }) => void
  handleSearchContext: (searchParams?: object) => void
  handleDeleteContext: (itemId: string) => void
  handleActiveContext: (itemId: string) => void
  handleSortContext: (sortBy: string, sortDirection: string) => void
}

export type ListType = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  event_id: number;
}

export type PaginatedListLinksType = {
  url: string | null;
  label: string;
  active: boolean;
}

export type PaginatedListType = {
  current_page: number;
  data: [];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginatedListLinksType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export function isListType(data: unknown): data is ListType[] {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every(item =>
    typeof item === 'object' &&
        item !== null &&
        'id' in item && typeof item.id === 'number' &&
        'name' in item && typeof item.name === 'string' &&
        'email' in item && typeof item.email === 'string' &&
        'cpf' in item && typeof item.cpf === 'string' &&
        'event_id' in item && typeof item.event_id === 'number'
  )
}

export function isPaginatedListType(data: unknown): data is PaginatedListType {
  if (typeof data !== 'object' || data === null) {
      return false;
  }
  const paginationObj = data as PaginatedListType;

  return (
      typeof paginationObj.current_page === 'number' &&
      Array.isArray(paginationObj.data) &&
      typeof paginationObj.first_page_url === 'string' &&
      typeof paginationObj.from === 'number' &&
      typeof paginationObj.last_page === 'number' &&
      typeof paginationObj.last_page_url === 'string' &&
      Array.isArray(paginationObj.links) &&
      paginationObj.links.every(link => 
          typeof link === 'object' &&
          (typeof link.url === 'string' || link.url === null) &&
          typeof link.label === 'string' &&
          typeof link.active === 'boolean'
      ) &&
      (typeof paginationObj.next_page_url === 'string' || paginationObj.next_page_url === null) &&
      typeof paginationObj.path === 'string' &&
      typeof paginationObj.per_page === 'number' &&
      (typeof paginationObj.prev_page_url === 'string' || paginationObj.prev_page_url === null) &&
      typeof paginationObj.to === 'number' &&
      typeof paginationObj.total === 'number'
  );
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
