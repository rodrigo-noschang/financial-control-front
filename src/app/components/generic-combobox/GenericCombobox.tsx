import { IoCheckmarkOutline } from "react-icons/io5";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { GenericPopover } from "../geneiric-popover/GenericPopover";
import { IOptionsDTO } from "@/app/dtos/options/OptionsDTO";
import React from "react";
import { cn } from "@/lib/utils";
import { ComboboxTrigger } from "../combobox-trigger/ComboboxTrigger";

interface IProps extends React.ComponentProps<"select"> {
	label: string;
	triggerText: string;
	inputPlaceholder: string;
	emptyText: string;
	maxWidth?: number;
	options: IOptionsDTO[];

	formOnChange?: (value: string) => void;
}

export function GenericCombobox({
	options,
	inputPlaceholder,
	triggerText,
	emptyText,
	label,
	maxWidth = 300,
	formOnChange,
	...rest
}: IProps) {
	function handleSelectOption(option: string) {
		if (formOnChange) {
			formOnChange(option);
		}
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

	return (
		<GenericPopover
			trigger={
				<div>
					<ComboboxTrigger label={label} text={selectedLabel ?? triggerText} />
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
					<CommandGroup value={rest.value as string | undefined}>
						{options.map((option) => (
							<CommandItem
								key={option.value}
								value={`${option.value}_||_${option.label}`}
								onSelect={handleSelectOption}
								className={cn(
									"rounded-md border-1 border-transparent text-standard-color hover:cursor-pointer hover:bg-standard-color hover:text-black",
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
