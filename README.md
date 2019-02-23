# Hypernova Lambda

Implementation of [Hypernova](https://github.com/airbnb/hypernova) for [AWS Lambda](https://aws.amazon.com/lambda/)

## Differences of Hypernova Server

**Hypernova Lambda** uses [Amazon API Gateway](https://aws.amazon.com/api-gateway/) instead of [express](https://expressjs.com/) as HTTP Server and the Server Side Rendering will be perform by the Lambda Function.

### Options for Hypernova Lambda

The only supported option for Hypernova Lambda is `getComponent` and `processJobsConcurrently` is `true` by default so all the job will be proccessed concurrently.
```js
{
  getComponet: undefined
}
```

## Installation
```sh
npm install --save hypernova-lambda hypernova
```

## Example

```js
import hypernova from 'hypernova-lambda';

const getComponent = (name) => {
  if (name === 'Header') {
    return /* return component to be render here */
  }
  return null;
};

export const handler = (event, context, callback) => {
  hypernova(event, { getComponent }, callback);
};

```