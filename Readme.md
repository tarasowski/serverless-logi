# Logi Brings your CloudWatch Logs Into Your Terminal

With Logi, you can poll for CloudWatch Lambda Logs without visiting the AWS Console. It helps you to debug and develop your serverless applications 2x faster!

Disclaimer: This version is not tested yet! But it's good enough for local development. By polling your CloudWatch Logs additional costs may occur!

1. Run `npm install serverless-logi`
2. Run `npm run logi -- function=<FunctionName> region=<AWS-Region>`
3. Have fun