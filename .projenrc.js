const { typescript, awscdk } = require("projen");
const COMPILER_OPTIONS = {
  baseUrl: "./src",
  paths: {
    "@shared/*": ["shared/*"],
    "@task/*": ["modules/task/*"],
    "@infrastructure/*": ["infrastructure/*"],
  },
};
const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: "main",
  name: "cdk-lambda-service-example",
  eslintOptions: {
    prettier: true,
  },
  deps: [
    "express",
    "cors",
    "helmet",
    "compression",
    "morgan",
    "@therify-inc/types",
    "@therify-inc/ddd-utils",
    "zod",
    "@trpc/server",
    "@vendia/serverless-express",
    "aws-lambda",
    "dynamoose",
    "aws-sdk",
  ],
  devDeps: [
    "@types/aws-lambda",
    "@types/express",
    "@types/morgan",
    "@types/cors",
    "@types/helmet",
    "@types/compression",
  ],
  tsconfig: {
    compilerOptions: COMPILER_OPTIONS,
  },
});
project.synth();
const infra = new awscdk.AwsCdkTypeScriptApp({
  defaultReleaseBranch: "main",
  name: "cdk-lambda-service-example-infra",
  parent: project,
  cdkVersion: "2.1.0",
  eslint: false,
  outdir: "aws",
  devDeps: ["esbuild"],
});
infra.synth();
