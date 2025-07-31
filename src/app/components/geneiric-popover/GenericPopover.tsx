import { ReactNode } from "react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface IProps {
	trigger: ReactNode;
	children: ReactNode;
	maxWidth?: number;
}

export function GenericPopover({ trigger, children, maxWidth = 320 }: IProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>

			<PopoverContent
				className="bg-page-bg border-1-black"
				style={{
					minWidth: `clamp(300px, 90vw, ${maxWidth}px)`,
					maxWidth: `clamp(300px, 90vw, ${maxWidth}px)`,
				}}
			>
				{children}
			</PopoverContent>
		</Popover>
	);
}
