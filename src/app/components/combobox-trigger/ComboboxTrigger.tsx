import { PuffLoader } from "react-spinners";
import { RiExpandUpDownLine } from "react-icons/ri";

import { cn } from "@/app/utils/cn";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface IProps {
	text: string;
	label: string;
	required?: boolean;
	errorMessage?: string;
	isLoadingOptions?: boolean;
}

export function ComboboxTrigger({
	label,
	text,
	required,
	errorMessage,
	isLoadingOptions,
}: IProps) {
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
				disabled={isLoadingOptions}
				className={cn(
					"mt-4 bg-transparent border-1 hover:bg-transparent font-normal px-6 flex items-center w-[200px] justify-between",
					!!errorMessage ? "border-red-600" : "border-white"
				)}
			>
				<span>{text}</span>
				<span className="mt-2">
					{isLoadingOptions ? (
						<PuffLoader size={18} color="#d1d1d1" />
					) : (
						<RiExpandUpDownLine size={14} />
					)}
				</span>
			</Button>
		</div>
	);
}
