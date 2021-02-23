
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

interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

interface CoursePartBaseTwo extends CoursePartBase {
    description: string; 
}
  
  interface CoursePartOne extends CoursePartBaseTwo {
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartBaseTwo {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  interface CoursePartFour extends CoursePartBaseTwo {
      name: "Testing is fun";
      newField: string
  }

  export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
