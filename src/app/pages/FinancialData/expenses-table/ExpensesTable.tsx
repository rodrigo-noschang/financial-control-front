import { Expense } from "./Expense";
import { ExpenseTableLoading } from "../expense-table-loading/ExpenseTableLoading";

import { IExpenseDTO } from "@/app/dtos/expenses/ExpenseDTO";
import { RefetchingShield } from "@/app/components/refetching-shield/RefecthingShield";
import { Pagination } from "@/app/components/pagination/Pagination";
import { IPaginationDTO } from "@/app/dtos/pagination/PagiationDTO";

interface IProps {
	expenses: IExpenseDTO[];
	paginationInfo: IPaginationDTO;
	isLoadingExpenses?: boolean;
	isRefetchingExpenses?: boolean;
}

export function ExpensesTable({
	expenses,
	paginationInfo,
	isLoadingExpenses,
	isRefetchingExpenses,
}: IProps) {
	return (
		<div className="relative pb-20">
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

					<div className="mt-20">
						<Pagination paginationInfo={paginationInfo} />
					</div>
				</div>
			)}
		</div>
	);
}
