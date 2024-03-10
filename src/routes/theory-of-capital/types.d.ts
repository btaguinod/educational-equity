export interface CardInfo {
    id: string,
    title: string,
    description: string,
    examples: string,
    position: Position
}

export interface ArrowInfo {
    id: string,
    from: string,
    to: string,
    example: string
}

export interface Position {
    x: number,
    y: number
}