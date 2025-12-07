import { Controller, Get } from '@nestjs/common';

/**
 * App Controller
 * Root controller for general application endpoints
 */
@Controller()
export class AppController {
  /**
   * API status endpoint
   * GET /
   * @returns API information and available endpoints
   */
  @Get()
  getStatus() {
    return {
      message: 'Nest.js API is running',
      version: '1.0.0',
      endpoints: {
        auth: {
          register: 'POST /auth/register',
          login: 'POST /auth/login',
        },
        items: {
          create: 'POST /items',
          findAll: 'GET /items',
          findOne: 'GET /items/:id',
          update: 'PATCH /items/:id',
          delete: 'DELETE /items/:id',
        },
      },
    };
  }
}
