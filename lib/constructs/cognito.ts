import { CfnOutput, RemovalPolicy, aws_cognito } from "aws-cdk-lib";
import { ClientAttributes } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class CognitoConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const userPool = new aws_cognito.UserPool(this, "UserPool", {
      removalPolicy: RemovalPolicy.DESTROY,
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      userVerification: {
        emailSubject: "Verify your email for our app",
        emailBody:
          "Thanks for signing up to our app! Your verification code is {####}",
        emailStyle: aws_cognito.VerificationEmailStyle.CODE,
      },
    });

    const appClient = userPool.addClient("AppClient", {
      readAttributes: new ClientAttributes().withStandardAttributes({
        email: true,
        phoneNumber: true,
        familyName: true,
        givenName: true,
      }),
      writeAttributes: new ClientAttributes().withStandardAttributes({
        familyName: true,
        givenName: true,
      }),
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });

    const identityPool = new aws_cognito.CfnIdentityPool(
      this,
      "MyIdentityPool",
      { 
        allowUnauthenticatedIdentities: false,
        cognitoIdentityProviders: [
          {
            clientId: appClient.userPoolClientId,
            providerName: userPool.userPoolProviderName,
          },
        ],
      }
    );

    new CfnOutput(this, "UserPoolId", { value: userPool.userPoolId });
    new CfnOutput(this, "AppClient", { value: appClient.userPoolClientId });
    new CfnOutput(this, "IdentityPoolId", { value: identityPool.ref });
  }
}
