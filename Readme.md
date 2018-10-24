# Logi Brings Your CloudWatch Lambda Logs Straight Into Your Terminal

With Logi, you can poll for CloudWatch Lambda Logs without visiting the AWS Console. It helps you to debug and develop your serverless applications 2x faster!

Disclaimer: This version is not tested yet! But it's good enough for local development. By polling your CloudWatch Logs additional costs may occur!

## Step 1
Run `npm install serverless-logi`

## Step 2
Add logi to your package.json

```json
"scripts": {
    "logi": "node ./node_modules/.bin/logi"
  },
```
## Step 3
Run `npm run logi -- function=<FunctionName> region=<AWS-Region>`


Todo:
1. Refactor (modularize) code -> Isolate side-effects
2. Unit test coverage 100%
3. Parsing `template.yaml` for automated polling (without specifying function names)