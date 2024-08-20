export type FormType = {
    id: string;
    name: string;
    code: string;
    attributes: object;
    fields: Array<{
      id: string;
      form_id: string;
      name: string;
      value?: string;
      rules?: string;
      attributes: object;
    }>;
  };
  
  export function isFormType(data: unknown): data is FormType {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return false;
    }
  
    const obj = data as {
      id?: unknown;
      name?: unknown;
      code?: unknown;
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
        name: field.name || '',
        value: field.value || '',
        rules: field.rules || '',
        attributes: field.attributes || {}
      }))
    };
  }