import { APIGatewayProxyHandler } from 'aws-lambda';
import { CustomerService } from '../services/customerService';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const customer = await CustomerService.createCustomer(body);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Cliente criado com sucesso!', customer }),
    };
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno no servidor.' }),
    };
  }
};
