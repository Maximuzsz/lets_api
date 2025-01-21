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

    await CustomerService.deleteCustomer(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Cliente removido com sucesso!' }),
    };
  } catch (error) {
    console.error('Erro ao remover cliente:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno no servidor.' }),
    };
  }
};
