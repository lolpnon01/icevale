import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ethers } from "ethers"
import { useMedia } from "use-media"
import cn from "classnames"
import { MapInteractionCSS } from "react-map-interaction"
import { useNavigate } from "react-router"
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core"

import {Button, ButtonGame, Hives, Loading} from "components"
import { links } from "./utils"
import { Referrals, Stats, Harvest, Castle, Calculator, FAQ, Timer } from "modals"
import { contractAddress } from "abi"
import abi from "abi/abi.json"
import { mixins, routes } from "utils"
import { connectors } from "utils/connectors"

import bgSrc from "assets/gifs/snowball.gif"
import videoSrc from "assets/videos/snowff.mp4"
import menuSrc from "assets/images/snowballmenu.gif.webp"
import snowSrc from "assets/images/snow-small.webp"
import "./Game.scss"

export const Game = (): JSX.Element => {
  const [search, setSearch] = useSearchParams()
  const { account, activate } = useWeb3React()
  const navigate = useNavigate()
  const [playVideo, setPlayVideo] = useState(false)
  const [hideVideo, setHideVideo] = useState(false)
  const [menu, setMenu] = useState(false)
  const [referral, setReferral] = useState(false)
  const [stats, setStats] = useState(false)
  const [bonus, setBonus] = useState(0)
  const [miners, setMiners] = useState(0)
  const [referralPeople, setReferralPeople] = useState(0)
  const [referralCount, setReferralCount] = useState(0)
  const [totalMembers, setTotalMembers] = useState(0)
  const [totalDeposit, setTotalDeposit] = useState(0)
  const [userDeposit, setUserDeposit] = useState(0)
  const [atoms, setAtoms] = useState(0)
  const [iceBucket, setIceBucket] = useState(0)
  const [time, setTime] = useState(0)
  const [timeSecond, setTimeSecond] = useState(0)
  const [timeThird, setTimeThird] = useState(0)
  const [total, setTotal] = useState(0)
  const [profit, setProfit] = useState(0)
  const [inuits, setInuits] = useState(0)
  const [harvest, setHarvest] = useState(false)
  const [calculator, setCalculator] = useState(false)
  const [faq, setFaq] = useState(false)
  const [castle, setCastle] = useState(false)
  const [timer, setTimer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dropdown, setDropdown] = useState(false)
  const el = document.getElementsByClassName("movable")[0]
  const isM = useMedia({ maxWidth: mixins.m })
  const bnbValue = 1000000000000000000

  useEffect(() => {
    const provider = window.localStorage.getItem("provider")
    if (provider) {
      activate(connectors[provider]).catch(() => navigate(`${routes.index}?${search.toString()}`))
    } else {
      navigate(`${routes.index}?${search.toString()}`)
    }
  }, [])

  const bsc = {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance Smart Native Token',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: [
       'https://bsc-dataseed.binance.org/',
       'https://bsc-dataseed1.binance.org/',
       'https://bsc-dataseed2.binance.org/',
       'https://bsc-dataseed3.binance.org/',
       'https://bsc-dataseed4.binance.org/',
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  }

  useEffect(() => {
    const id = search.get("id") || ""
    const video = search.get("playVideo") || ""
    switch (id) {
      case "castle":
        setCastle(true)
        break
      case "referral":
        setReferral(true)
        break
    }
    if (video === 'true') {
      setPlayVideo(true)
      search.set("playVideo", "false")
      setSearch(search)
    }
  }, [search])

  const vid = document.getElementById("video");
  if (vid) {
    vid.onended = function() {
      setHideVideo(true)
    };
  }
  const switchNetwork = () => {
    // @ts-ignore
    const { ethereum } = window
    if (ethereum) {
      try {
        ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            bsc
          ]
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please, change network to BNB')
    }
  };

  const getAllInfo = async () => {
    // @ts-ignore
    const toWei = (amount, unit = "ether") => Web3.utils.toWei(amount, unit)
    // @ts-ignore
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)

    const nftContract = new ethers.Contract(contractAddress, abi, provider)
    const totalUsers = await nftContract.totalDeposits().catch(() => switchNetwork())

    setTotalMembers(Number(totalUsers))

    const totalBalance = await nftContract.getBalance()
    const compound = await nftContract.COMPOUND_STEP()
    const cooldown = await nftContract.WITHDRAW_COOLDOWN()
    const cutoff = await nftContract.CUTOFF_STEP()
    const inuitsPrice = await nftContract.getEggsYield(toWei('1'))
    setInuits(Number(inuitsPrice[0]) / bnbValue)
    // const compoundNowValue = await nftContract.COMPOUND_FOR_NO_TAX_WITHDRAWAL()

    setTotal(Number(totalBalance) / bnbValue)

    const user = await nftContract.users(account)
    const ifEggsExist = await nftContract.getEggsSinceLastHatch(account)
    if (user) {
      console.log(Number(compound))
      console.log(Number(cooldown))

      setProfit(Number(user.miners))
      setReferralPeople(Number(user.referralsCount))
      setReferralCount(Number(user.referralEggRewards) / bnbValue)
      setTotalDeposit(Number(user.initialDeposit) / bnbValue)
      setUserDeposit(Number(user.userDeposit) / bnbValue)
      setAtoms(Number(user.dailyCompoundBonus))
      setTime(Number(user.lastHatch) + Number(compound) - new Date().getTime() / 1000)
      setTimeSecond(Number(user.lastHatch) + Number(cooldown) - new Date().getTime() / 1000)
      setTimeThird(Number(user.lastHatch) + Number(cutoff) - new Date().getTime() / 1000)
    }
    if (Number(ifEggsExist) > 0) {
      const earnings = await nftContract.getAvailableEarnings(account)
      if (Number(earnings) > 0) {
        setIceBucket(Number(earnings) / bnbValue)
        setMiners(Number(earnings) / bnbValue || 0)
      }
    }

    if (Number(user.miners) > 0) {
      const profitValue = await nftContract.calculateEggSellForYield(
        (Number(user.miners) * 24 * 60 * 60).toString(),
        "1",
      )
      setBonus(Number(profitValue) / bnbValue)
    }
  }

  useEffect(() => {
    const id = setInterval(getAllInfo, 1000)
    return () => clearInterval(id)
  }, [setTotal, account])

  const handleClick = (value: string) => {
    switch (value) {
      case "castle":
        return setCastle(true)
      case "harvest":
        return setHarvest(true)
      case "referrals":
        return setReferral(true)
      case "stats":
        return setStats(true)
      case "calculator":
        return setCalculator(true)
      case "faq":
        return setFaq(true)
      case "timer":
        return setTimer(true)
    }
  }

  return (
    <div className="game-wrapper">
      <button onClick={() => setDropdown(true)} className="game-content-open">
        <img src={snowSrc} alt="snow" />
      </button>
      <Hives
        time={time}
        miners={profit}
        bonus={bonus}
        isModal={isM ? () => setDropdown(false) : undefined}
        className={cn("game-content-user", {
          show: dropdown,
        })}
      />
      <div className="game-content-menu">
        <button
          onMouseOver={() => {
            el?.classList.add("active")
          }}
          onMouseLeave={() => {
            el?.classList.remove("active")
          }}
          onClick={() => setMenu(!menu)}
          className="game-content-menu-btn"
        >
          <img src={menuSrc} alt="menu" />
        </button>
        {menu && (
          <div className="game-content-menu-content">
            {links.map((social, index) => (
              <>
                {social.onClick ? (
                  <button
                    onMouseOver={() => {
                      el?.classList.add("active")
                    }}
                    onMouseLeave={() => {
                      el?.classList.remove("active")
                    }}
                    key={index}
                    className="game-content-menu-content-btn"
                    onClick={() => handleClick(social.onClick)}
                  >
                    {social.title}
                  </button>
                ) : (
                  <a
                    onMouseOver={() => {
                      el?.classList.add("active")
                    }}
                    onMouseLeave={() => {
                      el?.classList.remove("active")
                    }}
                    className="game-content-menu-content-btn"
                    key={index}
                    href={social.route ? social.route : social.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.title}
                  </a>
                )}
              </>
            ))}
          </div>
        )}
      </div>
      <MapInteractionCSS
        minScale={0.65}
        translationBounds={{
          xMax: isM ? 500 : 300,
          yMax: isM ? 1000 : 700,
          xMin: isM ? -1100 : -500,
          yMin: isM ? -1200 : -700,
        }}
      >
        <div className="game">
          <ButtonGame
            onTouchEnd={isM ? () => setFaq(true) : undefined}
            text="FAQ"
            onClick={() => setFaq(true)}
            className="game-content-faq-btn"
          />
          <ButtonGame
            long
            text="Harvest snowflake"
            onTouchEnd={isM ? () => setHarvest(true) : undefined}
            onClick={() => setHarvest(true)}
            className="game-content-harvest-btn"
          />
          <ButtonGame
            text="Ice Castle"
            onTouchEnd={isM ? () => setCastle(true) : undefined}
            onClick={() => setCastle(true)}
            className="game-content-castle-btn"
          />
          <ButtonGame
            text="Timer"
            onTouchEnd={isM ? () => setTimer(true) : undefined}
            onClick={() => setTimer(true)}
            className="game-content-timer-btn"
          />
          <ButtonGame
            text="Calculator"
            onTouchEnd={isM ? () => setCalculator(true) : undefined}
            onClick={() => setCalculator(true)}
            className="game-content-calculator-btn"
          />
          <ButtonGame
            text="Stats"
            onTouchEnd={isM ? () => setStats(true) : undefined}
            onClick={() => setStats(true)}
            className="game-content-stats-btn"
          />
          <ButtonGame
            text="Referrals"
            onTouchEnd={isM ? () => setReferral(true) : undefined}
            onClick={() => setReferral(true)}
            className="game-content-referrals-btn"
          />
          <img onLoad={() => !playVideo && setLoading(false)} src={bgSrc} alt="game" className="game-img" />
        </div>
      </MapInteractionCSS>
      {loading && <Loading />}
      {playVideo && (
        <div className={cn('game-video', {
          hide: hideVideo
        })}>
          <video id='video' onLoadedData={() => setLoading(false)} muted autoPlay className="game-video-img">
            <source src={videoSrc} type="video/mp4" />
          </video>
          <Button
            text="Skip"
            onClick={() => setHideVideo(true)}
            className="game-video-btn"
          />
        </div>
      )}
      <Referrals
        address={account as string}
        people={referralPeople}
        money={referralCount}
        onClose={() => setReferral(false)}
        isOpen={referral}
      />
      <Stats
        inuits={inuits}
        userDeposit={userDeposit}
        total={total}
        deposit={totalDeposit}
        totalMembers={totalMembers}
        onClose={() => setStats(false)}
        isOpen={stats}
      />
      <Harvest
        timeOther={timeThird}
        time={timeSecond}
        iceBucket={iceBucket}
        atoms={atoms}
        onClose={() => setHarvest(false)}
        isOpen={harvest}
      />
      <Castle time={time} miners={profit} bonus={bonus} onClose={() => setCastle(false)} isOpen={castle} />
      <Calculator onClose={() => setCalculator(false)} isOpen={calculator} />
      <Timer onClose={() => setTimer(false)} isOpen={timer} />
      <FAQ onClose={() => setFaq(false)} isOpen={faq} />
    </div>
  )
}
