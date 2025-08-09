import { Expense } from "./Expense";
import { ExpenseTableLoading } from "../expense-table-loading/ExpenseTableLoading";

import { IExpenseDTO } from "@/app/dtos/expenses/ExpenseDTO";
import { RefetchingShield } from "@/app/components/refetching-shield/RefecthingShield";

interface IProps {
	expenses: IExpenseDTO[];
	isLoadingExpenses?: boolean;
	isRefetchingExpenses?: boolean;
}

export function ExpensesTable({
	expenses,
	isLoadingExpenses,
	isRefetchingExpenses,
}: IProps) {
	return (
		<div className="relative">
			<div className="bg-table-header text-standard-size flex items-center text-white font-bold justify-between px-8 py-2">
				<span className="text-center w-[70px]">Despesa</span>
				<span className="text-center w-[150px] truncate">Observações</span>
				<span className="text-center w-[70px]">Quantia</span>
				<span className="text-center w-[70px]">Data</span>
				<span className="text-center w-[100px]">Essencial</span>
				<span className="text-center w-[100px]">Recorrente</span>
			</div>

			{isLoadingExpenses ? (
				<div>
					<ExpenseTableLoading />
				</div>
			) : isRefetchingExpenses ? (
				<RefetchingShield />
			) : (
				<div>
					{expenses.map((expense) => (
						<Expense key={expense.id} expense={expense} />
					))}
				</div>
			)}
		</div>
	);
}
