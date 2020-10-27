import React from 'react';

const Course = ({course}) => {
    return (
     <div>
       {course.map(one => 
       <div key={one.id}> <h3>{one.name}</h3>
         {one.parts.map(two => 
         <div key = {two.id}>
           {two.name} {two.exercises} 
          </div>)}
          <div> Total of {one.parts.reduce((last, current) => last + current.exercises, 0)} exercises </div>
        </div>)}
        
     </div>
    ) 
  }

  export default Course