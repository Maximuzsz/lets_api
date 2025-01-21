jest.mock('@aws-sdk/client-dynamodb', () => {
    const originalModule = jest.requireActual('@aws-sdk/client-dynamodb');
    return {
      ...originalModule,
      DynamoDBClient: jest.fn(),
      PutItemCommand: jest.fn(),
      GetItemCommand: jest.fn(),
      UpdateItemCommand: jest.fn(),
      DeleteItemCommand: jest.fn(),
      ScanCommand: jest.fn(),
    };
  });
  
jest.mock('@aws-sdk/util-dynamodb', () => ({
    marshall: jest.fn(),
    unmarshall: jest.fn(),
}));
  