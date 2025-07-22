import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IProps {
	date: Date;
	reference: "current" | "previous";
}

export function MonthsSummaryTitle({ date, reference }: IProps) {
	const monthName = format(date, "LLLL", { locale: ptBR });
	const referenceText = reference === "current" ? "Este mês" : "Mês anterior";

	return (
		<div className="text-standard-size font-bold">
			{" "}
			{referenceText} ({monthName}){" "}
		</div>
	);
}
