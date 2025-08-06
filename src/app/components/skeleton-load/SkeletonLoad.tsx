import Skeleton from "react-loading-skeleton";

interface ISkeletonLoadProps {
	baseColor?: string;
	highlightColor?: string;
	width?: string;
	height?: number;
}

export function SkeletonLoad({
	baseColor = "#575757",
	highlightColor = "#787878",
	width = "100%",
	height = 24,
}: ISkeletonLoadProps) {
	return (
		<Skeleton
			width={width}
			height={height}
			baseColor={baseColor}
			highlightColor={highlightColor}
		/>
	);
}
