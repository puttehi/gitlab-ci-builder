import useVariables from "./useVariables";
import { JobConfig } from "../../../../GitLabCI"

export default function Variables({ data }: { data: JobConfig["variables"] }) {
    const [variables, setVariableByKey] = useVariables(data)

    return (
        <>
            <label htmlFor="variables" >variables: </label>
            <div /> {/* Grid filler */}
            {[...variables.keys()].map(key => {
                const value = variables[key]
                return (
                    <>
                        <label htmlFor={key} style={{ marginLeft: "5%" }}>{key}: </label>
                        <input id={key} name={key} className="nodrag" value={value} onChange={(e: any) => setVariableByKey(key, e.target.value)} />
                    </>
                )
            })
            }
        </>
    )
}
