import { useEffect, useState } from "react"
import cn from "classnames"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"

import { hrefs, routes, useWindowHeight } from "utils"
import { ButtonConnect, Loading } from "components"

import bgSrc from "assets/images/snowballfrontpageicebg.webp"
import bgBtnSrc from "assets/images/button-wallet.webp"
import imgMetamaskSrc from "assets/images/metamask.webp"
import { ReactComponent as WalletConnectIcon } from "assets/icons/wallet-connect.svg"
import "./Connect.scss"
import { connectors } from "utils/connectors"

export const Connect = (): JSX.Element => {
  const height = useWindowHeight()
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const [connectStep, setConnectStep] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [secondStep, setSecondStep] = useState(false)
  const [connectWay, setConnectWay] = useState<"metamask" | "walletConnect">("metamask")
  const { activate, account } = useWeb3React()

  const setProvider = type => {
    window.localStorage.setItem("provider", type)
  }

  const connectWays = [
    {
      id: "metamask",
      icon: <img src={imgMetamaskSrc} alt="metamask" className="connect-content-item-icon" />,
      onClick: () => setConnectWay("metamask"),
    },
    {
      id: "walletConnect",
      icon: <WalletConnectIcon className="connect-content-item-icon" />,
      onClick: () => setConnectWay("walletConnect"),
    },
  ]

  const onConnect = () => {
    if (connectWay === "metamask") {
      activate(connectors.injected)
      setProvider("injected")
    } else {
      activate(connectors.walletConnect)
      setProvider("walletConnect")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setFirstLoad(false)
    }, 1500)
  }, [setFirstLoad])

  useEffect(() => {
    const provider = window.localStorage.getItem("provider")
    if (provider) {
      activate(connectors[provider]).then(() => {
        navigate(`${routes.game}?${search.toString()}&playVideo=true`)
      })
    }
  }, [])

  useEffect(() => {
    if (account?.length) {
      navigate(`${routes.game}?${search.toString()}&playVideo=true`)
    }
  }, [account])

  return (
    <div className="connect" style={{ backgroundImage: `url(${bgSrc})`, height: height }}>
      {firstLoad && <Loading isBg />}
      {connectStep ? (
        <div className="connect-content">
          <div className="connect-content-ways">
            {connectWays.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={item.onClick}
                className={cn("connect-content-item", {})}
                style={{ backgroundImage: `url(${item.id === connectWay && bgBtnSrc})` }}
              >
                {item.icon}
              </button>
            ))}
          </div>
          <ButtonConnect onClick={onConnect} text="Connect" />
        </div>
      ) : (
        <>
          {secondStep ? (
            <div className="connect-content">
              <ButtonConnect onClick={() => setConnectStep(true)} text="Connect Wallet" />
              <ButtonConnect href={hrefs.docs} text="View Docs" className="connect-content-btn" />
            </div>
          ) : (
            <div className="connect-content">
              <ButtonConnect onClick={() => setSecondStep(true)} text="Check out Icevale" />
            </div>
          )}
        </>
      )}
    </div>
  )
}
