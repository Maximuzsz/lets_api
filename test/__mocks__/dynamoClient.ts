const sendMock = jest.fn();

export const mockDynamoClient = {
  send: sendMock,
};

jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDBClient: jest.fn(() => mockDynamoClient),
    PutItemCommand: jest.fn(),
    GetItemCommand: jest.fn(),
    UpdateItemCommand: jest.fn(),
    DeleteItemCommand: jest.fn(),
    ScanCommand: jest.fn(),
  };
});

export { sendMock };
