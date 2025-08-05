import { IExpenseDTO } from "@/app/dtos/expenses/ExpenseDTO";
import { cn } from "@/app/utils/cn";
import { formatCurrencyValue } from "@/app/utils/formatCurrencyValue";
import { addHours, format } from "date-fns";

interface IProps {
	expense: IExpenseDTO;
}

export function Expense({ expense }: IProps) {
	return (
		<div
			key={expense.id}
			className="text-standard-size flex items-center text-white justify-between px-8 py-2 odd:bg-table-row-dark even:bg-table-row-light"
		>
			<span className="text-center w-[70px]">{expense.category.name}</span>
			<span
				className="text-center w-[150px] truncate"
				title={expense.observation}
			>
				{expense.observation}
			</span>
			<span className="text-center w-[70px]">
				{formatCurrencyValue({ value: Number(expense.amount) })}
			</span>
			<span className="text-center w-[70px]">
				{format(addHours(expense.date, 12), "dd/MM/yyyy")}
			</span>
			<span
				className={cn(
					"text-center w-[100px]",
					expense.essential ? "text-table-essentials" : "text-table-rest"
				)}
			>
				{expense.essential ? "Sim" : "Não"}
			</span>
			<span
				className={cn(
					"text-center w-[100px]",
					expense.recurrent ? "text-table-essentials" : "text-table-rest"
				)}
			>
				{expense.recurrent ? "Sim" : "Não"}
			</span>
		</div>
	);
}
