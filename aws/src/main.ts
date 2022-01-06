import path from "path";
import { App, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamo from "aws-cdk-lib/aws-dynamodb";
import * as Lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    const table = new dynamo.Table(this, "TaskTable", {
      tableName: "Task",
      partitionKey: { name: "uuid", type: dynamo.AttributeType.STRING },
    });
    const handler = new NodejsFunction(this, "handler", {
      entry: path.resolve(__dirname, "../../src/apps/lambdas/tasks.ts"),
      runtime: Lambda.Runtime.NODEJS_14_X,
    });
    table.grantFullAccess(handler);
    new apigateway.LambdaRestApi(this, "task-api", {
      handler,
    });
    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, "my-stack-dev", { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();
