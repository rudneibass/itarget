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