const Total = (props) => {
    const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return (
      <>
        <b>total of {totalExercises} exercises</b>
      </>
    )
}

export default Total