const Course = ({ course }) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
        </div>
    )
}

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => {
    return (
        <div>
        {course.parts.map(part => <Part key={part.id} part={part}/>)}
        <Total parts={course.parts}/>
    </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({ parts }) => <p><strong>Total of {parts.reduce((sum, part) => sum += part.exercises, 0)} exercises</strong></p>

export default Course