import SEO from '../components/SEO'
import CTA from '../components/CTA'
import { Section, SectionHeading, PageHeader } from '../components/Section'
import PricingCards from '../components/PricingCards'

export default function Pricing() {
  return (
    <>
      <SEO title="Pricing" description="Start free, then choose Starter, Growth or Business as your needs grow." path="/pricing" />
      <PageHeader title="Pricing" text="Start free, then choose Starter, Growth or Business as your needs grow." />
      <Section><PricingCards /></Section>
      <CTA />
    </>
  )
}
