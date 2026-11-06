import SEO from '../components/SEO'
import CTA from '../components/CTA'
import { Section, SectionHeading, PageHeader } from '../components/Section'
import FeatureGrid from '../components/FeatureGrid'
import { services } from '../data/content'

export default function Services() {
  return (
    <>
      <SEO title="Services" description="AI chatbots, messaging automation, inbox, workflows, leads, campaigns and analytics in one platform." path="/services" />
      <PageHeader title="Services" text="AI chatbots, messaging automation, inbox, workflows, leads, campaigns and analytics in one platform." />
      <Section><FeatureGrid items={services} /></Section>
      <CTA />
    </>
  )
}
