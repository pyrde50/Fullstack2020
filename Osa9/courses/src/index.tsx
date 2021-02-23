import React from "react";
import ReactDOM from "react-dom";
import { HeaderProps, ContentProps, CoursePart } from './types'

const App: React.FC = () => {

  const Header: React.FC<HeaderProps> = (props) => { 
    return (
      <h1>{props.courseName}</h1>
    )
  }

  const Count: React.FC<ContentProps> = (props) => {
    return (
      <>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
      </>
    )
  }

  const Content: React.FC<{ courseParts: CoursePart[] }> = ({courseParts}) => {
    return (
      <div>
      {courseParts.map((value: CoursePart) => <Part key={value.name} part={value}/>)}
      </div>
    );
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part: React.FC<{part: CoursePart}> = ({part}) => {
      switch (part.name) {
        case 'Fundamentals':
            return (<div>{part.name} {part.exerciseCount} description: {part.description} </div>)
        case 'Using props to pass data':
          return (<div>{part.name} {part.exerciseCount} groupProjectCount: {part.groupProjectCount} </div>)
        case 'Deeper type usage':
          return (<div>{part.name} {part.exerciseCount} description: {part.description} exerciseSubmissionLink: {part.exerciseSubmissionLink} </div>)
        case 'Testing is fun':
          return (<div>{part.name} {part.exerciseCount} description: {part.description} newField: {part.newField}  </div>)
        default:
          return assertNever(part);
      }
  }
  const courseName = "Half Stack application development";

  
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }, 
    {
      name: "Testing is fun",
      exerciseCount: 14,
      description: "Let's try this",
      newField: 'testeri',
    }
     

  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Count courseParts={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));