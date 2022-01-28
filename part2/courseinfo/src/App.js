import React from 'react'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      <Parts course={course} />
      <Total course={course} />
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
}

const Parts = (props) => {
  const part = props.course.parts.map(part => {
    return (
      <div key={part.id}>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  })
  return part
}

const Total = (props) => {
  var exercises = props.course.parts.map(part => { return part.exercises })

  var total = exercises.reduce((startingValue, part) => startingValue + part, 0)

  return (<div>
    <b>total of {total} exercises</b>
  </div>);
}



export default App