import { CSSProperties } from "react"
import { TextStyleProperties, computeCentered, computeFontSize } from "./Text"

/* Label.tsx */
export type LabelProps = {
    label?: string,
    style?: CSSProperties
} & TextStyleProperties

export function Label(props: LabelProps) {
    const label = props.label ?? ""
    return (
        <label
            htmlFor={label}
            style={props.style ?
                {
                    ...props.style,
                    fontSize: computeFontSize(props),
                    textAlign: computeCentered(props)
                }
                : {
                    flex: 1,
                }}>
            {label}:
        </label>
    )
}
