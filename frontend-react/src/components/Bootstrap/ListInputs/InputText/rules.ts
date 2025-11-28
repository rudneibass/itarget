export const rules: { [key: string]: (value: string) => boolean }  = {
    
  'required': (value: string): boolean => {         
        return value ? true : false;
    },

    'email': (email: string): boolean => {
        const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;         
        return padraoEmail.test(email);
    },

    'cpf': (cpf: string): boolean => {
        if (typeof cpf !== 'string') return false
        cpf = cpf.replace(/[\s.-]*/gim, '')
        if (
          !cpf ||
          cpf.length != 11 ||
          cpf == '00000000000' ||
          cpf == '11111111111' ||
          cpf == '22222222222' ||
          cpf == '33333333333' ||
          cpf == '44444444444' ||
          cpf == '55555555555' ||
          cpf == '66666666666' ||
          cpf == '77777777777' ||
          cpf == '88888888888' ||
          cpf == '99999999999'
        ) {
          return false
        }
        let soma = 0
        let resto
        for (let i = 1; i <= 9; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if (resto == 10 || resto == 11) resto = 0
        if (resto != parseInt(cpf.substring(9, 10))) return false
        soma = 0
        for (let i = 1; i <= 10; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if (resto == 10 || resto == 11) resto = 0
        if (resto != parseInt(cpf.substring(10, 11))) return false
        return true
      },
    
      'cnpj': (cnpj: string): boolean => {
        if (!cnpj) return false
      
        cnpj = cnpj.replace(/[^\d]/g, '')
      
        if (cnpj.length !== 14) return false
      
        if (/^(\d)\1{13}$/.test(cnpj)) return false
      
        let size = cnpj.length - 2
        let numbers = cnpj.substring(0, size)
        const digits = cnpj.substring(size)
        let sum = 0
        let pos = size - 7
      
        for (let i = size; i >= 1; i--) {
          sum += parseInt(numbers.charAt(size - i)) * pos--
          if (pos < 2) pos = 9
        }
      
        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
      
        if (result !== parseInt(digits.charAt(0))) return false
      
        size = size + 1
        numbers = cnpj.substring(0, size)
        sum = 0
        pos = size - 7
      
        for (let i = size; i >= 1; i--) {
          sum += parseInt(numbers.charAt(size - i)) * pos--
          if (pos < 2) pos = 9
        }
      
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
      
        return result === parseInt(digits.charAt(1))
      }
}