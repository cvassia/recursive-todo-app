import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommended: true,
});

export default [
    ...compat.extends("eslint:recommended"),
    ...compat.extends("@typescript-eslint/recommended"),

    {
        files: ["*.ts", "*.tsx"],
        languageOptions: {
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            "semi": ["error", "always"],
            "quotes": ["error", "single"],
            "@typescript-eslint/no-unused-vars": ["warn"],
        },
    },
];
