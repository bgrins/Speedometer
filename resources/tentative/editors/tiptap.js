import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

export default function (element, value) {
  let editor = new Editor({
    element,
    extensions: [
      StarterKit
    ],
    content: value,
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
  });
  return {
    editor,
    setValue(value) {
      editor.commands.setContent(value);
    },
    format(on) {
      editor.commands.selectAll()
      if (on) {
        editor.chain().focus().setBold().run();
      } else {
        editor.chain().focus().unsetBold().run();
      }
      editor.commands.setTextSelection(0)
    },
  };
}
