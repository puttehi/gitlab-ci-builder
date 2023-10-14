
import { useState } from "react"
import { Connection, OnConnect } from "reactflow"

function useConnect(initialValue: boolean): [boolean, OnConnect] {
    const [connected, setConnected] = useState(initialValue)

    // ... handle remove
    //
    // ... handle add

    const onConnect: OnConnect = (connection: Connection) => {
        setConnected(!connected)
        //connection.targetHandle
        //TODO
    }

    return [connected, onConnect]
}

export default useConnect
