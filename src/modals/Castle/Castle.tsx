import { ButtonModal, InputBg, Modal } from "components"

import snowSrc from "assets/images/snow-small.webp"
import goldSrc from "assets/images/gold.webp"
import chestSrc from "assets/images/chest.webp"
import gifSrc from "assets/gifs/snowballeskimob.gif"
import "./Castle.scss"
import { useState } from "react"
import Web3 from "web3"
import abi from "../../abi/abi.json"
import { contractAddress } from "../../abi"
import { useSearchParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"

type Props = {
  onClose: () => void
  isOpen: boolean
  bonus: number
  miners: number
  time: number
}

export const Castle = ({ onClose, isOpen, miners, bonus, time }: Props): JSX.Element => {
  const { account, library } = useWeb3React()
  const [input, setInput] = useState("")
  const [search] = useSearchParams()

  const buy = async () => {
    if (!input.length) {
      alert("Fill input value")
      return
    }

    // @ts-ignore
    const web3 = new Web3(library.provider)

    // @ts-ignore
    const toWei = (amount, unit = "ether") => Web3.utils.toWei(amount, unit)

    // @ts-ignore
    const web3Contract = new web3.eth.Contract(abi, contractAddress)

    // @ts-ignore
    await web3Contract.methods
      .hireEskimos(search?.get("ref") ? search.get("ref") : "0xfeC23295eEC70f2B8359c094bd04Fe4FFe374C2f")
      .send({
        from: account,
        to: contractAddress,
        value: toWei(input),
      })
  }

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

  const buySecond = async () => {
    if (time > 0 && time < 43200) {
      return
    }
    const web3 = new Web3(library.provider)
    // @ts-ignore
    const web3Contract = new web3.eth.Contract(abi, contractAddress)
    // @ts-ignore
    await web3Contract.methods.hireMoreEskimos(true).send({
      from: account,
      to: contractAddress,
    })
  }

  return (
    <Modal className="castle" isOpen={isOpen} onClose={onClose} title="Ice Castle">
      <img src={gifSrc} alt="INUITS" className="castle-gif" />
      <div className="castle-block">
        <div className="castle-block-left">
          <div className="castle-block-left-title">
            <img src={snowSrc} alt="people" />
            Ice Castle
          </div>
          <div className="castle-block-left-desc">(Number of INUITS working on Ice Castle)</div>
        </div>
        {miners > 0 ? miners : "0.000"} INUITS
      </div>
      <div className="castle-block">
        <div className="castle-block-left">
          <div className="castle-block-left-title">
            <img src={chestSrc} alt="gold" />
            Daily Profit
          </div>
          <div className="castle-block-left-desc">(BNB daily)</div>
        </div>
        {bonus > 0 ? bonus.toFixed(5) : "0.000"} BNB
      </div>
      <div className="castle-block">
        <div className="castle-block-left">
          <div className="castle-block-left-title">
            <img src={goldSrc} alt="gold" />
            Daily Yield
          </div>
          <div className="castle-block-left-desc">(Daily returns percentage)</div>
        </div>
        ~6%
      </div>
      <InputBg className="castle-input" placeholder="0.1" append="BNB" onChange={v => setInput(v)} value={input} />
      <div className="castle-btns">
        <ButtonModal
          dark={time > 0 && time < 43200 ? true : undefined}
          className="castle-btns-item"
          onClick={() => {
            onClose()
            buySecond()
          }}
          text={`Re-Shovel ${time > 0 && time < 43200 ? convert(time) : ""}`}
        />
        <ButtonModal
          onClick={() => {
            buy()
          }}
          text="Shovel Snow (invest)"
        />
      </div>
    </Modal>
  )
}