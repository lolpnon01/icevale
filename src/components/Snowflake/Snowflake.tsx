import "./Snowflake.scss"
import cn from "classnames"

import bnbSrc from "assets/images/bnbiconhd.webp"
import snowSrc from "assets/images/snowballlogohdrender.webp"

export const Snowflake = ({ animation }: { animation: boolean }): JSX.Element => {
  return (
    <div className="snowflake">
      <div
        className={cn("snowflake-left", {
          "animate__animated animate__fadeInLeft show": animation,
        })}
      >
        <h2 className="snowflake-left-title">Snowflakes</h2>
        <p className="snowflake-left-desc">
          Melt the ice you collect into <br /> snowflakes and turn them into BNB.
        </p>
      </div>
      <div
        className={cn("snowflake-right", {
          "animate__animated animate__fadeInRight show": animation,
        })}
      >
        <img src={snowSrc} alt="snow" className="snowflake-right-img" />
        <img src={bnbSrc} alt="bnb" className="snowflake-right-img" />
      </div>
    </div>
  )
}