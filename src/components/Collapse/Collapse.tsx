import { useRef, useState } from "react"
import cn from "classnames"

import { ReactComponent as ArrowIcon } from "assets/icons/collapse-arrow.svg"
import "./Collapse.scss"
import { useClickOutside } from "../../utils"

type Props = {
  desc: string
  title: string
}

export const Collapse = ({ desc, title }: Props): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLButtonElement>(null)
  const el = document.getElementsByClassName("movable")[0]
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  useClickOutside(wrapperRef, () => {
    setIsOpen(false)
  })

  return (
    <div
      ref={wrapperRef}
      className={cn("collapse-wrapper", {
        open: isOpen,
      })}
    >
      <button
        onMouseOver={() => {
          el?.classList.add("active")
        }}
        onMouseLeave={() => {
          el?.classList.remove("active")
        }}
        ref={titleRef}
        type="button"
        onClick={toggleOpen}
        className="collapse-title"
      >
        {title}
        <ArrowIcon className="collapse-arrow" />
      </button>
      <div className="collapse-content">
        <p className="collapse-content-desc">{desc}</p>
      </div>
    </div>
  )
}
