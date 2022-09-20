import { Modal } from "components"

import lockSrc from "assets/images/lock.webp"
import usersSrc from "assets/images/users.webp"
import goldSrc from "assets/images/gold.webp"
import coinSrc from "assets/images/coin.webp"
import profitSrc from "assets/images/profit.webp"
import "./Stats.scss"

type Props = {
  onClose: () => void
  isOpen: boolean
  totalMembers: number
  deposit: number
  userDeposit: number
  total: number
  inuits: number
}

export const Stats = ({ onClose, isOpen, totalMembers, deposit, total, userDeposit, inuits }: Props): JSX.Element => {
  return (
    <Modal className="referrals" isOpen={isOpen} onClose={onClose} title="Stats">
      <p className="referrals-desc">The real-time statistics</p>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={lockSrc} alt="lock" />
            Total Value Locked
          </div>
          <div className="referrals-block-left-desc">(Contract balance)</div>
        </div>
        {total > 0 ? total.toFixed(5) : 0} BNB
      </div>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={coinSrc} alt="lock" />
            Initial Deposit
          </div>
          <div className="referrals-block-left-desc">(Your initial deposit)</div>
        </div>
        {deposit.toFixed(5)} BNB
      </div>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={profitSrc} alt="lock" />
            Total Deposit
          </div>
          <div className="referrals-block-left-desc">(Your total deposit)</div>
        </div>
        {userDeposit.toFixed(5)} BNB
      </div>
      {/*<div className="referrals-block">*/}
      {/*  <div className="referrals-block-left">*/}
      {/*    <div className="referrals-block-left-title">*/}
      {/*      <img src={profitSrc} alt="lock" />*/}
      {/*      INUITS Price*/}
      {/*    </div>*/}
      {/*    <div className="referrals-block-left-desc">(1BNB can recruit how many INUITS)</div>*/}
      {/*  </div>*/}
      {/*  {inuits.toFixed(5)} INUITS*/}
      {/*</div>*/}
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={goldSrc} alt="gold" />
            APR
          </div>
          <div className="referrals-block-left-desc">(Yearly returns percentage)</div>
        </div>
        2190%
      </div>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={usersSrc} alt="people" />
            Total Members
          </div>
          <div className="referrals-block-left-desc">(The total number of members)</div>
        </div>
        {totalMembers}
      </div>
    </Modal>
  )
}