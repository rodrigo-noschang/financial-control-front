import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IProps extends React.ComponentProps<"button"> {
	text?: "Cancelar" | "Fechar";
	isLoading?: boolean;
}

export function CancelButton({
	text = "Cancelar",
	isLoading,
	...rest
}: IProps) {
	return (
		<Button
			{...rest}
			disabled={rest.disabled || isLoading}
			className={cn(
				"bg-cancel-bg text-black font-normal hover:bg-gray-300 transition-[0.3s]",
				rest.className
			)}
		>
			{text}
		</Button>
	);
}
