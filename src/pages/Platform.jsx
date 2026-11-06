import SEO from '../components/SEO'
import CTA from '../components/CTA'
import { Section, SectionHeading, PageHeader } from '../components/Section'
import ChatDemo from '../components/ChatDemo'
import DashboardMockup from '../components/DashboardMockup'
import FeatureGrid from '../components/FeatureGrid'
import { services } from '../data/content'

export default function Platform() {
  return (
    <>
      <SEO title="Platform" description="One platform to automate conversations, manage your inbox and track leads." path="/platform" />
      <PageHeader title="Platform" text="One platform to automate conversations, manage your inbox and track leads." />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">One workspace for every customer conversation</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-400">ChatBotz connects your messaging channels, chatbots and team in a single platform. Automate routine replies, step in when a person is needed, and keep every lead and campaign in view.</p>
          </div>
          <DashboardMockup />
        </div>
      </Section>
      <Section className="bg-surface-900/40">
        <SectionHeading title="What the platform can do" />
        <FeatureGrid items={services} />
      </Section>
      <Section>
        <div className="flex flex-col items-center gap-10">
          <SectionHeading title="See a chatbot in action" text="A sample conversation for illustration." />
          <ChatDemo />
        </div>
      </Section>
      <CTA />
    </>
  )
}
