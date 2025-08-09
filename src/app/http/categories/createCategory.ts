import { CreateCategoryData } from "@/app/schemas/categories/CreateCategorySchema";
import { api } from "../api";
import { ICategoryDTO } from "@/app/dtos/categories/CategoryDTO";

export async function createCategoryHttp(
	data: CreateCategoryData
): Promise<ICategoryDTO> {
	try {
		const response = await api.post("/category", data);

		const category = response.data.category as ICategoryDTO;
		return category;
	} catch (error: unknown) {
		console.log("🚀 ~ createCategory ~ error:", error);
		const errorMessage = "Não foi possivel criar a categoria agora";

		throw new Error(errorMessage);
	}
}
