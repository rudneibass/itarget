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
	setDataContext: (data: []) => void,
	loading: boolean,
	setLoadingContext: (loading: boolean) => void,
	thereIsNoData: boolean,
	setThereIsNoDataContext: (thereIsNoData: boolean) => void,
}
