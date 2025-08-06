import { ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

export function MonthsSummaryHeader({ children }: IProps) {
	return <div className="flex justify-between items-center">{children}</div>;
}
