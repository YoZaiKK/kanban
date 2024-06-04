import LiveblocksProvider from "@liveblocks/yjs";
import { Doc } from "yjs";

type EditorProps = {
	doc: Doc;
	provider: LiveblocksProvider<any, any, any, any>;
	cardId: string;
};

export const DescriptionEditor = (props: EditorProps) => {
	return <div>Description Editor</div>;
};
