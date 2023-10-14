import { useCallback, Fragment, useState } from 'react';
import { Connection, Handle, OnConnect, Position } from 'reactflow';
import { JobKeywordTopLevel, defaultKeywordValue, JobConfig, Variable, Need } from './GitLabCI';
import Variables from './Nodes/Job/ConfigEntry/Variants/Variables';

export type JobNodeData = {
    jobName?: string
    initialConfig?: JobConfig
}

const containerStyle = {
    padding: "10px",
    borderRadius: "3px",
    borderWidth: "1px",
    borderStyle: "solid",
    //width: "150px",
    //fontSize: "12px",
    backgroundColor: "black"
}

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto",
}

export interface IJobData {
    JSXRepr(): any
}

export default function JobNode({ data }: { data: JobNodeData }) {
    /* State */
    const [config, setConfig] = useState<JobConfig>(data.initialConfig ?? {});

    /* Methods */
    const onInputChange = useCallback((evt: any) => {
        console.log(evt.target.value);
    }, []);

    const onConnectTarget: OnConnect = useCallback((connection: Connection) => {
        console.log("New target connection", connection)
    }, []);

    const onConnectSource: OnConnect = useCallback((connection: Connection) => {
        console.log("New source connection", connection)
    }, []);

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: "center" }}>{data.jobName ?? "A job"}</div>
            <div style={gridStyle}>
                {/* {Object.entries(config).map(([keyword, value], index) => (
                    <Fragment key={`${keyword}-${index}`}>
                        {getConfigRepr(keyword as keyof JobConfig, value, index)}
                    </Fragment>
                ))}*/}
                <Variables data={config.variables}/>
                </div>
            <Handle type="target" position={Position.Left} id="left" onConnect={onConnectTarget} />
            <Handle type="source" position={Position.Right} id="right" onConnect={onConnectSource} />
        </div>
    );
}
