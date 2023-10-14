import { Label } from "./Label"

/* LabeledToggle.tsx */
export type LabeledToggleProps = {
    label?: string,
    marginLeft?: string,
    checked?: boolean,
    onCheckedChanged?: (newValue: boolean) => void
}

export function LabeledToggle(props: LabeledToggleProps) {
    const label = props.label ?? ""
    let checked = props.checked ?? false

    return (
        <div style={{
            display: "flex",
            flexFlow: "row nowrap",
            marginLeft: "5%"
        }}>
            <Label label={label} />
            <input
                style={{
                    flex: 1,
                    maxWidth: "50%",
                    alignSelf: "center",
                    maxHeight: "30px",
                }}
                id={label}
                name={label}
                className="nodrag"
                type="checkbox"
                checked={checked}
                onChange={() => props.onCheckedChanged ? props.onCheckedChanged(!checked) : null} />
        </div >
    )
}
