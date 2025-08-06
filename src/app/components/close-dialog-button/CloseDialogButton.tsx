import React from "react";

import { DialogClose } from "@/components/ui/dialog";
import { CancelButton } from "../cancel-button/CancelButton";

interface IProps extends React.ComponentProps<"button"> {
	text?: "Cancelar" | "Fechar";
	isLoading?: boolean;
}

export function CloseDialogButton({
	text = "Cancelar",
	isLoading,
	...rest
}: IProps) {
	return (
		<DialogClose asChild>
			<CancelButton text={text} {...rest} isLoading={isLoading} />
		</DialogClose>
	);
}
