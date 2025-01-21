import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// Configuração para ambiente de teste local
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      }
    : undefined,
  endpoint: process.env.DYNAMODB_LOCAL_ENDPOINT || 'http://localhost:8000', // URL do DynamoDB local
});

export default dynamoClient;
