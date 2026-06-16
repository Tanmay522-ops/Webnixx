import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@next/next/no-html-link-for-pages": "warn",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;