
export interface HeaderProps {
    courseName: string
}

type courseParts = {
    name: string,
    exerciseCount: number
}

export interface ContentProps {
    courseParts: Array<courseParts>
}