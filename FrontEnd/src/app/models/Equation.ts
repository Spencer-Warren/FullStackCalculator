import { e } from "mathjs";

export class Equation {
    private equationID: number = 0;
    private equationString: string = '';
    private solution: string = '';

    constructor(equationID: number, equationString: string, solution: string, userID?: number) {
        this.equationID = equationID;
        this.equationString = equationString;
        this.solution = solution;
    }

    get EquationID(): number {
        return this.equationID;
    }

    get EquationString(): string {
        return this.equationString;
    }

    get Solution(): string {
        return this.solution;
    }

    static fromJSON(json: any): Equation {
        return new Equation(json.equationID, json.equationString, json.solution);
    }
    
}