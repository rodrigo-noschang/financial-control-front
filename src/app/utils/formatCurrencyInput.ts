interface IRequest {
	value?: string;
}

export function formatCurrencyInput({ value }: IRequest): string | undefined {
	if (!value) return undefined;

	const numericOnly = value.replace(/\D/g, "");
	if (numericOnly === "") return undefined;

	const normalized = numericOnly.length > 0 ? Number(numericOnly) / 100 : 0;

	const formattedValue = new Intl.NumberFormat("pt-BR", {
		currency: "BRL",
		style: "currency",
	}).format(normalized);

	return formattedValue;
}
