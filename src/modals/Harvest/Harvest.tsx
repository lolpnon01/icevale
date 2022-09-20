import ReactTooltip from "react-tooltip"

import { ButtonModal, Modal } from "components"

import snowSrc from "assets/images/snow-small.webp"
import clockSrc from "assets/images/clock.webp"
import atomsSrc from "assets/images/snowflake.webp"
import giftSrc from "assets/images/gift.webp"
import { ReactComponent as TooltipIcon } from "assets/icons/info.svg"
import "./Harvest.scss"
import { contractAddress } from "../../abi"
import abi from "abi/abi.json"
import Web3 from "web3"
import { useWeb3React } from "@web3-react/core"

type Props = {
  onClose: () => void
  isOpen: boolean
  atoms: number
  iceBucket: number
  time: number
  timeOther: number
}

export const Harvest = ({ onClose, isOpen, atoms, iceBucket, time, timeOther }: Props): JSX.Element => {
  const { account, library } = useWeb3React()

  const convert = n => {
    const d = Number(n)
    const hours = Math.floor(d / 3600)
    const minutes = Math.floor((d % 3600) / 60)
    const seconds = Math.floor((d % 3600) % 60)

    return (
      ("0" + Math.floor(hours)).slice(-2) +
      ":" +
      ("0" + Math.floor(minutes)).slice(-2) +
      ":" +
      ("0" + Math.floor(seconds)).slice(-2)
    )
  }

  const sell = async () => {
    if (time > 0 && time < 172800) {
      return
    }

    const web3 = new Web3(library.provider)

    // @ts-ignore
    const web3Contract = new web3.eth.Contract(abi, contractAddress)

    await web3Contract.methods.meltingSnow().send({
      from: account,
      to: contractAddress,
    })
  }

  return (
    <Modal className="harvest" isOpen={isOpen} onClose={onClose} title="Harvest Snowflake">
      <div className="harvest-block">
        <div className="harvest-block-left">
          <div className="harvest-block-left-title">
            <img src={snowSrc} alt="snow" />
            Ice Bucket
            <TooltipIcon data-tip={`Your profit <br /> 0.0000 BNB`} />
          </div>
          <div className="harvest-block-left-desc">(Melt to Snowflakes Convert to BNB)</div>
        </div>
        {iceBucket > 0 ? iceBucket.toFixed(5) : 0} BNB
      </div>
      <div className="harvest-block">
        <div className="harvest-block-left">
          <div className="harvest-block-left-title">
            <img src={clockSrc} alt="gold" />
            Ice Bucket Fills In
            <TooltipIcon data-tip={`The rewards will stop growing <br /> when the timer expires`} />
          </div>
          <div className="harvest-block-left-desc">(Re-shovel to fill ice bucket)</div>
        </div>
        {timeOther > 0 && timeOther < 172800 ? convert(timeOther) : "Null"}
      </div>
      <div className="harvest-block">
        <div className="harvest-block-left">
          <div className="harvest-block-left-title">
            <img src={atomsSrc} alt="atom" />
            Atoms
            <TooltipIcon
              data-tip={`The number of mandatory <br /> reinvestments, after which the <br /> withdrawal  will be without <br /> any fees.`}
            />
          </div>
          <div className="harvest-block-left-desc">(Required atoms number)</div>
        </div>
        {atoms} / 10
      </div>
      <div className="harvest-block">
        <div className="harvest-block-left">
          <div className="harvest-block-left-title">
            <img src={giftSrc} alt="gift" />
            Re-shovelBonus
            <TooltipIcon data-tip={`Your next reinvestment will be <br /> increased by this bonus.`} />
          </div>
          <div className="harvest-block-left-desc">(Bonus for reinvesting)</div>
        </div>
        {atoms * 2}%
      </div>
      <div className="harvest-btns">
        <ButtonModal
          dark={atoms < 10}
          className="harvest-btn"
          onClick={() => {
            sell()
            onClose()
          }}
          text={`Melt Snow ${time > 0 && time < 172800 ? convert(time) : atoms < 10 ? "(-80%)" : ""}`}
        />
      </div>
      {/*@ts-ignore*/}
      <ReactTooltip html={true} />
    </Modal>
  )
}