import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TextInput } from "@/app/components/text-input/TextInput";
import { GenericButton } from "@/app/components/generic-button/GenericButton";
import {
	CreateCategoryData,
	createCategorySchema,
} from "@/app/schemas/categories/CreateCategorySchema";
import { createCategoryHttp } from "@/app/http/categories/createCategory";
import { ZodError } from "zod";
import toast from "react-hot-toast";

export function CreateCategoryForm() {
	const [error, setError] = useState("");
	const queryClient = useQueryClient();
	const nameInputRef = useRef<HTMLInputElement>(null);

	const { mutateAsync: createCategory, isPending: isCreatingCategory } =
		useMutation({
			mutationKey: ["create-category"],
			mutationFn: createCategoryHttp,
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["list-categories"],
				});

				toast.success("Categoria criada com sucess");
			},
		});

	async function handleCreateCategory() {
		const name = nameInputRef.current?.value ?? "";

		const data: CreateCategoryData = { name };

		try {
			createCategorySchema.parse(data);
			return await createCategory(data);
		} catch (error: unknown) {
			let errorMessage = "Não foi possivel criar a categoria";

			if (error instanceof ZodError) {
				errorMessage = error.message;
			}

			setError(errorMessage);
		}
	}

	return (
		<div>
			<div>
				<TextInput
					label="Nome da categoria"
					placeholder="Nome"
					ref={nameInputRef}
				/>

				{error && <div className="text-sm">{error}</div>}
			</div>

			<div className="mt-4">
				<GenericButton
					text="Criar"
					isLoading={isCreatingCategory}
					type="button"
					onClick={handleCreateCategory}
				/>
			</div>
		</div>
	);
}
