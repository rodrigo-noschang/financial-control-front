import z from "zod";

export const createExpenseSchema = z
	.object({
		category_id: z.string("Selecione uma despesa"),
		amount: z
			.string("Informa a quantia gasta")
			.min(0.1, "Informe o valor da despesa"),
		expense_date: z.date("Informe uma data"),
		essential: z.boolean(),
		recurrent: z.boolean(),
	})
	.transform((form) => {
		const categoryId = form.category_id.split("_||_")[0];
		const amount = form.amount.replace(/\D/g, "");

		return {
			category_id: categoryId,
			amount,
			expense_date: form.expense_date,
			essential: form.essential,
			recurrent: form.recurrent,
		};
	});

export type CreateExpenseData = z.infer<typeof createExpenseSchema>;
