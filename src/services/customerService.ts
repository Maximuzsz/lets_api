import { PutItemCommand, GetItemCommand, DeleteItemCommand, ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../models/customer';
import dynamoClient from '../utils/dynamoClient';


const TABLE_NAME = process.env.DYNAMO_TABLE || 'customers';

export class CustomerService {
  /**
   * Cria um novo cliente
   */
  static async createCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
    const customer: Customer = {
      id: uuidv4(),
      ...data,
    };

    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: marshall(customer),
    });

    await dynamoClient.send(command);
    return customer;
  }

  /**
   * Busca um cliente pelo ID
   */
  static async getCustomerById(id: string): Promise<Customer | null> {
    const command = new GetItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ id }),
    });

    const response = await dynamoClient.send(command);

    if (!response.Item) {
      return null;
    }

    return unmarshall(response.Item) as Customer;
  }

  /**
   * Atualiza um cliente pelo ID
   */
  static async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
    const updateExpressionParts: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    for (const [key, value] of Object.entries(updates)) {
      const attributeName = `#${key}`;
      const attributeValue = `:${key}`;
      updateExpressionParts.push(`${attributeName} = ${attributeValue}`);
      expressionAttributeNames[attributeName] = key;
      expressionAttributeValues[attributeValue] = value;
    }

    const updateExpression = `SET ${updateExpressionParts.join(', ')}`;

    const command = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ id }),
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: marshall(expressionAttributeValues),
      ReturnValues: 'ALL_NEW',
    });

    const response = await dynamoClient.send(command);

    if (!response.Attributes) {
      return null;
    }

    return unmarshall(response.Attributes) as Customer;
  }

  /**
   * Remove um cliente pelo ID
   */
  static async deleteCustomer(id: string): Promise<void> {
    const command = new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ id }),
    });

    await dynamoClient.send(command);
  }

  /**
   * Lista todos os clientes
   */
  static async listCustomers(): Promise<Customer[]> {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const response = await dynamoClient.send(command);
    return response.Items?.map((item) => unmarshall(item) as Customer) || [];
  }
}
