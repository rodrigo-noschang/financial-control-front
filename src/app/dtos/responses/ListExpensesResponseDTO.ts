import { IExpenseDTO } from "../expenses/ExpenseDTO";
import { IPaginationDTO } from "../pagination/PagiationDTO";

export interface IListExpensesResponseDTO {
	expenses: IExpenseDTO[];
	pagination: IPaginationDTO;
}
