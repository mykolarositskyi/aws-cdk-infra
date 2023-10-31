import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class TodoListDynamodbConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const todoTable = new dynamodb.Table(this, "TodoTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      tableName: "TodoTable",
    });

    new cdk.CfnOutput(this, "TodoTableArn", {
      value: todoTable.tableArn,
    });
  }
}
