import { Bot, MessageCircle, Share2, Inbox, Workflow, Users, Megaphone, BarChart3, Shirt, Utensils, Hotel, Stethoscope, Building2, GraduationCap, Store, Sparkles } from 'lucide-react'

export const services = [
  { icon: Bot, title: 'AI Chatbots', text: 'Build chatbots that answer common questions, guide customers and hand over to your team when a person is needed.' },
  { icon: MessageCircle, title: 'WhatsApp Automation', socials: ['whatsapp'], text: 'Automate replies and follow-ups on WhatsApp so customers get quick answers at any hour.' },
  { icon: Share2, title: 'Instagram & Facebook Automation', socials: ['instagram', 'facebook'], text: 'Respond to messages from Instagram and Facebook with the same automation you use everywhere else.' },
  { icon: Inbox, title: 'Unified Inbox', text: 'See every conversation from every channel in one inbox and reply without switching tabs.' },
  { icon: Workflow, title: 'Workflow Automation', text: 'Set up rules that route chats, tag contacts and trigger follow-ups automatically.' },
  { icon: Users, title: 'Lead Management', text: 'Capture contacts from conversations and track each lead from first message to follow-up.' },
  { icon: Megaphone, title: 'Marketing Campaigns', text: 'Reach your contacts with planned campaigns and keep the conversation going after they reply.' },
  { icon: BarChart3, title: 'Analytics', text: 'Understand conversation volume, response performance and campaign results in one place.' },
]

export const solutions = [
  { icon: Shirt, title: 'Clothing stores', text: 'Answer product and availability questions, share offers and follow up with interested shoppers.' },
  { icon: Utensils, title: 'Restaurants', text: 'Handle menu questions, table enquiries and order conversations without tying up your staff.' },
  { icon: Hotel, title: 'Hotels', text: 'Reply to room and booking enquiries quickly and keep guest conversations organized.' },
  { icon: Stethoscope, title: 'Clinics', text: 'Respond to appointment enquiries and common patient questions, then pass details to your front desk.' },
  { icon: Building2, title: 'Real estate', text: 'Qualify enquiries, capture buyer details and follow up with every lead.' },
  { icon: GraduationCap, title: 'Education', text: 'Answer admission and course questions and keep track of every prospective student.' },
  { icon: Store, title: 'Other businesses', text: 'Any business that talks to customers on messaging apps can automate its everyday conversations.' },
]

export const steps = [
  { title: 'Create your account', text: 'Sign up for ChatBotz and start with the Free plan.' },
  { title: 'Connect your channels', text: 'Bring your messaging channels into one workspace.' },
  { title: 'Build your chatbot and workflows', text: 'Set up how your chatbot replies and what should happen next.' },
  { title: 'Manage conversations and leads', text: 'Reply from the unified inbox and track every lead.' },
  { title: 'Measure and improve', text: 'Use analytics and campaigns to refine what works.' },
]

export const features = [
  { icon: Bot, title: 'AI chatbot builder', text: 'Create automated conversations for your business.' },
  { icon: Inbox, title: 'Shared team inbox', text: 'One place for every customer conversation.' },
  { icon: MessageCircle, title: 'WhatsApp, Instagram & Facebook', socials: ['whatsapp', 'instagram', 'facebook'], text: 'Automate the messaging channels your customers use.' },
  { icon: Workflow, title: 'Automation workflows', text: 'Rules that handle routing, tagging and follow-ups.' },
  { icon: Users, title: 'Lead capture & tracking', text: 'Keep every lead and its conversation together.' },
  { icon: Megaphone, title: 'Campaigns', text: 'Plan and send messages to your contacts.' },
  { icon: BarChart3, title: 'Analytics & reporting', text: 'See how conversations and campaigns perform.' },
  { icon: Sparkles, title: 'Human handover', text: 'Step in whenever a customer needs a real person.' },
]

// NOTE: Edit prices and plan contents here to match your real plans.
// A plan with price: null shows "Contact us" instead of a number.
export const plans = [
  { name: 'Free', price: 'Free', note: 'Try ChatBotz and explore the basics.', cta: 'Start free', features: ['Core chatbot builder', 'Unified inbox', 'Basic analytics'] },
  { name: 'Starter', price: null, note: 'For small businesses starting to automate.', cta: 'Get Starter', features: ['Everything in Free', 'Messaging channel automation', 'Lead management'] },
  { name: 'Growth', price: null, note: 'For teams scaling conversations.', cta: 'Get Growth', popular: true, features: ['Everything in Starter', 'Workflow automation', 'Marketing campaigns'] },
  { name: 'Business', price: null, note: 'For larger teams and advanced needs.', cta: 'Talk to us', features: ['Everything in Growth', 'Advanced analytics', 'Priority support'] },
]

export const faqs = [
  { q: 'What is ChatBotz?', a: 'ChatBotz is a platform for automating customer conversations. It combines AI chatbots, a unified inbox, workflows, lead management, campaigns and analytics.' },
  { q: 'Which channels can I automate?', a: 'ChatBotz supports WhatsApp, Instagram and Facebook automation, with all conversations managed in one inbox.' },
  { q: 'Do I need technical skills?', a: 'No. You set up chatbots and workflows from the ChatBotz dashboard.' },
  { q: 'Can my team take over a conversation?', a: 'Yes. Your team can reply from the unified inbox whenever a customer needs a person.' },
  { q: 'Is there a free plan?', a: 'Yes. You can start on the Free plan and move to Starter, Growth or Business when you need more.' },
  { q: 'How do I get help?', a: 'Use the Contact page to send us a message and we will get back to you.' },
]
