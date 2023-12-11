export function dateFormat(date: string) {
  const formatedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formatedDate;
}

export function stringToCurrency(string: string) {
  const float = parseFloat(string)

  const currency = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(float)

  return currency
}

export function dateTofrCAString(date: Date){
  const formatedDate = date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }); /* 2023-12-30 */

  return formatedDate.toString();
}

export function frCAStringDateToPtbr(date: Date){
  const formatedDate = date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }); /* 2023-12-30 */

  return formatedDate.toString();
}

export function decimalNumber(number: number){
  const decimal = new Intl.NumberFormat('pt-BR').format(number)  
  return decimal
}


export function currencyWithoutSymbol(number: number){
  const currencyFractionDigits = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).resolvedOptions().maximumFractionDigits;
  
  let value = (number).toLocaleString('pt-BR', {
    maximumFractionDigits: currencyFractionDigits 
  });
  
  value = value.search(',') == -1 ? value+',00': value
  value = value.slice(-2).includes(',') ? value+'0' : value

  return value
}

export function phoneMask(value: string){
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}


export function getUserLocalStorage(){
  const json = localStorage.getItem("u");

  if(!json){
      return null;
  }

  const user = JSON.parse(json)

  return user ?? null;
}


export function resolveApiUrl(){
  const user = getUserLocalStorage()
  let apiUrl = user.server

  const containHttp = user.server.search('http');
  apiUrl =  containHttp === -1 ? 'https://'+user.server : apiUrl

  const barOnFinal = user.server.substr(-1)
  apiUrl =  barOnFinal === '/' ? apiUrl.slice(0,-1) : apiUrl

  return apiUrl
}

export function isValidCPF(cpf: string): boolean {
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
}



export function isValidCNPJ(cnpj: string): boolean {
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

export function isValidEmail(email: string): boolean {

  const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
  return padraoEmail.test(email);
}
