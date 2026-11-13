/** Custom Shiki theme for the Menu Screen palette (code blocks are dark in both themes). */
export const codeTheme = {
  name: "jb-dark",
  type: "dark",
  colors: {
    "editor.background": "#07131a",
    "editor.foreground": "#dff1ee",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#7f9ea0", fontStyle: "italic" } },
    { scope: ["keyword", "storage.type", "storage.modifier", "keyword.control"], settings: { foreground: "#ffcf7f" } },
    {
      scope: ["entity.name.function", "support.function", "support.class", "entity.name.type", "support.type"],
      settings: { foreground: "#7fd6cf" },
    },
    { scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: "#a8e6b0" } },
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#7fd6cf" } },
    { scope: ["variable", "variable.parameter"], settings: { foreground: "#dff1ee" } },
  ],
}
