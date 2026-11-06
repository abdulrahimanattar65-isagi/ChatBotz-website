import SEO from '../components/SEO'
import CTA from '../components/CTA'
import { Section, SectionHeading, PageHeader } from '../components/Section'
import FeatureGrid from '../components/FeatureGrid'
import { solutions } from '../data/content'

export default function Solutions() {
  return (
    <>
      <SEO title="Solutions" description="See how businesses like stores, restaurants, hotels, clinics, real estate and schools can use ChatBotz." path="/solutions" />
      <PageHeader title="Solutions" text="See how businesses like stores, restaurants, hotels, clinics, real estate and schools can use ChatBotz." />
      <Section><FeatureGrid items={solutions} cols="lg:grid-cols-3" /></Section>
      <CTA />
    </>
  )
}
