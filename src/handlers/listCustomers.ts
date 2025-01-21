import { APIGatewayProxyHandler } from 'aws-lambda';
import { CustomerService } from '../services/customerService';

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const customers = await CustomerService.listCustomers();

    return {
      statusCode: 200,
      body: JSON.stringify(customers),
    };
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno no servidor.' }),
    };
  }
};
