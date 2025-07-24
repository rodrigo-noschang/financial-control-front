import { useState } from "react";
import { useQueryState } from "nuqs";
import { ptBR } from "date-fns/locale";
import { addHours, format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { CancelButton } from "../cancel-button/CancelButton";
import { GenericButton } from "../generic-button/GenericButton";

import {
	IDateRange,
	ISetDateRangeParam,
} from "@/app/props/calendar-range-input-props";

interface IProps {
	defaultFrom: string;
	defaultTo: string;
}

export function CalendarRangeInput({ defaultFrom, defaultTo }: IProps) {
	const [paramFrom, setParamFrom] = useQueryState("from", {
		defaultValue: defaultFrom,
	});
	const [paramTo, setParamTo] = useQueryState("to", {
		defaultValue: defaultTo,
	});

	const [date, setDate] = useState<IDateRange | undefined>({
		from: addHours(new Date(paramFrom!), 12),
		to: addHours(new Date(paramTo!), 12),
	});

	function handleSetDateRange(data: ISetDateRangeParam | undefined) {
		if (!data?.from || !data?.to) {
			setDate(undefined);
			return;
		}

		setDate({
			from: data.from,
			to: data.to,
		});
	}

	function triggerSummaryRefetch() {
		if (date?.from && date?.to) {
			setParamFrom(format(date.from, "yyyy-MM-dd"));
			setParamTo(format(date.to, "yyyy-MM-dd"));
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
