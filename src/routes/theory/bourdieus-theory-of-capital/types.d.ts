export interface RawCardInfo {
    id: string,
    title: string,
    description: string,
    examples: string,
}

export interface CardInfo {
    title: string,
    description: string,
    examples: string,
}

export interface RawArrowInfo {
    from: string,
    to: string,
    example: string
}

export interface ArrowInfo {
    fromCardIndex: number,
    toCardIndex: number,
    example: string
}

export interface Position {
    x: number,
    y: number
}