import { ReactNode } from "react";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface IProps {
	trigger: ReactNode;
	content: ReactNode;
	maxWidth?: number;
}

export function GenericDialog({ trigger, content, maxWidth = 450 }: IProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent
				aria-describedby={undefined}
				className="bg-page-bg"
				style={{ maxWidth: `clamp(300px, 90vw, ${maxWidth}px)` }}
			>
				<DialogTitle className="hidden"></DialogTitle>
				{content}
			</DialogContent>
		</Dialog>
	);
}
