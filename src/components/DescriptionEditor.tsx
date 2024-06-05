"use client";
import LiveblocksProvider from "@liveblocks/yjs";
import { Doc } from "yjs";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { Underline } from "@tiptap/extension-underline";
import { useSelf } from "@/app/liveblocks.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBold,
	faCode,
	faHeading,
	faItalic,
	faUnderline,
} from "@fortawesome/free-solid-svg-icons";

type EditorProps = {
	doc: Doc;
	provider: LiveblocksProvider<any, any, any, any>;
	cardId: string;
};

export const DescriptionEditor = ({ doc, provider, cardId }: EditorProps) => {
	const userInfo = useSelf((me) => me.info);

	if (!userInfo) return;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				history: false,
			}),
			Placeholder.configure({
				emptyEditorClass: "is-editor-empty",
				placeholder: "Write a description...",
			}),
			Collaboration.configure({
				document: doc,
				field: cardId,
			}),
			CollaborationCursor.configure({
				provider,
				user: userInfo,
			}),
			Underline.configure(),
		],
	});

	return (
		<div>
			<div className="flex gap-1 mb-1 mt-1 editor-buttons">
				<button
					onClick={() => editor?.chain().focus().toggleBold().run()}
					className={editor?.isActive("bold") ? "active" : ""}
				>
					<FontAwesomeIcon icon={faBold} />
				</button>
				<button
					onClick={() => editor?.chain().focus().toggleItalic().run()}
					className={editor?.isActive("italic") ? "active" : ""}
				>
					<FontAwesomeIcon icon={faItalic} />
				</button>
				<button
					onClick={() => editor?.chain().focus().toggleUnderline().run()}
					className={editor?.isActive("underline") ? "active" : ""}
				>
					<FontAwesomeIcon icon={faUnderline} />
				</button>
				<button
					onClick={() =>
						editor?.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={editor?.isActive("heading") ? "active" : ""}
				>
					<FontAwesomeIcon icon={faHeading} />
				</button>
				<button
					onClick={() => editor?.chain().focus().toggleCode().run()}
					className={editor?.isActive("code") ? "active" : ""}
				>
					<FontAwesomeIcon icon={faCode} />
				</button>
			</div>
			<EditorContent editor={editor} className="border rounded-md" />
		</div>
	);
};
