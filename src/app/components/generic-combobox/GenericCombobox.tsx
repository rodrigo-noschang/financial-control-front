import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IoAddCircleOutline, IoCheckmarkOutline } from "react-icons/io5";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { GenericPopover } from "../generic-popover/GenericPopover";
import { ComboboxTrigger } from "../combobox-trigger/ComboboxTrigger";

import { IOptionsDTO } from "@/app/dtos/options/OptionsDTO";
import { GenericDialog } from "../generic-dialog/GenericDialog";
import { CreateCategoryForm } from "@/app/pages/FinancialData/create-category-form/CreateCategoryForm";

interface IProps extends React.ComponentProps<"select"> {
	label: string;
	emptyText: string;
	triggerText: string;
	options: IOptionsDTO[];
	inputPlaceholder: string;

	maxWidth?: number;
	errorMessage?: string;
	isLoadingOptions?: boolean;

	formOnChange?: (value: string) => void;
}

export function GenericCombobox({
	label,
	options,
	emptyText,
	triggerText,
	errorMessage,
	inputPlaceholder,
	isLoadingOptions,
	maxWidth = 300,
	formOnChange,
	...rest
}: IProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [createOptionDialogOpen, setCreationOptionDialogOpen] = useState(false);

	function handleSelectOption(option: string) {
		if (formOnChange) {
			formOnChange(option);
		}

		setIsOpen(false);
	}

	const { selectedValue, selectedLabel } = (() => {
		if (!rest.value || typeof rest.value !== "string") return {};

		const selectedOptionValue = rest.value.split("_||_")[0];
		const selectedOptionLabel = rest.value.split("_||_")[1];

		return {
			selectedValue: selectedOptionValue,
			selectedLabel: selectedOptionLabel,
		};
	})();

	useEffect(() => {
		console.log("here");
		setCreationOptionDialogOpen(false);
	}, [options]);

	return (
		<GenericPopover
			open={isOpen}
			onOpenChange={setIsOpen}
			trigger={
				<div>
					<ComboboxTrigger
						label={label}
						text={selectedLabel ?? triggerText}
						errorMessage={errorMessage}
						isLoadingOptions={isLoadingOptions}
					/>
					{errorMessage && (
						<div className="text-red-600 text-error-size">{errorMessage}</div>
					)}
				</div>
			}
			maxWidth={maxWidth}
		>
			<Command className="bg-inherit">
				<CommandInput
					placeholder={inputPlaceholder}
					className="text-standard-color"
					required={rest.required}
				/>
				<CommandList>
					<CommandEmpty className="text-standard-color">
						{emptyText}
					</CommandEmpty>

					<GenericDialog
						open={createOptionDialogOpen}
						onOpenChange={setCreationOptionDialogOpen}
						trigger={
							<div className="pr-4">
								<div className="flex items-center text-standard-color py-1 px-4 cursor-pointer border-1 border-standard-color gap-2 rounded-md mt-2 hover:bg-box-bg">
									<IoAddCircleOutline size={16} />
									<span> Criar Categoria </span>
								</div>
							</div>
						}
						content={<CreateCategoryForm />}
					/>

					<CommandGroup value={rest.value as string | undefined}>
						{options.map((option) => (
							<CommandItem
								key={option.value}
								value={`${option.value}_||_${option.label}`}
								onSelect={handleSelectOption}
								className={cn(
									"rounded-md border-1 border-transparent text-standard-color hover:cursor-pointer hover:bg-standard-color hover:text-black mr-4",
									selectedValue === option.value
										? "bg-standard-color border-page-bg text-black"
										: "bg-inherit"
								)}
							>
								{option.label}
								<IoCheckmarkOutline
									size={18}
									color="#535353"
									className={cn(
										selectedValue === option.value ? "opacity-100" : "opacity-0"
									)}
								/>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</Command>
		</GenericPopover>
	);
}
