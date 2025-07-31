/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "../api";
import { ICategoryDTO } from "@/app/dtos/categories/CategoryDTO";

export async function listCategoriesHttp(): Promise<ICategoryDTO[]> {
	try {
		const response = await api.get("/category");

		const categories: ICategoryDTO[] = response.data.categories ?? [];
		return categories;
	} catch (error: any) {
		throw error;
	}
}
