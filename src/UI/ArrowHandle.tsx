import { CSSProperties, useCallback, useEffect, useMemo, useState } from "react"
import { Handle, HandleType, OnConnect, Position } from "reactflow"
// import useConnect from "./useConnect"
import { v4 as uuidv4 } from "uuid"
import { shallow } from "zustand/shallow"
import { /* ArrowHandleStore, useArrowHandleStore, */ RFState, useFlowState } from "../useStore"
// import { RFState, useFlowState } from "../useStore"
// import { shallow } from 'zustand/shallow';

const colorDisconnected = "#aabbbb"
const colorConnected = "#aaeeaa"

/* const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
}); */

export type ArrowHandleProps = {
    dir: "left" | "right",
    style?: CSSProperties,
    id?: string,
    connected: boolean,
}

const selector = (state: /*ArrowHandleStore*/ RFState) => ({
    isConnected: state.isConnected,
    onConnect: state.onConnect
})

export function ArrowHandle(props: ArrowHandleProps) {
    const position: Position = props.dir == "left" ? Position.Left : Position.Right
    const type: HandleType = props.dir == "left" ? "target" : "source"
    const color = props.connected ? colorConnected : colorDisconnected

    const borderVariant = props.dir == "left" ? {
        borderRight: `20px solid ${color}`,
        translate: "-90%",
    } : {
        borderLeft: `20px solid ${color}`,
        translate: "90%"
    }

    return (
        <Handle
            type={type}
            position={position}
            id={props.id}
            // onConnect={onConnect}
            isConnectableStart={!props.connected}
            isConnectableEnd={!props.connected}
            style={
                {
                    backgroundColor: "transparent",
                    height: 0,
                    width: 0,
                    borderRadius: "0%",
                    borderTop: "60px solid transparent",
                    borderBottom: "60px solid transparent",
                    ...borderVariant
                }} />
    )
}
