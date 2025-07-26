import React from "react";
import { CircleLoader } from "react-spinners";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IProps extends React.ComponentProps<"button"> {
	text: string;
	isLoading?: boolean;
}

export function GenericButton({ text, isLoading, ...rest }: IProps) {
	console.log("🚀 ~ GenericButton ~ isLoading:", isLoading);
	return (
		<Button
			{...rest}
			className={cn(
				"bg-sky-700 text-white font-normal p-6 hover:bg-sky-800 transition-[0.3s]",
				rest.className
			)}
		>
			<CircleLoader size={30} loading={true} color="#f00" />

			{text}
		</Button>
	);
}
