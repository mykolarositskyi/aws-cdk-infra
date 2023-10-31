import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { TodoListDynamodbConstruct } from "../constructs/todo-list";

export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new TodoListDynamodbConstruct(this, "TodoListDynamodbConstruct");
  }
}
