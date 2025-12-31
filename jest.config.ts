import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const esModules = ["nanoid"].join("|");

const config: Config = {
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
  transformIgnorePatterns: [
    "node_modules/(?!(firebase|@firebase)/)",
    `/node_modules/(?!${esModules})`,
  ],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          [
            "@babel/preset-env",
            { targets: { node: "current" }, modules: "auto" },
          ],
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      {
        presets: [
          [
            "@babel/preset-env",
            { targets: { node: "current" }, modules: "auto" },
          ],
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  moduleDirectories: ["node_modules", "<rootDir>/"],

  moduleNameMapper: {
    "^firebase(.*)$": "<rootDir>/__mocks__/firebaseMock.ts",
    "^firebase/(.*)$": "<rootDir>/__mocks__/firebase.js",
    "^@firebase/(.*)$": "<rootDir>/__mocks__/firebase.js",
    "^@/(.*)$": "<rootDir>/$1",
    "^nanoid(/(.*)|$)": "nanoid$1",
    "^nanoid$": "<rootDir>/__mocks__/nanoid.js",
    "^next/navigation$": "<rootDir>/__mocks__/next/navigation.ts",
  },
};

export default createJestConfig(config);
