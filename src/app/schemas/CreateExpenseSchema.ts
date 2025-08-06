import z from "zod";

export const createExpenseSchema = z
	.object({
		category_id: z.string("Selecione uma despesa"),
		amount: z
			.string("Informa a quantia gasta")
			.min(0.1, "Informe o valor da despesa"),
		date: z.date("Informe uma data"),
		essential: z.boolean(),
		recurrent: z.boolean(),
		observation: z.string().optional().nullable(),
	})
	.transform((form) => {
		const categoryId = form.category_id.split("_||_")[0];
		const amount = form.amount.replace(/\D/g, "");

		return {
			category_id: categoryId,
			amount,
			date: form.date,
			essential: form.essential,
			recurrent: form.recurrent,
			observation: form.observation,
		};
	});

export type CreateExpenseData = z.infer<typeof createExpenseSchema>;

export type CreateExpenseHttpData = Omit<
	CreateExpenseData,
	"category_id" | "amount"
> & {
	category_id: number;
	amount: number;
};
