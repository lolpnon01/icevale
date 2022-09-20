import { ButtonModal, Modal } from "components"

import usersSrc from "assets/images/users.webp"
import goldSrc from "assets/images/gold.webp"
import gifSrc from "assets/gifs/eskimocampfire.gif"
import "./Referrals.scss"
import { routes } from "../../utils"

type Props = {
  onClose: () => void
  isOpen: boolean
  people: number
  money: number
  address: string
}

export const Referrals = ({ onClose, isOpen, people, money, address }: Props): JSX.Element => {
  function copyToClipboard(text) {
    const elem = document.createElement("textarea")
    elem.value = text
    document.body.appendChild(elem)
    elem.select()
    document.execCommand("copy")
    document.body.removeChild(elem)
  }

  const copy = () => {
    copyToClipboard(`${window.location.origin}${routes.game}?ref=${address}`)
    alert("Link is copied!")
  }

  return (
    <Modal className="referrals" isOpen={isOpen} onClose={onClose} title="Referrals">
      <p className="referrals-desc">
        Invite more INUITS friends to join this party <br /> and get 8% of their investments.
      </p>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={usersSrc} alt="people" />
            Referrals
          </div>
          <div className="referrals-block-left-desc">(Number of your referrals)</div>
        </div>
        {people > 0 ? people : 0}
      </div>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={goldSrc} alt="gold" />
            Referral Rewards
          </div>
          <div className="referrals-block-left-desc">(You&apos;ve earned from referrals)</div>
        </div>
        {money > 0 ? money.toFixed(5) : 0} BNB
      </div>
      <div className="referrals-footer">
        <img src={gifSrc} alt="eskimos" className="referrals-footer-gif" />
        <ButtonModal onClick={copy} text="Copy referral link" />
      </div>
    </Modal>
  )
}