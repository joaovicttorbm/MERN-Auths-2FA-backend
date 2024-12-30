import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from './app.config';

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API for user authentication, sessions, and MFA.',
      contact: {
        name: 'João Matos',
        url: 'https://www.linkedin.com/in/joao-victtor-dev/',
        email: 'joaovicttorbispo@gmail.com',
      },
    },
    servers: [
      {
        url: config.BASE_PATH,
        description: 'API DEV',
      },
    ],
  },
  apis: ['./src/modules/**/*.ts', './src/common/**/*.ts'], // Caminho para os arquivos de rota
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
