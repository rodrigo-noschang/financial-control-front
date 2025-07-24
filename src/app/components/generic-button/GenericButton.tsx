import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface IProps extends React.ComponentProps<"button"> {
	text: string;
}

export function GenericButton({ text, ...rest }: IProps) {
	return (
		<Button
			{...rest}
			className={cn(
				"bg-sky-700 text-white font-normal p-6 hover:bg-sky-800 transition-[0.3s]",
				rest.className
			)}
		>
			{text}
		</Button>
	);
}
