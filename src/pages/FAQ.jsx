import SEO from '../components/SEO'
import CTA from '../components/CTA'
import { Section, SectionHeading, PageHeader } from '../components/Section'
import Accordion from '../components/Accordion'
import { faqs } from '../data/content'

export default function FAQ() {
  return (
    <>
      <SEO title="Frequently asked questions" description="Answers to common questions about ChatBotz." path="/faq" />
      <PageHeader title="Frequently asked questions" text="Answers to common questions about ChatBotz." />
      <Section><Accordion items={faqs} /></Section>
      <CTA />
    </>
  )
}
