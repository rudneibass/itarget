
/*
export type FormType = {
    id: string;
    name: string;
    code: string;
    attributes: object,
    fields: [{
        id: string;
        form_id: string;
        attributes: Record<string, string>;
    }];
}*/

export type FormType = {
    id: string;
    name: string;
    code: string;
    attributes: object;
    fields: Array<{
      id: string;
      form_id: string;
      attributes: object;
    }>;
  };
  
  export function isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  
  export function convertToFormType(data: unknown): FormType {
    if (!isObject(data) || !('id' in data)) {
      throw new Error("Erro ao tentar converter o retorno de executeRequest() para um objeto do tipo FormType.");
    }
  
    const id = data.id as string;
    const name = data.name as string;
    const code = data.code as string;
    const fields = Array.isArray(data.fields) ? data.fields : [];
  
    return {
      id: id,
      name: name,
      code: code,
      attributes: data.attributes || {},
      fields: fields.map((field) => ({
        id: field.id || '',
        form_id: field.form_id || '',
        attributes: field.attributes || {}
      }))
    };
  }
