import { ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

export function MonthsSummaryRoot({ children }: IProps) {
	return (
		<div className="bg-box-bg py-4 px-8 rounded-md border-1 border-standard-color w-fit">
			{children}
		</div>
	);
}
