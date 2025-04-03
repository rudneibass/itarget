export function dateFormatPtBr(date: string) {
    const formatedDate = new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  
    return formatedDate;
  }