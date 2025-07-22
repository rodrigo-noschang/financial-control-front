import { formatCurrencyValue } from "@/app/utils/formatCurrencyValue";

interface IMonthsSummaryValuesProps {
	rest: number;
	essentials: number;
	total: number;
}

export function MonthsSummaryValues({
	essentials,
	rest,
	total,
}: IMonthsSummaryValuesProps) {
	const formattedEssentials = formatCurrencyValue({ value: essentials });
	const formattedRest = formatCurrencyValue({ value: rest });
	const formattedTotal = formatCurrencyValue({ value: total });

	return (
		<div className="flex items-center gap-16 mt-8">
			<div className="flex flex-col">
				<span className="text-essentials">Essenciais</span>
				<span className="font-bold"> {formattedEssentials} </span>
			</div>

			<div className="flex flex-col">
				<span className="text-rest">Restôio</span>
				<span className="font-bold"> {formattedRest} </span>
			</div>

			<div className="flex flex-col">
				<span>Total</span>
				<span className="font-bold"> {formattedTotal} </span>
			</div>
		</div>
	);
}
