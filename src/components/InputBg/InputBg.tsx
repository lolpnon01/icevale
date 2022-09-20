import cn from "classnames"
import { useState } from "react"

import bgSrc from "assets/images/input.webp"
import bgMobileSrc from "assets/images/input-mobile.webp"
import "./InputBg.scss"
import { useMedia } from "use-media"
import { mixins } from "../../utils"

type Props = {
  onChange: (value: string) => void
  value: string
  placeholder?: string
  className?: string
  append?: string
  type?: "text" | "number"
}

export const InputBg = ({ onChange, value, placeholder, className, append, type = "number" }: Props): JSX.Element => {
  const [focused, setFocused] = useState(false)
  const isM = useMedia({ maxWidth: mixins.m })

  return (
    <div
      className={cn("custom-input-wrapper-bg", className)}
      style={{ backgroundImage: `url(${isM ? bgMobileSrc : bgSrc})` }}
    >
      <input
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onChange={e => onChange(e.target.value)}
        value={value}
        type={type}
        placeholder={focused ? "" : placeholder}
        className={cn("custom-input-bg", {
          withAppend: append,
        })}
      />
      {append && <div className="custom-input-bg-append">{append}</div>}
    </div>
  )
}
