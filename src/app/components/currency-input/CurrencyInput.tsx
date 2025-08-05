import React from "react";

import { cn } from "@/app/utils/cn";
import { formatCurrencyInput } from "@/app/utils/formatCurrencyInput";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IProps extends React.ComponentProps<"input"> {
	label?: string;
	formOnChange?: (value: string) => void;
}

export function CurrencyInput({ label, formOnChange, ...rest }: IProps) {
	const formattedValue = rest.value
		? formatCurrencyInput({ value: rest.value.toString() })
		: undefined;

	function handleOnChange(value: string) {
		const formattedValue = formatCurrencyInput({ value });

		if (formOnChange && formattedValue) {
			formOnChange(formattedValue);
		}
	}

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
				onChange={(e) => handleOnChange(e.target.value)}
				id={rest.id ?? rest.placeholder}
				className={cn("mt-4 px-4 py-2", rest.className)}
			/>
		</div>
	);
}
