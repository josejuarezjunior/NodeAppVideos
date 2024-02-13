// // ---- Sem o micro framework fastify
// import { createServer } from 'node:http';

// const server = createServer((request, response) => {
//     response.write('Hello man!');

//     return response.end();
// })

// server.listen(3333);

import { fastify } from 'fastify';
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
// const database = new DatabaseMemory();
const database = new DatabasePostgres();

// O padrão do Fastify é usar request e reply,
// porém pode ser usando request e response, sem problema algum.
server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration
    });

    return reply.status(201).send(); // 201 - Created
});

server.get('/videos', async (request) => {
    const search = request.query.search;

    const videos = await database.list(search);

    console.log(videos);

    return videos;
});

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    database.update(videoId, {
        title,
        description,
        duration
    });

    return reply.status(204).send(); // 204 - Resposta de sucesso sem conteúdo na resposta.
});

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;

    database.delete(videoId);

    return reply.status(204).send();
})

server.listen({
    port: 3333
});