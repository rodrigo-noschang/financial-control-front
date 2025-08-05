import { cn } from "@/app/utils/cn";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface IProps extends React.ComponentProps<"textarea"> {
	label?: string;
	labelClassName?: string;
}

export function GenericTextArea({ label, ...rest }: IProps) {
	return (
		<div>
			{!!label && (
				<Label htmlFor={rest.id ?? rest.placeholder}>
					{label}
					{rest.required && <span className="text-required-start">*</span>}
				</Label>
			)}
			<Textarea
				{...rest}
				id={rest.id ?? rest.placeholder}
				rows={3}
				className={cn("mt-4 px-4 py-2 h-[110px] resize-none", rest.className)}
			/>
		</div>
	);
}
