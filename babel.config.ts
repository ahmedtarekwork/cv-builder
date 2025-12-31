const config = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" }, modules: "auto" }],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};

export default config;
