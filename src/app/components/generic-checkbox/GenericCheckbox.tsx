import { cn } from "@/app/utils/cn";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface IProps {
	id: string;
	label: string;
	customClassName?: string;
	checked: boolean;
	formOnChange: (value: boolean) => void;
}

export function GenericCheckbox({
	id,
	label,
	checked,
	customClassName = "",
	formOnChange,
}: IProps) {
	return (
		<div className="flex items-center gap-4">
			<Checkbox
				id={id}
				checked={checked}
				onCheckedChange={formOnChange}
				className={cn("size-8", customClassName)}
			/>
			<Label htmlFor={id}> {label} </Label>
		</div>
	);
}
