import { CSSProperties } from "react"

export type TextStyleProperties = {
    h1?: boolean,
    h2?: boolean,
    h3?: boolean,
    h4?: boolean,
    center?: boolean,
    pretty?: boolean,
    charsPerLine?: number,
}

export type TextProps = {
    text: string,
    style?: CSSProperties,
} & TextStyleProperties

export const computeFontSize = (props: TextStyleProperties) => {
    let fontSize = "14px"
    if (props.h1) fontSize = "24px"
    if (props.h2) fontSize = "20px"
    if (props.h3) fontSize = "18px"
    if (props.h4) fontSize = "16px"
    return fontSize
}

export const computeCentered = (props: TextStyleProperties) => {
    return props.center ? "center" : undefined
}

export const computePretty = (props: TextStyleProperties) => {
    return props.pretty ? "pre-line" : undefined
}

export const computeWrappedText = (text: string, charsPerLine?: number) => {
    if (!charsPerLine) return text

    let wrapped = ""
    let currentLineLen = 0
    for (let i = 0; i < text.length; i++) {
        wrapped += text[i]
        currentLineLen += 1

        if (text[i] === "\n") {
            currentLineLen = 0
            continue
        }

        if (currentLineLen >= charsPerLine) {
            wrapped += "\n"
            currentLineLen = 0
        }
    }
    return wrapped
}

export function Text(props: TextProps) {
    let text = ""
    if (props.text) {
        text = props.pretty ? computeWrappedText(props.text, props.charsPerLine) : props.text
    }

    let style = props.style
    if (!props.pretty && props.charsPerLine) {
        style = { ...style, width: `${props.charsPerLine}ex` }
    }

    return (
        <div style={{
            ...style,
            textAlign: computeCentered(props),
            fontSize: computeFontSize(props),
            whiteSpace: computePretty(props)
        }}>
            {text}
        </div >
    )
}
