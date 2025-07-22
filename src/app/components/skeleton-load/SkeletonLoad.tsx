import Skeleton from "react-loading-skeleton";

interface ISkeletonLoadProps {
	baseColor?: string;
	highlightColor?: string;
	width?: number;
}

export function SkeletonLoad({
	baseColor = "#575757",
	highlightColor = "#787878",
	width = 45,
}: ISkeletonLoadProps) {
	return (
		<Skeleton
			width={width}
			baseColor={baseColor}
			highlightColor={highlightColor}
		/>
	);
}
