import { Stack, aws_cognito } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CognitoConstruct } from "../constructs/cognito";

export class AuthStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new CognitoConstruct(this, 'CognitoUserPool')
  }
}
