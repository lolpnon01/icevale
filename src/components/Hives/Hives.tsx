import "./Hives.scss"
import { ButtonModal } from "components"
import { useState } from "react"
import cn from "classnames"
import Web3 from "web3"
import { useSearchParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"

import snowSrc from "assets/images/snow-small.webp"
import goldSrc from "assets/images/gold.webp"
import chestSrc from "assets/images/chest.webp"
import abi from "abi/abi.json"
import { contractAddress } from "abi"
import { ReactComponent as Close } from "assets/icons/close-small.svg"

type Props = {
  className?: string
  isModal?: () => void
  bonus: number
  miners: number
  time: number
}

export const Hives = ({ className, isModal, bonus, miners, time }: Props): JSX.Element => {
  const { account, library } = useWeb3React()
  const [input, setInput] = useState("")
  const [focused, setFocused] = useState(false)
  const [search] = useSearchParams()

  const buy = async () => {
    if (!input.length) {
      alert("Fill input value")
      return
    }

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

  return (
    <div className={cn("hives", className)}>
      {isModal && (
        <div className="hives-header">
          <img src={snowSrc} className="hives-block-left-img" alt="placeholder" />
          <button onClick={isModal} className="hives-header-btn">
            <Close />
          </button>
        </div>
      )}
      <div className="hives-block">
        <div className="hives-block-left">
          <img src={snowSrc} className="hives-block-left-img" alt="placeholder" />
          Ice Castle
        </div>
        <div className="hives-block-right">{miners > 0 ? miners : "0.000"} INUITS</div>
      </div>
      <div className="hives-block">
        <div className="hives-block-left">
          <img src={chestSrc} className="hives-block-left-img" alt="placeholder" />
          Daily Profit
        </div>
        <div className="hives-block-right">{bonus > 0 ? bonus.toFixed(5) : "0.000"} BNB</div>
      </div>
      <div className="hives-block">
        <div className="hives-block-left">
          <img src={goldSrc} className="hives-block-left-img" alt="placeholder" />
          Daily Yield
        </div>
        <div className="hives-block-right">~6%</div>
      </div>
      <div className="hives-input-wrapper">
        <input
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onChange={e => setInput(e.target.value)}
          value={input}
          type="number"
          placeholder={focused ? "" : "Fill in your investment amount (>0.1)"}
          className="hives-input withAppend"
        />
        <div className="hives-input-append">BNB</div>
      </div>
      <ButtonModal onClick={buy} text="Shovel Snow (invest)" className="hives-btn first-child" />
      <ButtonModal
        onClick={buySecond}
        text={`Re-Shovel ${time > 0 && time < 43200 ? convert(time) : ""}`}
        className="hives-btn"
        dark={time > 0 && time < 43200 ? true : undefined}
      />
    </div>
  )
}