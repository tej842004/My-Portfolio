import { Extension } from "@tiptap/core";

const CustomEnterExtension = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        return this.editor.commands.first(({ commands }) => [
          () =>
            commands.command(({ tr }) => {
              tr.replaceSelectionWith(
                this.editor.schema.nodes.hardBreak.create()
              ).scrollIntoView();
              return true;
            }),
        ]);
      },
    };
  },
});

export default CustomEnterExtension;
