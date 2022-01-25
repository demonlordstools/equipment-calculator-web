import express from 'express';

import { calculateEquipmentController } from './equipment-calculation';

const app = express();
// @ts-ignore
const port = process.env.PORT || 3000;

// serves the angular frontend
app.use('/', express.static('dist/dl-equipment-calculator-web/'));

// api
app.get('/equipment', calculateEquipmentController);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
