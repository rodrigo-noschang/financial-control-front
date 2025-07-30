import { IExpenseDTO } from "@/app/dtos/expenses/ExpenseDTO";
import { formatCurrencyValue } from "@/app/utils/formatCurrencyValue";
import { addHours, format } from "date-fns";

interface IProps {
	expenses: IExpenseDTO[];
}

export function ExpensesTable({ expenses }: IProps) {
	return (
		<div>
			<div className="bg-table-header text-standard-size flex items-center text-white font-bold justify-between px-8 py-2">
				<span className="text-center w-[70px]">Despesa</span>
				<span className="text-center w-[150px] truncate">Observações</span>
				<span className="text-center w-[70px]">Quantia</span>
				<span className="text-center w-[70px]">Data</span>
				<span className="text-center w-[100px]">Essencial</span>
				<span className="text-center w-[100px]">Recorrente</span>
			</div>

			<div>
				{expenses.map((expense) => (
					<div
						key={expense.id}
						className="text-standard-size flex items-center text-white justify-between px-8 py-2 odd:bg-table-row-dark even:bg-table-row-light"
					>
						<span className="text-center w-[70px]">
							{expense.category.name}
						</span>
						<span className="text-center w-[150px] truncate">
							{expense.observation}
						</span>
						<span className="text-center w-[70px]">
							{formatCurrencyValue({ value: Number(expense.amount) })}
						</span>
						<span className="text-center w-[70px]">
							{format(addHours(expense.date, 12), "dd/MM/yyyy")}
						</span>
						<span className="text-center w-[100px]">
							{expense.essential ? "Sim" : "Não"}
						</span>
						<span className="text-center w-[100px]">
							{expense.recurrent ? "Sim" : "Não"}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
