import { InputBg, Modal } from "components"

import arrowSrc from "assets/images/arrow.webp"
import "./Calculator.scss"
import {useEffect, useState} from "react"
import {ethers} from "ethers";
import {contractAddress} from "../../abi";
import abi from "../../abi/abi.json";
import Web3 from "web3";

type Props = {
  onClose: () => void
  isOpen: boolean
}

export const Calculator = ({ onClose, isOpen }: Props): JSX.Element => {
  const [calc, setCalc] = useState("1")
  const [result, setResult] = useState("4.1340")
  const bnbValue = 1000000000000000000

  const getAllInfo = async (newCalc: string) => {
    if (Number(newCalc) > 0) {
      // @ts-ignore
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)

      const nftContract = new ethers.Contract(contractAddress, abi, provider)
      // @ts-ignore
      const toWei = (amount, unit = "ether") => Web3.utils.toWei(amount, unit)

      const resultFromContract = await nftContract.getEggsYield(toWei(newCalc))

      setResult((Number(resultFromContract[1]) / bnbValue).toString())
    } else {
      setResult('0')
    }
  }

  useEffect(() => {
    getAllInfo(calc)
  }, [])

  return (
    <Modal className="calculator" isOpen={isOpen} onClose={onClose} title="Calculator">
      <p className="calculator-desc">
        Calculate the approximate amount of BNB <br /> You can earn in 1 day. <br /> (Your daily profit will be higher when you compound interest long term)
      </p>
      <p className="calculator-desc-2">Your investment</p>
      <InputBg
        className="calculator-input"
        placeholder="1"
        onChange={v => {
          setCalc(v)
          getAllInfo(v)
        }}
        value={calc}
      />
      <img src={arrowSrc} alt="arrow" className="calculator-arrow" />
      <div className="calculator-text">Your earnings</div>
      <InputBg
        className="calculator-input"
        placeholder="4.1340"
        append="BNB"
        onChange={v => setResult(v)}
        value={result}
      />
    </Modal>
  )
}