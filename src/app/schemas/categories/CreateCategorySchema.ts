import z from "zod";

export const createCategorySchema = z.object({
	name: z
		.string("Informe o nome da categoria")
		.nonempty("Informe o nome da categoria"),
});

export type CreateCategoryData = z.infer<typeof createCategorySchema>;
