import './ComponentStyles.css'

export default function ControlButton({control, func}) {
    return (
        <div onClick={func} className={control === "Next" ? "controlButton nextButton" : "controlButton"}>
            {control}
        </div>
    )
}