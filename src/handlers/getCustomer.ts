import { APIGatewayProxyHandler } from 'aws-lambda';
import { CustomerService } from '../services/customerService';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'ID do cliente é obrigatório.' }),
      };
    }

    const customer = await CustomerService.getCustomerById(id);

    if (!customer) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Cliente não encontrado.' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(customer),
    };
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno no servidor.' }),
    };
  }
};
