import React, { ReactNode, useEffect, useRef } from "react"
import cn from "classnames"
import { useMedia } from "use-media"

import { mixins, useClickOutside } from "utils"
import { ButtonClose } from "components"

import bgSrc from "assets/images/snowballframeout.webp"
import bg2Src from "assets/images/modal-big.webp"
import bgMobileSrc from "assets/images/modal-mobile.webp"
import bgMobileFaqSrc from "assets/images/faq-mobile.webp"
import "./Modal.scss"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  width?: number
  height?: number
  title?: string
  className?: string
  faq?: boolean
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  width = 736,
  height = 552,
  faq,
  title,
  className,
}: Props): JSX.Element | null => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const body = document.body
  const isM = useMedia({ maxWidth: mixins.m })

  useEffect(() => {
    if (isOpen) {
      body.style.overflow = "hidden"
    }
  }, [isOpen, body.style.overflow])

  const handleClose = () => {
    body.style.overflow = "scroll"
    onClose()
  }

  useClickOutside(wrapperRef, () => {
    handleClose()
  })

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    })
    return () => {
      document.removeEventListener("keydown", e => e)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    body.style.overflow = "scroll"
  }

  return (
    <div
      className={cn("modal", {
        show: isOpen,
      })}
    >
      <div className="modal-backdrop" />
      <div
        ref={wrapperRef}
        style={{
          maxWidth: isM ? 348 : width,
          maxHeight: isM ? (faq ? 630 : 518) : height,
          backgroundImage: `url(${isM ? (faq ? bgMobileFaqSrc : bgMobileSrc) : faq ? bg2Src : bgSrc})`,
        }}
        className={cn("modal-content", className, {
          active: isOpen,
        })}
      >
        <div className="modal-header">
          {title && <h2 className={cn("modal-header-title")}>{title}</h2>}
          <ButtonClose onClick={handleClose} />
        </div>
        {children}
      </div>
    </div>
  )
}
