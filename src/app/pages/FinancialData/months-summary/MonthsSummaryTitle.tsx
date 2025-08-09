import { ptBR } from "date-fns/locale";
import { format, getDate } from "date-fns";

interface IProps {
	startDate: Date;
	endDate: Date;
}

export function MonthsSummaryTitle({ startDate, endDate }: IProps) {
	const startMonthName = format(startDate, "LLLL", { locale: ptBR });
	const endMonthName = format(endDate, "LLLL", { locale: ptBR });

	const startDay = getDate(startDate);
	const endDay = getDate(endDate);

	const summaryRangeReference =
		startMonthName == endMonthName
			? `${startDay} a ${endDay} de ${startMonthName}`
			: `${startDay} de ${startMonthName} a ${endDay} de ${endMonthName}`;

	return (
		<div className="text-standard-size">
			Resumo de <span className="font-bold">{summaryRangeReference}</span>
		</div>
	);
}
