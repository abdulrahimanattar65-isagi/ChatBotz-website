import SEO from '../components/SEO'
import CTA from '../components/CTA'
import { Section, SectionHeading, PageHeader } from '../components/Section'
import FeatureGrid from '../components/FeatureGrid'
import { features } from '../data/content'

export default function Features() {
  return (
    <>
      <SEO title="Features" description="Explore the major capabilities of the ChatBotz platform." path="/features" />
      <PageHeader title="Features" text="Explore the major capabilities of the ChatBotz platform." />
      <Section><FeatureGrid items={features} /></Section>
      <CTA />
    </>
  )
}
