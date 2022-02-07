import express from 'express';
import { WebSocket } from 'ws';

import { WEBSOCKET_ERROR_CODE } from '../shared/_types/error';

import { calculateEquipmentController } from './equipment-calculation';

const app = express();
// @ts-ignore
const port: number = process.env.PORT || 3000;

// serves the angular frontend
app.use('/', express.static('dist/dl-equipment-calculator-web/'));

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        calculateEquipmentController(message)
            .catch((error) => ws.close(WEBSOCKET_ERROR_CODE, JSON.stringify(error)))
            .then((set) => ws.send(JSON.stringify(set)));
    });
});

const server = app.listen(port);
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
        wss.emit('connection', socket, request);
    });
});
