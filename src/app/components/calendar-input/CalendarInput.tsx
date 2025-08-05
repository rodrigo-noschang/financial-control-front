import { ptBR } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";

interface IProps {
	defaultDate?: Date;
	formOnChange: (value: Date) => void;
}

export function CalendarInput({
	defaultDate = new Date(),
	formOnChange,
}: IProps) {
	return (
		<div>
			<Calendar
				mode="single"
				locale={ptBR}
				selected={defaultDate}
				onSelect={formOnChange}
				required
				classNames={{
					day_button: "hover:bg-box-bg hover:text-white",
				}}
			/>
		</div>
	);
}
