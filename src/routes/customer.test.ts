// src/routes/customer.test.ts
import request from 'supertest';
import app from '../app';

describe('Customer CRUD Operations', () => {
  let customerId: string;

  it('should create a customer', async () => {
    const response = await request(app)
        .post('/customers')
        .send({name: 'John Doe', email: 'john@example.com', phoneNumber: '1234567890'});

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    customerId = response.body._id;
  });

  it('should get all customers', async () => {
    const response = await request(app).get('/customers');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a customer by ID', async () => {
    const response = await request(app).get(`/customers/${customerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', customerId);
  });

});
