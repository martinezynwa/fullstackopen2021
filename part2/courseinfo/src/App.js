import React from 'react'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses} />
    </div>
  )
}

const Course = (props) => {
  const singleCourse = props.course.map(part => (<div key={part.id}>{<OneCourse course={part} />}</div>))
  return singleCourse
}

const OneCourse = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content course={props.course.parts} />
      <Total total={props.course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return <h2> {course} </h2>
}

const Content = ({ course }) => {
  const content = course.map(singleContent => {
    return (
      <p key={singleContent.id}>
        {singleContent.name} {singleContent.exercises}
      </p>
    )
  })

  return <div>{content}</div>
}

const Total = ({ total }) => {
  const totalAmount = total.reduce((sum, exercise) => { return sum + exercise.exercises }, 0)
  return (
    <div>
      <p>
        <b>Number of exercises: {totalAmount}</b>
      </p>
    </div>
  )
}

export default App