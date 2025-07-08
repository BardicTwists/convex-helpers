import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  { files: ["src/**/*.{js,mjs,cjs,ts,tsx}"] },
  {
    ignores: [
      "dist/**",
      "eslint.config.mjs",
      "setup.cjs",
      "**/_generated/",
      "vite.config.mts",
      "vitest.workspace.ts",
    ],
  },
  {
    languageOptions: {
      globals: globals.worker,
      parser: tseslint.parser,

      parserOptions: {
        project: [
          "./tsconfig.json",
          "./packages/convex-helpers/tsconfig.test.json",
        ],
        tsconfigRootDir: ".",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      "src/react/**/*.{jsx,tsx}",
      "src/react/**/*.js",
      "src/react/**/*.ts",
    ],
    plugins: { react: reactPlugin, "react-hooks": reactHooks },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs["recommended"].rules,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "eslint-comments/no-unused-disable": "off",
      "@typescript-eslint/no-explicit-any": "off",

      // allow (_arg: number) => {} and const _foo = 1;
      "no-unused-vars": "off",
      "no-unused-private-class-members": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];
