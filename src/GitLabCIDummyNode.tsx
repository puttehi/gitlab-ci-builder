import { v4 as uuidv4 } from 'uuid'
import { useEffect, useMemo, useState } from 'react';
import { Edge, Handle, Position } from 'reactflow';
import { Text } from './UI/Text';
import { Label } from './UI/Label';
import { LabeledInput } from './UI/LabeledInput';
import { LabeledToggle } from './UI/LabeledToggle';
import { ArrowHandle } from './UI/ArrowHandle';
import { useFlowState } from './useStore';
import { shallow } from 'zustand/shallow';

const containerStyle = {
    padding: "10px",
    borderRadius: "3px",
    borderWidth: "1px",
    borderStyle: "solid",
    backgroundColor: "black",
}

const demoStyle = {
    borderWidth: "1px",
    borderRadius: "1px",
    borderStyle: "solid",
    borderColor: "grey",
    marginTop: "5px",
    marginBottom: "5px"
}

export default function UIDemoNode() {
    const [inputValue, setInputValue] = useState("gief input")
    const [checked, setChecked] = useState(false)
    const edges = useFlowState((s) => (s.edges), shallow) // Have to use this to trigger re-renders on connections..
    const isConnected = useFlowState((s) => (s.isConnected), shallow)
    const sourceHandleId = useMemo(() => uuidv4(), [])
    const targetHandleId = useMemo(() => uuidv4(), [])
    const isSourceConnected = isConnected(sourceHandleId)
    const isTargetConnected = isConnected(targetHandleId)

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: "center" }}>UI Components Demo</div>
            <div style={demoStyle}>
                <Text text="# Base building blocks" h1={true} />
            </div>
            <div style={demoStyle}>
                <Text text="## Text component" h2={true} />
            </div>
            <div style={demoStyle}>
                <Text text="### Text component" h3={true} />
            </div>
            <div style={demoStyle}>
                <Text text="#### Text component" h4={true} />
            </div>
            <div style={demoStyle}>
                <Text text="Looooooooooooooooog text component" />
            </div>
            <div style={demoStyle}>
                <Label label="Variables" />
            </div>
            <div style={demoStyle}>
                <LabeledInput label="" onInputChanged={setInputValue} value={inputValue} />
            </div>
            <div style={demoStyle}>
                <LabeledInput label="" onInputChanged={setInputValue} value={inputValue} />
            </div>
            <div style={demoStyle}>
                <Text text={`Input is: ${inputValue}`} />
            </div>
            <div style={demoStyle}>
                <LabeledToggle label="Labeled toggle" onCheckedChanged={setChecked} checked={checked} />
            </div>
            <div style={demoStyle}>
                <LabeledToggle label="Looooooooooooooooog labeled toggle" onCheckedChanged={setChecked} checked={checked} />
            </div>
            <div style={demoStyle}>
                <Text text="Normal paragraph: (60 chars per line)" h3={true} />
            </div>
            <div style={demoStyle}>
                <Text text="Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
                Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia.


                Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod.

                Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis." charsPerLine={60} />
            </div>
            <div style={demoStyle}>
                <Text text="Pretty paragraph (80 chars per line):" h3={true} />
            </div>
            <div style={demoStyle}>
                <Text text="Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
                Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia.


                Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod.

                Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis." pretty={true} charsPerLine={80} />
            </div>
            <ArrowHandle dir="left" id={sourceHandleId} connected={isSourceConnected} />
            <ArrowHandle dir="right" id={targetHandleId} connected={isTargetConnected} />
        </div>
    );
}
