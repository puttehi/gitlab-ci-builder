import { Fragment, useCallback, useState } from "react"
import { JobConfig } from "../../GitLabCI"
import { Connection, Handle, OnConnect, Position } from "reactflow"

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

export type JobData = {
    jobName?: string
    initialConfig?: JobConfig
}

export default function Job({ data }: { data: JobData }) {
    const [config, setConfig] = useState<JobConfig>(data.initialConfig ?? {});

    const onConnectTarget: OnConnect = useCallback((connection: Connection) => {
        console.log("New target connection", connection)
    }, []);

    const onConnectSource: OnConnect = useCallback((connection: Connection) => {
        console.log("New source connection", connection)
    }, []);

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: "center" }}>{data.jobName ?? "Anonymous job"}</div>
            <div style={gridStyle}>
            </div>
            <Handle type="target" position={Position.Left} id="left" onConnect={onConnectTarget} />
            <Handle type="source" position={Position.Right} id="right" onConnect={onConnectSource} />
        </div>
    );
}
