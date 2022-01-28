import React from 'react'

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

export default Course