import { cn } from "@/app/utils/cn";
import { formatCurrencyInput } from "@/app/utils/formatCurrencyInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface IProps extends React.ComponentProps<"input"> {
	label?: string;
	labelClassName?: string;
}

export function CurrencyInput({ label, ...rest }: IProps) {
	const formattedValue = rest.value
		? formatCurrencyInput({ value: rest.value.toString() })
		: undefined;

	return (
		<div>
			{!!label && (
				<Label htmlFor={rest.id ?? rest.placeholder}>
					{label}
					{rest.required && <span className="text-required-start">*</span>}
				</Label>
			)}
			<Input
				{...rest}
				value={formattedValue}
				onChange={(e) => formatCurrencyInput({ value: e.target.value })}
				id={rest.id ?? rest.placeholder}
				className={cn("mt-4 px-4 py-2", rest.className)}
			/>
		</div>
	);
}
