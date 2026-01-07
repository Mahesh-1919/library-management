import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nalanda Library Management API",
      version: "1.0.0",
      description: "Backend APIs for Nalanda Library System"
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/routes/*.js"] // auto-scan route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
