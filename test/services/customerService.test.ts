import { CustomerService } from '../../src/services/customerService';
import { sendMock } from '../__mocks__/dynamoClient';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mocked-uuid'),
}));

describe('CustomerService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a customer', async () => {
    sendMock.mockResolvedValueOnce({});

    const data = {
      fullName: 'John Doe',
      birthDate: '1990-01-01',
      isActive: true,
      addresses: [],
      contacts: [],
    };

    const result = await CustomerService.createCustomer(data);

    expect(result).toEqual({ id: 'mocked-uuid', ...data });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('should get a customer by ID', async () => {
    sendMock.mockResolvedValueOnce({
      Item: {
        id: { S: 'mocked-uuid' },
        fullName: { S: 'John Doe' },
        birthDate: { S: '1990-01-01' },
      },
    });

    const result = await CustomerService.getCustomerById('mocked-uuid');

    expect(result).toEqual({
      id: 'mocked-uuid',
      fullName: 'John Doe',
      birthDate: '1990-01-01',
    });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('should return null if customer not found', async () => {
    sendMock.mockResolvedValueOnce({});

    const result = await CustomerService.getCustomerById('non-existent-id');
    expect(result).toBeNull();
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('should update a customer', async () => {
    sendMock.mockResolvedValueOnce({
      Attributes: {
        id: { S: 'mocked-uuid' },
        fullName: { S: 'John Doe Updated' },
      },
    });

    const result = await CustomerService.updateCustomer('mocked-uuid', {
      fullName: 'John Doe Updated',
    });

    expect(result).toEqual({
      id: 'mocked-uuid',
      fullName: 'John Doe Updated',
    });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('should delete a customer', async () => {
    sendMock.mockResolvedValueOnce({});

    await CustomerService.deleteCustomer('mocked-uuid');
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('should list customers', async () => {
    sendMock.mockResolvedValueOnce({
      Items: [
        {
          id: { S: 'mocked-uuid' },
          fullName: { S: 'John Doe' },
          birthDate: { S: '1990-01-01' },
        },
      ],
    });

    const result = await CustomerService.listCustomers();

    expect(result).toEqual([
      {
        id: 'mocked-uuid',
        fullName: 'John Doe',
        birthDate: '1990-01-01',
      },
    ]);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });
});
