import { v4 as uuidv4 } from "uuid"
import { createWithEqualityFn } from 'zustand/traditional';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    // ReactFlow,
    // ReactFlowActions,
    HandleType,
    OnEdgeUpdateFunc,
} from 'reactflow';
import { useMemo } from "react";
import { shallow } from "zustand/shallow";

const initialNodes: Node[] = [
    /* {
        id: '1', data: {
            jobName: "Some job", initialConfig: {
                variables: [{ key: "VAR_1", value: "example_value" }, { key: "VAR_2", value: "example_value 2" }],
            }
        }, position: { x: 0, y: 0 }, type: 'jobNode'
    },
    {
        id: '2', data: {
            jobName: "Some other job", initialConfig: {
                variables: [{ key: "VAR_1", value: "example_value" }, { key: "VAR_2", value: "example_value 2" }],
                needs: [{ job: "Some job", optional: false }]
            }
        }, position: { x: 600, y: 0 }, type: 'jobNode'
    }, */
    {
        id: "1",
        data: {},
        position: { x: -400, y: 0 },
        type: 'uiDemoNode'
    },
    {
        id: "2",
        data: {},
        position: { x: 400, y: 0 },
        type: 'uiDemoNode'
    }
];

// const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

export type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    edgeUpdateSuccessful: boolean;
    onEdgeUpdate: OnEdgeUpdateFunc;
    onEdgesChangeStart: (mouseEvent: React.MouseEvent<Element, MouseEvent>, edge: Edge, handleType: HandleType) => void;
    onEdgesChangeEnd: (event: MouseEvent | TouchEvent, edge: Edge<any>, handleType: HandleType) => void
    onConnect: OnConnect;
    arrowHandles: Map<UUIDv4, IsConnected>,
    isConnected: (id: UUIDv4) => boolean,
    hookDisconnect: <T>(hookedFn: T, id: string) => T,
    disconnect: (id: UUIDv4) => void
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useFlowState = createWithEqualityFn<RFState>((set, get) => {
    /*init func*/

    return {
        nodes: initialNodes,
        edges: [],//initialEdges,
        edgeUpdateSuccessful: false,

        onNodesChange: (changes: NodeChange[]) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
            console.log("change nodes")
            console.log(get().edges)
        },
        onEdgesChange: (changes: EdgeChange[]) => {
            set({
                edges: applyEdgeChanges(changes, get().edges)
            });
            console.log("change edges")
        },

        // Start dragging
        onEdgesChangeStart: (mouseEvent: React.MouseEvent<Element, MouseEvent>, edge: Edge, handleType: HandleType) => {
            set({
                edgeUpdateSuccessful: false
            })
            console.log("start edgeschange")
        },

        // ??
        onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => {
            set({
                edgeUpdateSuccessful: true
            })
            console.log("update edge")
            //setEdges((els) => updateEdge(oldEdge, newConnection, els));
        },

        // Letting go, failed or successful
        onEdgesChangeEnd: (event: MouseEvent | TouchEvent, edge: Edge<any>, handleType: HandleType) => {
            const state = get()
            if (!state.edgeUpdateSuccessful) {
                // console.log(state.edges)
                if (edge.sourceHandle) {
                    //state.disconnect(edge.sourceHandle)
                    const handles = state.arrowHandles.set(edge.sourceHandle, false)
                    set(() => ({
                        arrowHandles: handles
                    }))
                    console.log(`Disc, Set handles:\n
                       ${edge.sourceHandle}: ${handles.get(edge.sourceHandle)}\n`)
                }
                if (edge.targetHandle) {
                    //state.disconnect(edge.sourceHandle)
                    const handles = state.arrowHandles.set(edge.targetHandle, false)
                    set(() => ({
                        arrowHandles: handles
                    }))
                    console.log(`Disc, Set handles:\n
                       ${edge.targetHandle}: ${handles.get(edge.targetHandle)}\n`)
                }
                //state.disconnect(edge.targetHandle)
                set({
                    edges: state.edges.filter((e) => {
                        return e.id !== edge.id
                    })
                })
                console.log(state.edges)
                //setEdges((eds) => eds.filter((e) => e.id !== edge.id));
            }
            console.log("end edgeschange")
        },

        // Is source -> target, not necessarily new
        onConnect: (connection: Connection) => {
            let handles = get().arrowHandles

            const source = connection.sourceHandle ?? uuidv4()
            const target = connection.targetHandle ?? uuidv4()

            handles = handles.set(source, true)
            handles = handles.set(target, true)

            set(() => ({
                edges: addEdge(connection, get().edges),
                arrowHandles: handles
            }))

            console.log(`Conn, Set handles:\n
            ${source}: ${handles.get(source) ?? "not found"}\n
            ${target}: ${handles.get(target) ?? "not found"}`)
        },

        arrowHandles: new Map(),
        isConnected: (id) => {
            const isConnected = get().arrowHandles.get(id) ?? false
            // console.log("isConnected?", id, isConnected)
            return isConnected
        },
        hookDisconnect: (hookedFn, id) => {
            get().disconnect(id)
            return hookedFn
        },
        disconnect: (id: UUIDv4) => {
            let handles = get().arrowHandles
            handles = handles.set(id, false)
            set(() => ({
                arrowHandles: handles
            }))
            console.log(`Disc, Set handles:\n
            ${id}: ${handles.get(id)}\n`)
        }
    }
});

export type UUIDv4 = string
export type IsConnected = boolean
/* export type ArrowHandleStore = {
    arrowHandles: Map<UUIDv4, IsConnected>,
    isConnected: (id: UUIDv4) => boolean,
    onConnect: (connection: Connection) => void,
    hookDisconnect: <T>(hookedFn: T, id: string) => T,
    disconnect: (id: UUIDv4) => void
}

export const useArrowHandleStore = createWithEqualityFn<ArrowHandleStore>((set, get) => {
    return {
        arrowHandles: new Map(),
        isConnected: (id) => {
            const isConnected = get().arrowHandles.get(id) ?? false
            console.log("isConnected?", id, isConnected)
            return isConnected
        },
        onConnect: (connection) => {
            let handles = get().arrowHandles

            const source = connection.sourceHandle ?? uuidv4()
            const target = connection.targetHandle ?? uuidv4()

            handles = handles.set(source, true)
            handles = handles.set(target, true)

            set(() => ({
                arrowHandles: handles
            }))

            console.log(`Conn, Set handles:\n
            ${handles.get(source)}\n
            ${handles.get(source)}`)
        },
        hookDisconnect: (hookedFn, id) => {
            get().disconnect(id)
            return hookedFn
        },
        disconnect: (id: UUIDv4) => {
            const handles = get().arrowHandles
            handles.set(id, false)
            set(() => ({
                arrowHandles: handles
            }))
            console.log(`Disc, Set handles:\n
            ${id}: ${handles.get(id)}\n`)
        }
    }
}) */
