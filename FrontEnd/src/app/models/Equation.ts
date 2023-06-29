import { e } from "mathjs";

export class Equation {
    private equationID: number | undefined;
    private equationString: string = '';
    private solution: string = '';

    constructor(equationString: string, solution: string, equationID?: number,  userID?: number) {
        if (equationID) this.equationID = equationID;
        this.equationString = equationString;
        this.solution = solution;
    }

    get EquationID(): number {
        if (this.equationID) return this.equationID;
        return -1;
    }

    get EquationString(): string {
        return this.equationString;
    }

    get Solution(): string {
        return this.solution;
    }

    static fromJSON(json: any): Equation {
        return new Equation(json.equationString, json.solution, json.equationID);
    }

    static fromFront(equation: string, solution: string) {
        return new Equation(equation, solution);
    }
    
}