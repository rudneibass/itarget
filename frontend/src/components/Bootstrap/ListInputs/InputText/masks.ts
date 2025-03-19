  export const masks: { [key: string]: (value: string) => string } = {
    'cpf': (value: string) => { 1
        return value
        .replace(/\D/g, '') // Remove all non-digit characters
        .replace(/(\d{3})(\d)/, '$1.$2') // Add a dot after the first three digits
        .replace(/(\d{3})(\d)/, '$1.$2') // Add a dot after the next three digits
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Add a hyphen before the last two digits
     },
     'cpfRemove': (value: string): string => {
      return value.replace(/\D/g, ''); // Remove todos os caracteres que não sejam dígitos
    },
    'phone': (value: string) => { 
      return value
      .replace(/\D/g, '') // Remove all non-digit characters
      .replace(/(\d{2})(\d)/, '($1)$2') // Add parentheses around the first two digits
      .replace(/(\d{1})(\d{4})(\d{4})/, '$1.$2-$3'); // Format the remaining digits
     },
  };  