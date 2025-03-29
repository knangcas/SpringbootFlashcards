import 'animate.css'



export default function MessageAnimate({msg}) {

    return (
        <h2 className="animate__animated animate__bounceInUp">{msg}</h2>
    )

}