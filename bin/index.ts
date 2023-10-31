import { App } from "aws-cdk-lib";
import { DatabaseStack } from "../lib/stacks/database.stack";
import { AuthStack } from "../lib/stacks/auth.stack";

const app = new App();

new DatabaseStack(app, "DatabaseStack");
new AuthStack(app, "AuthStack");

app.synth();
