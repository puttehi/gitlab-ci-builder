import { useState } from "react";
import { JobConfig, Variables } from "../../../../GitLabCI"

const useVariables = (initialVariables?: JobConfig["variables"]) => {
    const [variables, setVariables] = useState<Variables>(initialVariables ?? new Map<string, string>());

    const setVariableByKey = (key: string, value: string) => {
        const copy: Variables = new Map(variables)
        copy.set(key, value)
        setVariables(copy);
    }

    return [
        variables,
        setVariableByKey,
    ];
};

export default useVariables
