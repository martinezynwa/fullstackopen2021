import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
	const course = 'Half Stack application development'
	const parts = [
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

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total parts={parts} />
		</div>
	)
};

const Header = (props) => {
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	)
};

const Content = (props) => {
	const lists = props.parts.map(function(item) {
		return (
			<div>
				<p> {item.name}: {item.exercises}</p>
			</div>
		)
	})
	
	return lists
};

const Total = (props) => {
	var score = 0
	
	const lists = props.parts.map(function(item) {
		
		score = score + item.exercises 
		
	})
	
	return (
		<div>
			<p>Number of exercises: {score} </p>
		</div>
	)
};

ReactDOM.render(<App />, document.getElementById('root'));