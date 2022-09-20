import { useNavigate } from "react-router"
import cn from "classnames"
import { useSearchParams } from "react-router-dom"

import { routes } from "utils"

import "./GameFeature.scss"

import img1Src from "assets/gifs/snowballswap.gif"
import img2Src from "assets/gifs/snowballpool.gif"
import img3Src from "assets/gifs/icecastle.gif"
import img4Src from "assets/gifs/eskimocampfire.gif"
import imgbgSrc from "assets/images/snowballmapfloatshorts.webp"
import imgbackSrc from "assets/images/back.webp"

type Props = {
  animation: boolean
}

export const GameFeature = ({ animation }: Props): JSX.Element => {
  const el = document.getElementsByClassName("movable")[0]
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const items = [
    {
      title: "Shovel Snow",
      img: img1Src,
      id: "",
      className: "animate__animated animate__fadeInLeft show",
      desc: (
        <p>
          INUITS can help you to collect ICE steadily on an average day, accounting for 6% of your initial investment.
        </p>
      ),
    },
    {
      title: "Re-Shovel",
      img: img2Src,
      id: "",
      className: "animate__animated animate__fadeInLeft animate__delay-05s show",
      desc: (
        <p>The best strategy that the team can recommend is to compound for 10 days in a row and then harvest once.</p>
      ),
    },
    {
      title: "Ice Castle",
      img: img3Src,
      id: "castle",
      className: "animate__animated animate__fadeInLeft animate__delay-1s show",
      desc: (
        <p>Age of Mining has several anti-dumping and anti-whale measures to ensure the longevity of the project.</p>
      ),
    },
    {
      title: "Referrals",
      id: "referral",
      className: "animate__animated animate__fadeInLeft animate__delay-15s show",
      img: img4Src,
      desc: <p>Invite more INUITS friends to join this party and get 8% of their investments.</p>,
    },
  ]
  return (
    <div id="features" className="game-feature" style={{ backgroundImage: `url(${imgbackSrc})` }}>
      <h2 className="game-feature-title">Game Features</h2>
      <div className="game-feature-content">
        {items.map((item, index) => (
          <div key={index} className={cn("game-feature-content-item", `${animation && item.className}`)}>
            <button
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              type="button"
              onClick={() => navigate(`${routes.connect}?id=${item.id}&${search.toString()}`)}
              style={{ backgroundImage: `url(${imgbgSrc})` }}
              className="game-feature-content-item-title"
            >
              {item.title}
            </button>
            <div className="game-feature-content-item-img-wrapper">
              <img src={item.img} alt="placeholder" className="game-feature-content-item-img" />
            </div>
            {item.desc}
          </div>
        ))}
      </div>
    </div>
  )
}