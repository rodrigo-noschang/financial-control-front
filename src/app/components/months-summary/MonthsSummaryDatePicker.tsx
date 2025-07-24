import { BsCalendar2Date } from "react-icons/bs";
import { GenericPopover } from "../geneiric-popover/GenericPopover";
import { CalendarRangeInput } from "../calendar-range-input/CalendarRangeInput";

interface IProps {
	defaultFrom: string;
	defaultTo: string;
}

export function MonthsSummaryDatePicker({ defaultFrom, defaultTo }: IProps) {
	return (
		<div>
			<GenericPopover
				trigger={<BsCalendar2Date size={18} className="text-standard-color" />}
			>
				<CalendarRangeInput defaultFrom={defaultFrom} defaultTo={defaultTo} />
			</GenericPopover>
		</div>
	);
}
