/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "../api";
import { IExpenseDTO } from "@/app/dtos/expenses/ExpenseDTO";
import { IPaginationDTO } from "@/app/dtos/pagination/PagiationDTO";
import { IListExpensesResponseDTO } from "@/app/dtos/responses/ListExpensesResponseDTO";

interface IRequest {
	startDate?: Date;
	endDate?: Date;
	page?: number;
}

export async function listExpensesHttp({
	startDate,
	endDate,
	page,
}: IRequest): Promise<IListExpensesResponseDTO> {
	try {
		const response = await api.get("/expense", {
			params: {
				start_date: startDate,
				end_date: endDate,
				page,
			},
		});

		const data = response.data;

		const expenses: IExpenseDTO[] = data.expenses ?? [];
		const pagination: IPaginationDTO = data.pagination;

		return { expenses, pagination };
	} catch (error: any) {
		console.error(error);
		const errorMessage =
			"Não foi possivel carregar o resumo das despesas. Tente novamente";
		throw Error(errorMessage);
	}
}
