import { hrefs, routes } from "utils"

export const links = [
  {
    title: "Map",
    onClick: "map",
  },
  {
    title: "Ice Castle",
    onClick: "castle",
  },
  {
    title: "Harvest Snowflake",
    onClick: "harvest",
  },
  {
    title: "Referrals",
    onClick: "referrals",
  },
  {
    title: "Stats",
    onClick: "stats",
  },
  {
    title: "Calculator",
    onClick: "calculator",
  },
  {
    title: "FAQ",
    onClick: "faq",
  },
  {
    title: "Timer",
    onClick: "timer",
  },
  {
    title: "Docs",
    link: hrefs.docs,
  },
  {
    title: "Twitter",
    link: hrefs.twitter,
  },
  {
    title: "Telegram",
    link: hrefs.telegram,
  },
  {
    title: "BSCScan",
    link: hrefs.scan,
  },
  {
    title: "Homepage",
    route: routes.index,
  },
]
