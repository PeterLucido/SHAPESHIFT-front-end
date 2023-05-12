import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'
import MealCard from '../../components/MealCard/MealCard'
import NoteCard from '../../components/NoteCard/NoteCard'
import SleepCard from '../../components/SleepCard/SleepCard'

const DayDetails = () => {
  return (
    <>
      <SleepCard />
      <MealCard />
      <ExerciseCard />
      <NoteCard />
    </>
  )
}

export default DayDetails