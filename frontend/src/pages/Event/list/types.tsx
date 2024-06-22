import { LaravelPaginationLinksType } from "@services/backendApi/baseApi/types";

  export type EventType = {
    id: number;
	name: string;
	start_date: string,
	end_date: string,
	status: string
  }

  export type EventStoreUpdateType = {
	name: string;
	start_date: string,
	end_date: string,
	status: string
  }

  export interface EventListContextextType  {
	data: EventType[] | undefined,
	setDataContext: ({ data, cache }: {data: [], cache?: boolean}) => void,
	loading: boolean,
	setLoadingContext: ({loading}:{loading: boolean}) => void,
	thereIsNoData: boolean,
	setThereIsNoDataContext: ({thereIsNoData}:{thereIsNoData: boolean}) => void,
	paginationLinks: LaravelPaginationLinksType[] | undefined,
  setPaginationLinksContext: ({ paginationLinks }:{paginationLinks: LaravelPaginationLinksType[]}) => void
}
