import { Boards, NewBoardFormModal } from "@/components";
import { LoginView } from "@/components/";
import { authOptions } from "@/lib/authOptions";
import { faArrowUpWideShort, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div>
				<LoginView />
			</div>
		);
	}
	return (
		<div className="justify-center px-12 ">
			<Boards />
		</div>
	);
}
