import { createServer } from 'http';

import { WebSocketServer } from 'ws';

import { WEBSOCKET_ERROR_CODE } from '../shared/_types/error';

import { calculateEquipmentController } from './equipment-calculation';

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        calculateEquipmentController(message)
            .catch((error) => ws.close(WEBSOCKET_ERROR_CODE, JSON.stringify(error)))
            .then((set) => ws.send(JSON.stringify(set)));
    });
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
        wss.emit('connection', socket, request);
    });
});
server.listen(process.env['PORT'] || 3000);
