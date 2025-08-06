/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "../api";

import { CreateExpenseHttpData } from "@/app/schemas/CreateExpenseSchema";

export async function createExpenseHttp(data: CreateExpenseHttpData) {
	try {
		const response = await api.post("/expense", data);
		console.log("🚀 ~ createExpenseHttp ~ response.data:", response.data);
		const expense = response.data.expense;
		return expense;
	} catch (error: any) {
		console.log("🚀 ~ createExpenseHttp ~ error:", error);
		throw Error("Não foi possivel criar uma despesa agora. Tente novamente.");
	}
}
