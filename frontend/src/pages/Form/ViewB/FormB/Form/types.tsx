import { ReactNode } from "react";

export interface FormContextextType {
  state: { form: FormType | undefined, isLoading: boolean, activeTab: string, showModalForm: boolean; recordId: string | undefined };
  setStateContext: ({ form, isLoading, activeTab, showModalForm, recordId } : { form?: FormType, isLoading?: boolean, activeTab?: string, showModalForm?: boolean; recordId?: string}) => void,
  saveFormContext: (inputs: FormInputsType) => void;
  getFormContext: (id?: string) => void;
  successAlert?: (message: string) => void;
  warningAlert?: (message: string) => void;
  errorAlert?: (message: string) => void;
  warningAlertWithHtmlContent?: (content: ReactNode) => void;
  closeFormTab: ({ tabId }: { tabId: string }) => void;
}

export type FormInputsType = {
  name?: string;
  email?: string;
  cpf?: string;
  event_id?: string;
};

export type FieldsType = {
  rules?: string;
  options?: Array<{ value: string, name: string }>;
  attributes: Record<string, string>;
};

export type FormType = {
  id: string;
  name: string;
  attributes: object;
  fields?: Array<FieldsType>;
};

export function isFormType(data: unknown): data is FormType {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return false;
  }

  const obj = data as {
    id?: unknown;
    name?: unknown;
    code?: unknown;
    dataSource?: unknown;
    attributes?: unknown;
    fields?: unknown;
  };

  if (
    typeof obj.id !== "string" ||
    typeof obj.name !== "string" ||
    typeof obj.code !== "string" ||
    typeof obj.attributes !== "object" ||
    !Array.isArray(obj.fields)
  ) {
    return false;
  }

  for (const field of obj.fields) {
    if (
      typeof field !== "object" ||
      field === null ||
      typeof field.id !== "string" ||
      typeof field.form_id !== "string" ||
      typeof field.attributes !== "object"
    ) {
      return false;
    }
  }

  return true;
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function convertToFormType(data: unknown): FormType {
  if (!isObject(data)) {
    console.log("Erro ao tentar converter dados para um objeto do tipo FormType: Dados recebidos dem ser um objeto par chave/valor.", data)
    throw new Error("Erro ao tentar converter dados para um objeto do tipo FormType: Dados recebidos dem ser um objeto par chave/valor.")
  }

  if (!("id" in data) || !("name" in data) || !("fields" in data)) {
    console.log('Erro ao tentar converter dados para um objeto do tipo FormType: "id", "name" ou "fields" ausentes nos dados recebidos.', data)
    throw new Error('Erro ao tentar converter dados para um objeto do tipo FormType: "id", "name" ou "fields" ausentes nos dados recebidos.')
  }

  if (!Array.isArray(data.fields)) {
    console.log('Erro ao tentar converter dados para um objeto do tipo FormType: "fields" deve ser um array.', data)
    throw new Error('Erro ao tentar converter dados para um objeto do tipo FormType: "fields" deve ser um array.')
  }

  const id = data.id as string;
  const name = data.name as string;
  const fields = Array.isArray(data.fields) ? data.fields : [];

  return {
    id: id,
    name: name,
    attributes: data.attributes || {},
    fields: fields.map((field) => ({
      id: field.id || "",
      form_id: field.form_id || "",
      name: field.name || "",
      value: field.value || "",
      rules: field.rules || "",
      options: field.options || [],
      dataSource: field.dataSource || "",
      attributes: field.attributes || {},
    })),
  };
}

// LIST INNER FORM TYPES

export type ListType = {
  id: number;
  name: string;
  order: string;
  attributes: string;
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
