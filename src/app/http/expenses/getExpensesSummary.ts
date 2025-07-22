/* eslint-disable @typescript-eslint/no-explicit-any */

import { IExpensesSummaryDTO } from "@/app/dtos/expenses/ExpensesSummaryDTO";
import { api } from "../api";
import { asyncStall } from "@/app/utils-dev/asyncStall";

interface IRequest {
  startDate?: Date;
  endDate?: Date
}

export async function getExpensesSummaryHttp({ 
  startDate, 
  endDate 
}: IRequest): Promise<IExpensesSummaryDTO> {
  await asyncStall();

  try {
    const response = await api.get('/expense/summary', {
    params: {
        start_date: startDate,
        end_date: endDate 
      }
    });
    
    const data = response.data;

    return {
      essentials: data.essentials,
      rest: data.rest,
      total: data.total,
    }
  } catch(error: any) {
    console.error(error);
    const errorMessage = 'Não foi possivel carregar o resumo das despesas. Tente novamente';
    throw Error(errorMessage)
  }
}