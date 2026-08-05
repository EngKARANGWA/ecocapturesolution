"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openapiSpec = void 0;
const partner = {
    type: 'object',
    properties: {
        id: { type: 'string', example: '1735689600000' },
        name: { type: 'string', example: 'Tony Elumelu Foundation' },
        logo: { type: 'string', example: '/assets/partners/tef.png' },
        website: { type: 'string', example: 'https://tonyelumelufoundation.org' },
        type: { type: 'string', example: 'NGO & Donor' },
        status: { type: 'string', enum: ['active', 'inactive'] },
        createdAt: { type: 'string', format: 'date-time' },
    },
};
const partnerInput = {
    type: 'object',
    required: ['name', 'type'],
    properties: {
        name: { type: 'string' },
        logo: { type: 'string' },
        website: { type: 'string' },
        type: { type: 'string' },
        status: { type: 'string', enum: ['active', 'inactive'] },
    },
};
const opening = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        type: { type: 'string' },
        location: { type: 'string' },
        desc: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        status: { type: 'string', enum: ['open', 'closed'] },
        createdAt: { type: 'string', format: 'date-time' },
    },
};
const openingInput = {
    type: 'object',
    required: ['title', 'type', 'location'],
    properties: {
        title: { type: 'string' },
        type: { type: 'string' },
        location: { type: 'string' },
        desc: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        status: { type: 'string', enum: ['open', 'closed'] },
    },
};
const application = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        openingId: { type: 'string', nullable: true },
        openingTitle: { type: 'string', nullable: true, description: 'Resolved by matching the "Position Applied For" field to an opening title' },
        data: { type: 'object', description: 'Arbitrary form-field key/value pairs, e.g. "Full Name", "Email Address", "Position Applied For"' },
        status: { type: 'string', enum: ['new', 'reviewed', 'shortlisted', 'rejected'] },
        submittedAt: { type: 'string', format: 'date-time' },
    },
};
const inquiry = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        data: { type: 'object', description: 'Arbitrary form-field key/value pairs' },
        status: { type: 'string', enum: ['new', 'read', 'archived'] },
        submittedAt: { type: 'string', format: 'date-time' },
    },
};
const statusInput = {
    type: 'object',
    required: ['status'],
    properties: { status: { type: 'string' } },
};
const error = {
    type: 'object',
    properties: { error: { type: 'string' } },
};
const ok = {
    type: 'object',
    properties: { ok: { type: 'boolean', example: true } },
};
const bearerAuth = [{ bearerAuth: [] }];
exports.openapiSpec = {
    openapi: '3.0.3',
    info: {
        title: 'EcoCapture Solution API',
        version: '1.0.0',
        description: 'Backend API for EcoCapture Solution. Most write endpoints require a JWT — log in via `/api/auth/login`, then click "Authorize" and paste the returned token.',
    },
    servers: [
        { url: 'https://ecocapturesolution.onrender.com', description: 'Production (Render)' },
        { url: 'http://localhost:3001', description: 'Local dev' },
    ],
    components: {
        securitySchemes: {
            bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
        schemas: { Partner: partner, PartnerInput: partnerInput, Opening: opening, OpeningInput: openingInput, Application: application, Inquiry: inquiry, Error: error, Ok: ok },
        responses: {
            Unauthorized: { description: 'Missing or invalid token', content: { 'application/json': { schema: error } } },
            NotFound: { description: 'Resource not found', content: { 'application/json': { schema: error } } },
        },
    },
    tags: [
        { name: 'Auth' }, { name: 'Partners' }, { name: 'Openings' },
        { name: 'Applications' }, { name: 'Inquiries' }, { name: 'Forms' }, { name: 'Upload' },
    ],
    paths: {
        '/api/auth/login': {
            post: {
                tags: ['Auth'], summary: 'Log in as admin',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string' }, password: { type: 'string' } } } } },
                },
                responses: {
                    200: { description: 'Logged in', content: { 'application/json': { schema: { type: 'object', properties: { ok: { type: 'boolean' }, token: { type: 'string' } } } } } },
                    401: { description: 'Invalid credentials', content: { 'application/json': { schema: error } } },
                },
            },
        },
        '/api/auth/logout': {
            post: { tags: ['Auth'], summary: 'Log out (clears session cookie)', responses: { 200: { description: 'Logged out', content: { 'application/json': { schema: ok } } } } },
        },
        '/api/partners': {
            get: {
                tags: ['Partners'], summary: 'List all partners',
                responses: { 200: { description: 'Array of partners', content: { 'application/json': { schema: { type: 'array', items: partner } } } } },
            },
            post: {
                tags: ['Partners'], summary: 'Create a partner', security: bearerAuth,
                requestBody: { required: true, content: { 'application/json': { schema: partnerInput } } },
                responses: {
                    201: { description: 'Created', content: { 'application/json': { schema: partner } } },
                    401: { $ref: '#/components/responses/Unauthorized' },
                },
            },
        },
        '/api/partners/{id}': {
            put: {
                tags: ['Partners'], summary: 'Update a partner', security: bearerAuth,
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: { required: true, content: { 'application/json': { schema: partnerInput } } },
                responses: {
                    200: { description: 'Updated', content: { 'application/json': { schema: partner } } },
                    401: { $ref: '#/components/responses/Unauthorized' },
                    404: { $ref: '#/components/responses/NotFound' },
                },
            },
            delete: {
                tags: ['Partners'], summary: 'Delete a partner', security: bearerAuth,
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: {
                    200: { description: 'Deleted', content: { 'application/json': { schema: ok } } },
                    401: { $ref: '#/components/responses/Unauthorized' },
                    404: { $ref: '#/components/responses/NotFound' },
                },
            },
        },
        '/api/openings': {
            get: {
                tags: ['Openings'], summary: 'List all job openings',
                responses: { 200: { description: 'Array of openings', content: { 'application/json': { schema: { type: 'array', items: opening } } } } },
            },
            post: {
                tags: ['Openings'], summary: 'Create an opening', security: bearerAuth,
                requestBody: { required: true, content: { 'application/json': { schema: openingInput } } },
                responses: {
                    201: { description: 'Created', content: { 'application/json': { schema: opening } } },
                    401: { $ref: '#/components/responses/Unauthorized' },
                },
            },
        },
        '/api/openings/{id}': {
            put: {
                tags: ['Openings'], summary: 'Update an opening', security: bearerAuth,
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: { required: true, content: { 'application/json': { schema: openingInput } } },
                responses: {
                    200: { description: 'Updated', content: { 'application/json': { schema: opening } } },
                    401: { $ref: '#/components/responses/Unauthorized' },
                    404: { $ref: '#/components/responses/NotFound' },
                },
            },
            delete: {
                tags: ['Openings'], summary: 'Delete an opening', security: bearerAuth,
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: {
                    200: { description: 'Deleted', content: { 'application/json': { schema: ok } } },
                    401: { $ref: '#/components/responses/Unauthorized' },
                    404: { $ref: '#/components/responses/NotFound' },
                },
            },
        },
        '/api/applications': {
            post: {
                tags: ['Applications'], summary: 'Submit a job application (public)',
                requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', description: 'Arbitrary form-field key/value pairs. A "Position Applied For" field matching an opening title links the application to that opening.' } } } },
                responses: { 201: { description: 'Submitted', content: { 'application/json': { schema: ok } } }, 400: { description: 'No data provided', content: { 'application/json': { schema: error } } } },
            },
            get: {
                tags: ['Applications'], summary: 'List all applications', security: bearerAuth,
                parameters: [{ name: 'openingId', in: 'query', required: false, schema: { type: 'string' }, description: 'Filter to applications for a single opening' }],
                responses: { 200: { description: 'Array of applications', content: { 'application/json': { schema: { type: 'array', items: application } } } }, 401: { $ref: '#/components/responses/Unauthorized' } },
            },
        },
        '/api/applications/{id}': {
            patch: {
                tags: ['Applications'], summary: 'Update an application\'s status', security: bearerAuth,
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: { required: true, content: { 'application/json': { schema: statusInput } } },
                responses: {
                    200: { description: 'Updated', content: { 'application/json': { schema: ok } } },
                    401: { $ref: '#/components/responses/Unauthorized' },
                    404: { $ref: '#/components/responses/NotFound' },
                },
            },
            delete: {
                tags: ['Applications'], summary: 'Delete an application', security: bearerAuth,
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { 200: { description: 'Deleted', content: { 'application/json': { schema: ok } } }, 401: { $ref: '#/components/responses/Unauthorized' } },
            },
        },
        '/api/inquiries': {
            post: {
                tags: ['Inquiries'], summary: 'Submit a partnership inquiry (public)',
                requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', description: 'Arbitrary form-field key/value pairs' } } } },
                responses: { 201: { description: 'Submitted', content: { 'application/json': { schema: ok } } }, 400: { description: 'No data provided', content: { 'application/json': { schema: error } } } },
            },
            get: {
                tags: ['Inquiries'], summary: 'List all inquiries', security: bearerAuth,
                responses: { 200: { description: 'Array of inquiries', content: { 'application/json': { schema: { type: 'array', items: inquiry } } } }, 401: { $ref: '#/components/responses/Unauthorized' } },
            },
        },
        '/api/inquiries/{id}': {
            patch: {
                tags: ['Inquiries'], summary: 'Update an inquiry\'s status', security: bearerAuth,
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: { required: true, content: { 'application/json': { schema: statusInput } } },
                responses: {
                    200: { description: 'Updated', content: { 'application/json': { schema: ok } } },
                    401: { $ref: '#/components/responses/Unauthorized' },
                    404: { $ref: '#/components/responses/NotFound' },
                },
            },
            delete: {
                tags: ['Inquiries'], summary: 'Delete an inquiry', security: bearerAuth,
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { 200: { description: 'Deleted', content: { 'application/json': { schema: ok } } }, 401: { $ref: '#/components/responses/Unauthorized' } },
            },
        },
        '/api/forms/{key}': {
            get: {
                tags: ['Forms'], summary: 'Get a public form schema',
                parameters: [{ name: 'key', in: 'path', required: true, schema: { type: 'string', enum: ['careers', 'partners'] } }],
                responses: { 200: { description: 'Form schema' }, 404: { $ref: '#/components/responses/NotFound' } },
            },
            put: {
                tags: ['Forms'], summary: 'Replace a form schema', security: bearerAuth,
                parameters: [{ name: 'key', in: 'path', required: true, schema: { type: 'string', enum: ['careers', 'partners'] } }],
                requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
                responses: { 200: { description: 'Updated schema' }, 400: { description: 'Invalid form key', content: { 'application/json': { schema: error } } }, 401: { $ref: '#/components/responses/Unauthorized' } },
            },
        },
        '/api/upload': {
            post: {
                tags: ['Upload'], summary: 'Upload an image file (e.g. partner logo)', security: bearerAuth,
                requestBody: { required: true, content: { 'multipart/form-data': { schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } } } },
                responses: {
                    200: { description: 'Uploaded', content: { 'application/json': { schema: { type: 'object', properties: { url: { type: 'string', example: '/uploads/logo_123.png' } } } } } },
                    400: { description: 'No file uploaded / invalid type', content: { 'application/json': { schema: error } } },
                    401: { $ref: '#/components/responses/Unauthorized' },
                },
            },
        },
    },
};
