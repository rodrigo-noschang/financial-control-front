import { IExpenseDTO } from "@/app/dtos/expenses/ExpenseDTO";
import { Expense } from "./Expense";

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
					<Expense key={expense.id} expense={expense} />
				))}
			</div>
		</div>
	);
}
