import SEO from '../components/SEO'
import Button from '../components/Button'
import HeroCursorExperience from '../components/HeroCursorExperience'
import FeatureGrid from '../components/FeatureGrid'
import Steps from '../components/Steps'
import CTA from '../components/CTA'
import { Section, SectionHeading } from '../components/Section'
import { services, solutions } from '../data/content'

export default function Home() {
  return (
    <>
      <SEO description="ChatBotz helps businesses automate WhatsApp, Instagram and Facebook conversations with AI chatbots, a unified inbox, workflows, lead management, campaigns and analytics." />
      <HeroCursorExperience />

      <Section>
        <SectionHeading title="Everything you need to talk to customers at scale" text="Eight connected services in one platform." />
        <FeatureGrid items={services} />
        <div className="mt-10 text-center"><Button to="/services" variant="secondary">See all services</Button></div>
      </Section>

      <Section className="bg-surface-900/40">
        <SectionHeading title="Built for businesses that talk to customers every day" />
        <FeatureGrid items={solutions.slice(0, 4)} />
        <div className="mt-10 text-center"><Button to="/solutions" variant="secondary">Explore solutions</Button></div>
      </Section>

      <Section>
        <SectionHeading title="How it works" text="From sign-up to your first automated conversation in five steps." />
        <Steps />
      </Section>
      <CTA />
    </>
  )
}
