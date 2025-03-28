import './ComponentStyles.css'

export default function ControlButton({disabled = false, controlText, styleClass = "controlButton", func}) {
    return (
        <div onClick={disabled ? ()=>{console.log("disabled button")} : func} className={disabled ? styleClass + " controlDisable" : styleClass}>
            {controlText}
        </div>
    )
}