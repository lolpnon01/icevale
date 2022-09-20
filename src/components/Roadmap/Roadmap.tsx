import "./Roadmap.scss"

import { ReactComponent as ArrowIcon } from "assets/icons/roadmap.svg"
import cn from "classnames"

type Props = {
  animation: boolean
}

export const Roadmap = ({ animation }: Props): JSX.Element => {
  return (
    <div id="roadmap" className="roadmap">
      <h2 className="roadmap-title">Roadmap</h2>
      <div className="roadmap-content">
        <div
          className={cn("roadmap-content-item", {
            "animate__animated animate__fadeInRight show": animation,
          })}
        >
          <ArrowIcon className="roadmap-content-item-arrow" />
          <div className="roadmap-content-item-title">Q2 2022</div>
          <ul className="roadmap-content-item-desc">
            <li>Dapp development</li>
            <li>Contract development</li>
            <li>Dapp animation</li>
            <li>Age of Mining landing</li>
            <li>Age of Mining Dapp launch</li>
            <li>Build community</li>
            <li>Dapp mobile version</li>
            <li>Audit</li>
            <li>Marketing campaign</li>
            <li>Update Dapp interface</li>
            <li>Music production</li>
          </ul>
        </div>
        <div
          className={cn("roadmap-content-item", {
            "animate__animated animate__fadeInLeft animate__delay-1s show": animation,
          })}
        >
          <ArrowIcon className="roadmap-content-item-arrow" />
          <div className="roadmap-content-item-title">Q3 2022</div>
          <ul className="roadmap-content-item-desc">
            <li>Marketing campaign</li>
            <li>Dapp animation update</li>
            <li>BUSD miner</li>
            <li>Network expansion</li>
            <li>New contracts with new mechanics</li>
            <li>New contract audit</li>
            <li>FTM network miner</li>
          </ul>
        </div>
        <div
          className={cn("roadmap-content-item", {
            "animate__animated animate__fadeInLeft animate__delay-2s show": animation,
          })}
        >
          <ArrowIcon className="roadmap-content-item-arrow" />
          <div className="roadmap-content-item-title">Q4 2022</div>
          <ul className="roadmap-content-item-desc">
            <li>Marketing campaign</li>
            <li>Age of Mining animated series</li>
            <li>AVAX network miner</li>
            <li>NFT mechanism</li>
            <li>Swap system</li>
            <li>Swap contract audit</li>
            <li>Polygon network miner</li>
            <li>Roadmap update</li>
          </ul>
        </div>
      </div>
    </div>
  )
}