import { cn } from "@/app/utils/cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface IProps extends React.ComponentProps<"input"> {
	label?: string;
	labelClassName?: string;
}

export function TextInput({ label, ...rest }: IProps) {
	return (
		<div>
			{!!label && (
				<Label htmlFor={rest.id ?? rest.placeholder}>
					{" "}
					{label}{" "}
					{rest.required && <span className="text-required-start">*</span>}
				</Label>
			)}
			<Input
				{...rest}
				id={rest.id ?? rest.placeholder}
				className={cn("mt-4 px-4 py-2", rest.className)}
			/>
		</div>
	);
}
