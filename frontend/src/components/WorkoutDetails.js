import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) =>{
    const {dispatch} = useWorkoutsContext()
    const handleOnClick = async ()=>{
        const response = await fetch('/api/workouts/' + workout._id , {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT' , payload: json})
        }

    }
    return(
    <div className="workoutlist">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p> 
        <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined"onClick={handleOnClick}>delete_outline</span>
        {/* <span className="material-icons-outlined" onClick={handleOnClick} >
delete
</span> */}
    </div>
    )
}

export default WorkoutDetails