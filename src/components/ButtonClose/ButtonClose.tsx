import "./ButtonClose.scss"
import cn from "classnames"
import bgSrc from "assets/images/snowballclosex.webp"
import bg1Src from "assets/images/snowballcloseo.webp"

type Props = {
  onClick: () => void
  disabled?: boolean
  className?: string
}

export const ButtonClose = ({ onClick, disabled, className }: Props): JSX.Element => {
  const el = document.getElementsByClassName("movable")[0]

  const handleClose = () => {
    el?.classList.remove("active")
    onClick()
  }

  return (
    <button
      onMouseOver={() => {
        el?.classList.add("active")
      }}
      onMouseLeave={() => {
        el?.classList.remove("active")
      }}
      type="button"
      onClick={handleClose}
      disabled={disabled}
      className={cn("custom-button-close", className)}
    >
      <img alt="close" src={bgSrc} className="custom-button-close-img1" />
      <img alt="close" src={bg1Src} className="custom-button-close-img2" />
    </button>
  )
}
