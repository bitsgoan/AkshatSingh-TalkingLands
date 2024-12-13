// First install these packages:
// npm install swagger-ui-express swagger-jsdoc

const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "US Spatial API Documentation",
      version: "1.0.0",
      description: "API documentation for US Spatial data points and locations",
      contact: {
        name: "API Support",
        url: "http://localhost:5001",
      },
    },
    servers: [
      {
        url: "http://localhost:5001/api",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Point: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the event or location",
            },
            description: {
              type: "string",
              description: "Description of the event or location",
            },
            eventTime: {
              type: "string",
              description: "Time of the event",
            },
            price: {
              type: "number",
              description: "Price of the event",
            },
            location: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["Point"],
                },
                coordinates: {
                  type: "array",
                  items: {
                    type: "number",
                  },
                  minItems: 2,
                  maxItems: 2,
                },
              },
            },
            address: {
              type: "string",
              description: "Physical address of the location",
            },
          },
        },
      },
    },
    paths: {
      "/points": {
        get: {
          tags: ["Points"],
          summary: "Get all points",
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Point",
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Points"],
          summary: "Create a new point",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "longitude", "latitude"],
                  properties: {
                    name: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    eventTime: {
                      type: "string",
                    },
                    price: {
                      type: "number",
                    },
                    longitude: {
                      type: "number",
                    },
                    latitude: {
                      type: "number",
                    },
                    address: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Point created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Point",
                  },
                },
              },
            },
          },
        },
      },
      "/points/id/{id}": {
        get: {
          tags: ["Points"],
          summary: "Get point by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "Point ID",
            },
          ],
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Point",
                  },
                },
              },
            },
            404: {
              description: "Point not found",
            },
          },
        },
      },
      "/points/name/{name}": {
        get: {
          tags: ["Points"],
          summary: "Get point by name",
          parameters: [
            {
              name: "name",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "Point name",
            },
          ],
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Point",
                  },
                },
              },
            },
            404: {
              description: "Point not found",
            },
          },
        },
      },
      "/points/{id}": {
        put: {
          tags: ["Points"],
          summary: "Update point by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "Point ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    eventTime: {
                      type: "string",
                    },
                    price: {
                      type: "number",
                    },
                    longitude: {
                      type: "number",
                    },
                    latitude: {
                      type: "number",
                    },
                    address: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Point updated successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Point",
                  },
                },
              },
            },
            404: {
              description: "Point not found",
            },
          },
        },
      },
      "/points/within": {
        get: {
          tags: ["Points"],
          summary: "Find points within radius",
          parameters: [
            {
              name: "longitude",
              in: "query",
              required: true,
              schema: {
                type: "number",
              },
              description: "Center point longitude",
            },
            {
              name: "latitude",
              in: "query",
              required: true,
              schema: {
                type: "number",
              },
              description: "Center point latitude",
            },
            {
              name: "radiusInMiles",
              in: "query",
              required: true,
              schema: {
                type: "number",
              },
              description: "Search radius in miles",
            },
          ],
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Point",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const specs = swaggerJsdoc(options);
