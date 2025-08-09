import React from "react";
import { PuffLoader } from "react-spinners";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IProps extends React.ComponentProps<"button"> {
	text: string;
	isLoading?: boolean;
}

export function GenericButton({ text, isLoading, ...rest }: IProps) {
	return (
		<Button
			{...rest}
			disabled={rest.disabled || isLoading}
			className={cn(
				"bg-sky-700 text-white font-normal px-4 py-2 hover:bg-sky-800 transition-[0.3s] flex items-center justify-center gap-0",
				rest.className
			)}
		>
			<span
				className={cn(
					"text-red-200 transition-[0.3s] overflow-hidden",
					isLoading ? "w-[20px] mr-2" : "w-0 mr-0"
				)}
			>
				<PuffLoader size={20} loading={isLoading} color="#D1D1D1" />
			</span>

			<span className="">{text}</span>
		</Button>
	);
}
