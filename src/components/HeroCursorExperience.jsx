import Button from './Button'
import HeroChatbot from './HeroChatbot'
import HeroLiquid from './HeroLiquid'
import HeroRobot from './HeroRobot'
import { SIGNUP_URL } from '../config'

export default function HeroCursorExperience() {
  return (
    <section aria-label="ChatBotz introduction">
      <div className="cursor-hero">
        <div className="cursor-hero-wordmark" aria-hidden="true">ChatBotz</div>
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Your conversations, connected</p>
            <h1 className="hero-robot-title">Meet ChatBotz,<br />your AI teammate.</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">AI chatbots that answer questions, automate conversations, and help your team turn every message into an opportunity.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3"><Button href={SIGNUP_URL}>Get started free</Button><Button to="/platform" variant="secondary">Explore the platform</Button></div>
            <div className="hero-robot-stage">
              <HeroRobot />
            </div>
          </div>
        </div>
        <HeroLiquid />
      </div>
      <div className="container-x relative z-10 pb-20 pt-8 sm:pt-14">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-6 text-center"><p className="text-xs uppercase tracking-[0.18em] text-neutral-500">From scattered messages to one workspace</p><h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Every conversation. Connected.</h2></div>
          <HeroChatbot />
        </div>
      </div>
    </section>
  )
}
