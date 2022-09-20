import { Collapse, Modal } from "components"

import "./FAQ.scss"

type Props = {
  onClose: () => void
  isOpen: boolean
}

export const FAQ = ({ onClose, isOpen }: Props): JSX.Element => {
  return (
    <Modal width={640} height={890} faq className="faq" isOpen={isOpen} onClose={onClose} title="FAQ">
      <p className="faq-desc">
        If you didn&apos;t find what you were looking for, <br /> ask in our group
      </p>
      <div className="faq-content-wrapper">
        <div className="faq-scroll">
          <Collapse
            desc="The Age Of Mining is a Dapp built on multi-chain, you can earn about 6% per day in a best gaming experience.
The daily percentage return depends on the actions of INUITS efficiency, when you hire INUITS they will keep collecting for you every day, they can bring you an average return of 6% every day.
Once INUITS is purchased, they cannot be fired, and the investment made to rehire them (by hiring or rehiring) cannot be recovered. However, once hired, INUITS will not stop collecting.
"
            title="What is Age Of Mining?"
          />
          <Collapse
            desc="The answer is obvious, because Age Of Mining is a sustainable development project, Age Of Mining will have different types of development in the future, such as NFT, GameFi and mining farms on multiple networks. And there are many projects to ensure the life cycle of the project. These anti-dumping measures include maximum deposits, as well as cut-off times and cooling-off times for withdrawals."
            title="Why Age Of Mining?"
          />
          <Collapse
            desc="The best strategy that the team can recommend is to compound for 10 days in a row and then harvest once. This will increase the users' investment at the same time increasing the daily yield earnings. This strategy has already been tried and tested by several project and is proven effective both for the short and long term."
            title="What is the best strategy?"
          />
          <Collapse
            desc="There is no difference whether you've invested seconds or month after the launch. Everybody will get their 6% no matter when the join. "
            title="When is the best time to invest?"
          />
          <Collapse
            desc='The yield is up to 6% daily. The reason why it&apos;s "up to" is because it fluctuates based on how often you sell, compound as well as total value locked. '
            title="What is my yield?"
          />
          <Collapse
            desc="Once you hired INUITS, your initial is locked into the contract balance which rewards you with a 6% yield daily. You'll get back your initial and even more, but it takes some time. "
            title="Do I get my initial back?"
          />
          <Collapse
            desc="Yes, we have passed the audit of our contract. So there are no vulnerabilities. No one will be able to hack it or steal all money."
            title="Is it safe to invest?"
          />
        </div>
      </div>
    </Modal>
  )
}