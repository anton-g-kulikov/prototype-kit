import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    rules: {
      // Add any custom rule overrides here if needed
    }
  },
  {
    ignores: [".next/*", "out/*", "build/*"]
  }
];

export default config;
