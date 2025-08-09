import { BsCalendar2Date } from "react-icons/bs";

import { GenericPopover } from "../../../components/generic-popover/GenericPopover";
import { CalendarRangeInput } from "../../../components/calendar-range-input/CalendarRangeInput";

interface IProps {
	defaultFrom: Date;
	defaultTo: Date;
	isLoading?: boolean;
}

export function MonthsSummaryDatePicker({
	defaultFrom,
	defaultTo,
	isLoading,
}: IProps) {
	return (
		<div>
			<GenericPopover
				trigger={
					<div className="py-2 px-3 rounded-md cursor-pointer hover:bg-page-bg active:transform-[scale(0.95)] transition-[0.3s]">
						<BsCalendar2Date size={18} className="text-standard-color" />
					</div>
				}
			>
				<CalendarRangeInput
					defaultFrom={defaultFrom}
					defaultTo={defaultTo}
					isLoading={isLoading}
				/>
			</GenericPopover>
		</div>
	);
}
