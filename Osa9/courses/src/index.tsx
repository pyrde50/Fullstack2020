import React from "react";
import ReactDOM from "react-dom";
import { HeaderProps, ContentProps } from './types'

const App: React.FC = () => {

  const Header: React.FC<HeaderProps> = (props) => { 
    return (
      <h1>{props.courseName}</h1>
    )
  }

  const Content: React.FC<ContentProps> = (props) => {
    return (
      <>
      <p>
        {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
      </p>
      <p>
        {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
      </p>
      <p>
        {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
      </p>
      </>
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
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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