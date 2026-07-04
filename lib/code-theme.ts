/** Custom Shiki theme matching the handoff's code-block palette (dark-only by design). */
export const codeTheme = {
  name: "jb-dark",
  type: "dark",
  colors: {
    "editor.background": "#131515",
    "editor.foreground": "#C6CFD0",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#5B6465", fontStyle: "italic" } },
    { scope: ["keyword", "storage.type", "storage.modifier", "keyword.control"], settings: { foreground: "#86BBD4" } },
    {
      scope: ["entity.name.function", "support.function", "support.class", "entity.name.type", "support.type"],
      settings: { foreground: "#6AB0CD" },
    },
    { scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: "#9FD3A8" } },
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#6AB0CD" } },
    { scope: ["variable", "variable.parameter"], settings: { foreground: "#C6CFD0" } },
  ],
}
