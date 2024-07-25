import { FC, useReducer } from "react"

interface Motto {
    title: string,
    time_of_post: Date,
    feeling: string
}
interface Action {
    type:string,
    payload: Motto
}

const prev_mottos: Motto[] = [];

function changeMotto(state:Motto , action:Action) {
    prev_mottos.push(state);
    console.log(prev_mottos);
    return  {
        title: action.payload.title,
        time_of_post: action.payload.time_of_post,
        feeling: action.payload.feeling
    }
}

const Motto:FC = () => {
    const [motto, dispatch] = useReducer(changeMotto, {
        title: 'Motto goes here',
        time_of_post: new Date(),
        feeling: 'Unknown',
        });
    return (
        <>
            <h2>{motto.title}</h2>
            <p>{motto.feeling}</p>
            <p>
                {motto.time_of_post.getHours()}:
                {motto.time_of_post.getMinutes()}:
                {motto.time_of_post.getSeconds()}
            </p>
            <div className="change-motto">
                <input type="text" id="motto" placeholder="your motto title"/>
                <input type="text" id="feeling" placeholder="feeling"/>
                <button onClick={() => {
                    dispatch({
                        type: '',
                        payload: {
                        title: (document.getElementById('motto')! as HTMLInputElement).value,
                        time_of_post: new Date(),
                        feeling: (document.getElementById('feeling')! as HTMLInputElement).value
                    } })
                }}>Update Motto</button>
                <button onClick={() => {
                    console.log(prev_mottos);
                }}>Rollback Motto</button>
            </div>
        </>
    )
}

export default Motto;