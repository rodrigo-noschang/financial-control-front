interface IRequest {
  value: number;
}

export function formatCurrencyValue({ value }: IRequest) {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    currency: "BRL",
    style: 'currency',
  }).format(value);

  return formattedValue;
}