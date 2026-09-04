import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: { parser: tsParser },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "variable", format: ["camelCase", "PascalCase"] },
        { selector: "function", format: ["camelCase", "PascalCase"] },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
          prefix: ["T"],
          failureMessage: "Type names must use the 'T' prefix, e.g. TName",
        },
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
          failureMessage: "Interface names must use the 'I' prefix, e.g. IName",
        },
        {
          selector: "enum",
          format: ["PascalCase"],
          prefix: ["E"],
          failureMessage: "Enum names must use the 'E' prefix, e.g. ESymbol",
        },
        { selector: "enumMember", format: ["UPPER_CASE"] },
        {
          selector: "variable",
          modifiers: ["exported", "const"],
          format: ["UPPER_CASE"],
        },
      ],
    },
  },
];
