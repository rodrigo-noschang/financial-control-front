import { ReactNode } from "react";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface IProps extends React.ComponentPropsWithRef<typeof Dialog> {
	trigger: ReactNode;
	content: ReactNode;
	maxWidth?: number;
}

export function GenericDialog({
	trigger,
	content,
	maxWidth = 450,
	...rest
}: IProps) {
	return (
		<Dialog {...rest}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent
				aria-describedby={undefined}
				className="bg-modal-bg"
				style={{ maxWidth: `clamp(300px, 90vw, ${maxWidth}px)` }}
			>
				<DialogTitle className="hidden"></DialogTitle>
				{content}
			</DialogContent>
		</Dialog>
	);
}
