import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total />
    </div>
  )
}

var total = 0

const Header = ({ course }) => {
  return (
    <>
      <div>
        <h1>{course.name}</h1>
      </div>
    </>
  )
}

/*
const Content = ({ course }) => {
  const parts = course.parts

  const part = parts.map(item => {
    total = total + item.exercises
    return (
      <>
        <div>
          <p>{item.name}: {item.exercises}</p>
        </div>
      </>
    )
  })
  return part
}
*/

const Content = (props) => {
  const lists = props.course.parts.map(function (item) {
    total = total + item.exercises
    return (
      <div>
        <p>{item.name}: {item.exercises}</p>
      </div>
    )
  })

  return lists
};

const Total = () => {

  return (
    <>
      <div>
        <p>Number of exercises: {total}</p>
      </div>
    </>
  )
}

export default App