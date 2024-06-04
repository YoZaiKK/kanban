import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CancelButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			onClick={onClick}
			className="w-full mt-4 gap-2 flex justify-center items-center uppercase text-sm  text-gray-400"
		>
			<FontAwesomeIcon icon={faClose} />
			Cancel edit
		</button>
	);
};
