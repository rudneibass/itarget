import { ReactNode } from "react";

export interface FormContextextType {
  state: { form: FormType | undefined, isLoading: boolean, activeTab: string};
  setStateContext: ({ form, isLoading, activeTab } : { form?: FormType, isLoading?: boolean, activeTab?: string }) => void,
  saveFormContext: (inputs: FormInputsType) => void;
  closeFormTab: ({ tabId }: { tabId: string }) => void;
  successAlert?: (message: string) => void;
  warningAlert?: (message: string) => void;
  errorAlert?: (message: string) => void;
  warningAlertWithHtmlContent?: (content: ReactNode) => void;
}

export type FormInputsType = {
  name?: string;
  email?: string;
  cpf?: string;
  event_id?: string;
};

export type FieldsType = {
  rules?: string;
  options?: Array<{ optionValue: string, optionText: string }>;
  attributes: Record<string, string>;
};

export type FormType = {
  id: string;
  name: string;
  attributes: object;
  fields?: Array<FieldsType>;
};

export type OptionsType = {
  optionValue: string, 
  optionText: string
}

export function isOptionsType(data: unknown): data is FormType {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return false;
  }

  const obj = data as {
    optionValue?: unknown;
    optionText?: unknown;
  };

  if (
    typeof obj.optionValue !== "string" || 
    typeof obj.optionValue !== "string" ) {
    return false;
  }

  return true;
}

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

    if(field.options && !isOptionsType(field.options)){
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
      options: field.options ? field.options.map((option: Record<string, string>) => ({
        optionValue: option.id,
        optionText: option.name
      })) : [],
      dataSource: field.dataSource || "",
      attributes: field.attributes || {},
    })),
  };
}