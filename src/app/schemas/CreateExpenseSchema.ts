import z from "zod";

export const createExpenseSchema = z.object({
	category_id: z.string("Selecione uma despesa"),
	amount: z.string("Informa a quantia gasta"),
});

export type CreateExpenseData = z.infer<typeof createExpenseSchema>;
