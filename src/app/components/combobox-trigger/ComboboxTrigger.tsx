import { Label } from "@/components/ui/label";
import { RiExpandUpDownLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

interface IProps {
	label: string;
	text: string;
	required?: boolean;
}

export function ComboboxTrigger({ label, text, required }: IProps) {
	return (
		<div>
			{!!label && (
				<Label>
					{label}
					{required && <span className="text-required-start">*</span>}
				</Label>
			)}
			<Button
				type="button"
				className="mt-4 bg-transparent border-1 border-white hover:bg-transparent font-normal px-6 flex gap-8 items-center"
			>
				<span>{text}</span>
				<span className="mt-2">
					<RiExpandUpDownLine size={14} />
				</span>
			</Button>
		</div>
	);
}
