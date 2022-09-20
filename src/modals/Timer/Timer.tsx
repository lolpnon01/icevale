import { Modal, TimerComp } from "components"

import "./Timer.scss"

type Props = {
  onClose: () => void
  isOpen: boolean
}

export const Timer = ({ onClose, isOpen }: Props): JSX.Element => {
  return (
    <Modal className="referrals" isOpen={isOpen} onClose={onClose} title="Timer">
      <p className="referrals-desc">Here is how long our project has been running</p>
      <TimerComp />
    </Modal>
  )
}