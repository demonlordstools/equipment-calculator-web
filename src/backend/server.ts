import express, { Request } from 'express';
import { Element } from '../shared/_types/element';
import { calculateEquipment } from './equipment-calculation';

const app = express();
const port = 3000;

// serves the angular frontend
app.use('/', express.static('dist/dl-equipment-calculator-web/'));

// api
app.get('/equipment', (req, res) => {
    const carryWeight = intParameter(req, 'carryWeight');
    const element = elementParameter(req, 'element');
    const ranged = booleanParameter(req, 'ranged');
    const waffenschmiede = intParameter(req, 'waffenschmiede');
    const apWeight = intParameter(req, 'apWeight');
    const vpWeight = intParameter(req, 'vpWeight');
    const hpWeight = intParameter(req, 'hpWeight');
    const mpWeight = intParameter(req, 'mpWeight');
    const elementAttack = optionalElementParameter(req, 'elementAttack');
    const elementDefense = optionalElementParameter(req, 'elementDefense');

    calculateEquipment(
        carryWeight,
        element,
        ranged,
        waffenschmiede,
        apWeight,
        vpWeight,
        hpWeight,
        mpWeight,
        elementAttack,
        elementDefense
    )
        .then((set) => res.send(JSON.stringify(set)))
        .catch((error) => res.status(500).send(error));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function intParameter(request: Request, name: string): number {
    const param: string = request.query[name] as string;
    return Number.parseInt(param);
}

function elementParameter(request: Request, name: string): Element {
    const param: any = request.query[name];
    return !!param ? Element[param as keyof typeof Element] : Element.NONE;
}

function optionalElementParameter(request: Request, name: string): Element | undefined {
    const param: any = request.query[name];
    return !!param ? Element[param as keyof typeof Element] : undefined;
}

function booleanParameter(request: Request, name: string): boolean {
    const param: any = request.query[name];
    return param === 'true';
}
