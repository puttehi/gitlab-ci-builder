import { CSSProperties } from "react"
import { Label } from "./Label"

export type LabeledInputProps = {
    label?: string,
    marginLeft?: string,
    value?: string,
    wrapperStyle?: CSSProperties,
    inputStyle?: CSSProperties,
    onInputChanged?: (newValue: string) => void
}

export function LabeledInput(props: LabeledInputProps) {
    const label = props.label ?? ""
    return (
        <div style={props.wrapperStyle ?? {
            display: "flex",
            flexFlow: "row nowrap",
            marginLeft: "5%"
        }}>
            <Label label={label} />
            <input
                style={props.inputStyle ?? {
                    flex: 1,
                    maxWidth: "50%",
                    alignSelf: "center",
                    maxHeight: "30px",
                }}
                id={label}
                name={label}
                className="nodrag"
                value={props.value}
                onChange={(e: any) => props.onInputChanged ? props.onInputChanged(e.target.value) : null} />
        </div >
    )
}
