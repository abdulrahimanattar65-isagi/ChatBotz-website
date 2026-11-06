import SEO from '../components/SEO'
import CTA from '../components/CTA'
import FeatureGrid from '../components/FeatureGrid'
import { Section, PageHeader } from '../components/Section'
import { Bot, Users, Inbox } from 'lucide-react'

const values = [
  { icon: Bot, title: 'Automation that helps', text: 'We build tools that take repetitive messaging work off your plate.' },
  { icon: Users, title: 'People stay in control', text: 'Your team can step into any conversation at any time.' },
  { icon: Inbox, title: 'Simple by design', text: 'One platform, one inbox, clear tools for everyday business.' },
]

export default function About() {
  return (
    <>
      <SEO title="About us" description="ChatBotz helps businesses automate customer conversations while keeping people in control." path="/about" />
      <PageHeader title="About ChatBotz" text="ChatBotz helps businesses handle customer conversations faster by combining AI chatbots, messaging automation and lead management in one platform." />
      <Section><FeatureGrid items={values} cols="lg:grid-cols-3" /></Section>
      <CTA />
    </>
  )
}
