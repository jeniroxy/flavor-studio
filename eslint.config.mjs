import next from "eslint-config-next";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...next,
  {
    // `project/` is the read-only Claude Design handoff bundle, `scripts/` are
    // plain Node build helpers — neither is app source.
    ignores: [".next/**", "node_modules/**", "project/**", "scripts/**"],
  },
];

export default eslintConfig;
