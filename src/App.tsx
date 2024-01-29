import ReactFlow, {
    FitViewOptions,
    Controls,
    MiniMap,
    Background,
    BackgroundVariant,
    DefaultEdgeOptions,
    NodeTypes,
    Edge
} from 'reactflow';
import { shallow } from 'zustand/shallow';
import 'reactflow/dist/style.css';

import JobNode from './JobNode';
import UIDemoNode from './UIDemoNode'
import { useFlowState, RFState, /* useArrowHandleStore, ArrowHandleStore */ } from './useStore';
import { useEffect } from 'react';

const fitViewOptions: FitViewOptions = {
    padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
};

const nodeTypes: NodeTypes = {
    jobNode: JobNode,
    uiDemoNode: UIDemoNode
}

const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    edgeUpdateSuccessful: state.edgeUpdateSuccessful,
    onEdgeUpdate: state.onEdgeUpdate,
    onEdgesChangeStart: state.onEdgesChangeStart,
    onEdgesChangeEnd: state.onEdgesChangeEnd,
    onConnect: state.onConnect,
});

export default function App() {
    /*Delete edge drop example */
    /* const edgeUpdateSuccessful = useRef(true);
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }

        edgeUpdateSuccessful.current = true;
    }, []); */
    // const { nodes, edges, edgeUpdateSuccessful, onNodesChange, onEdgesChange, onEdgesChangeStart, onEdgeUpdate, onEdgesChangeEnd, onConnect } = useFlowState(selector, shallow);
    const { nodes, edges, /*edgeUpdateSuccessful,*/
        onNodesChange, onEdgesChange,
        onEdgesChangeStart, onEdgeUpdate, onEdgesChangeEnd,
        onConnect } = useFlowState(selector, shallow)


    /* useEffect(() => {
        const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];
        useFlowState.setState((s) => { return { ...s, edges: initialEdges } })
        return () => {
        }
    }, []) */
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={nodeTypes}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgesChangeStart}
                onEdgeUpdateEnd={onEdgesChangeEnd}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
