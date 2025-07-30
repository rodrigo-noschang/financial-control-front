import { formatCurrencyValue } from "@/app/utils/formatCurrencyValue";
import { SkeletonLoad } from "../skeleton-load/SkeletonLoad";

interface IMonthsSummaryValuesProps {
	rest: number;
	essentials: number;
	total: number;
	isLoading: boolean;
}

export function MonthsSummaryValues({
	essentials,
	rest,
	total,
	isLoading,
}: IMonthsSummaryValuesProps) {
	const formattedEssentials = formatCurrencyValue({ value: essentials });
	const formattedRest = formatCurrencyValue({ value: rest });
	const formattedTotal = formatCurrencyValue({ value: total });

	return (
		<div className="flex items-center gap-16 mt-8">
			<div className="flex flex-col">
				<span className="text-summary-essentials">Essenciais</span>
				{isLoading ? (
					<SkeletonLoad width={75} />
				) : (
					<span className="font-bold min-w-[75px]">
						{" "}
						{formattedEssentials}{" "}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<span className="text-summary-rest">Restôio</span>
				{isLoading ? (
					<SkeletonLoad width={75} />
				) : (
					<span className="font-bold min-w-[75px]"> {formattedRest} </span>
				)}
			</div>

			<div className="flex flex-col">
				<span>Total</span>
				{isLoading ? (
					<SkeletonLoad width={75} />
				) : (
					<span className="font-bold min-w-[75px]"> {formattedTotal} </span>
				)}
			</div>
		</div>
	);
}
