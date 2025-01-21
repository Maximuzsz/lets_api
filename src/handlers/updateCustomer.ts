import { APIGatewayProxyHandler } from 'aws-lambda';
import { CustomerService } from '../services/customerService';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {};
    const updates = JSON.parse(event.body || '{}');

    if (!id || Object.keys(updates).length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'ID e dados do cliente são obrigatórios.' }),
      };
    }

    const updatedCustomer = await CustomerService.updateCustomer(id, updates);

    if (!updatedCustomer) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Cliente não encontrado.' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Cliente atualizado com sucesso!', customer: updatedCustomer }),
    };
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno no servidor.' }),
    };
  }
};
