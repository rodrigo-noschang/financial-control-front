import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IProps extends React.ComponentProps<"button"> {
	text?: "Cancelar" | "Fechar";
}

export function CancelButton({ text = "Cancelar", ...rest }: IProps) {
	return (
		<Button
			{...rest}
			className={cn(
				"bg-gray-200 text-black font-normal hover:bg-gray-300 transition-[0.3s]",
				rest.className
			)}
		>
			{text}
		</Button>
	);
}
