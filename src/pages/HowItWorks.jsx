import SEO from '../components/SEO'
import CTA from '../components/CTA'
import { Section, SectionHeading, PageHeader } from '../components/Section'
import Steps from '../components/Steps'

export default function HowItWorks() {
  return (
    <>
      <SEO title="How it works" description="Go from sign-up to automated conversations in a few simple steps." path="/how-it-works" />
      <PageHeader title="How it works" text="Go from sign-up to automated conversations in a few simple steps." />
      <Section><Steps /></Section>
      <CTA />
    </>
  )
}
