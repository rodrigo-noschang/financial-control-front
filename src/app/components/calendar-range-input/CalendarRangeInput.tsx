import { useState } from "react";
import { parseAsIsoDate, useQueryStates } from "nuqs";
import { ptBR } from "date-fns/locale";
// import { addHours, format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { CancelButton } from "../cancel-button/CancelButton";
import { GenericButton } from "../generic-button/GenericButton";

import {
	IDateRange,
	ISetDateRangeParam,
} from "@/app/props/calendar-range-input-props";
import { addHours } from "date-fns";

interface IProps {
	defaultFrom: Date;
	defaultTo: Date;
	isLoading?: boolean;
}

export function CalendarRangeInput({ defaultFrom, defaultTo }: IProps) {
	const [paramRange, setParamRange] = useQueryStates(
		{
			from: parseAsIsoDate.withDefault(defaultFrom),
			to: parseAsIsoDate.withDefault(defaultTo),
		},
		{
			history: "push",
		}
	);

	// const [date, setDate] = useState<IDateRange | undefined>({
	// 	from: addHours(new Date(paramFrom!), 12),
	// 	to: addHours(new Date(paramTo!), 12),
	// });

	const [date, setDate] = useState<IDateRange | undefined>({
		from: addHours(paramRange.from, 12),
		to: addHours(paramRange.to, 12),
	});

	function handleSetDateRange(data: ISetDateRangeParam | undefined) {
		if (!data?.from || !data?.to) {
			setDate(undefined);
			return;
		}

		const from = data.from ?? date?.from;
		const to = data.to ?? date?.to;

		setDate({ from, to });
	}

	function triggerSummaryRefetch() {
		console.log("🚀 ~ triggerSummaryRefetch ~ date:", date);
		if (date?.from && date?.to) {
			setParamRange(
				{
					from: date.from,
					to: date.to,
				},
				{
					history: "replace",
				}
			);
		}
	}

	return (
		<div>
			<Calendar
				mode="range"
				locale={ptBR}
				selected={date}
				onSelect={handleSetDateRange}
				classNames={{
					range_start: "bg-box-bg text-white",
					range_end: "bg-box-bg text-white",
					range_middle: "bg-standard-color",
					day_button: "hover:bg-box-bg hover:text-white",
				}}
			/>

			<div className="mt-6 flex justify-between items-center">
				<CancelButton />

				<GenericButton text="Pesquisar" onClick={triggerSummaryRefetch} />
			</div>
		</div>
	);
}
