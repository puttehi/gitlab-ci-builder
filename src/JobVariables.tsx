import { IJobData } from './JobNode'
import { Variable } from './GitLabCI'

export class JobVariables implements IJobData {
    private variables: Variable[]
    constructor(variables: Variable[]) {
        this.variables = variables
    }

    public JSXRepr(): any {
        return this.variables.map(variable => (
            <>
                <label htmlFor={variable.key} style={{ marginLeft: "5%" }}>{variable.key}: </label>
                <input id={variable.key} name={variable.key} onChange={onInputChange} className="nodrag" value={variable.value} />
            </>
        ))
    }
}
