import { useEffect } from 'react'
import { SITE_URL } from '../config'

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const m = selector.match(/\[(.+?)="(.+?)"\]/)
    el.setAttribute(m[1], m[2])
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export default function SEO({ title, description, path = '/' }) {
  useEffect(() => {
    const full = title ? `${title} | ChatBotz` : 'ChatBotz – AI Chatbots & Messaging Automation for Business'
    document.title = full
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', full)
    setMeta('meta[property="og:description"]', 'content', description)
    if (SITE_URL) setMeta('link[rel="canonical"]', 'href', SITE_URL + path)
  }, [title, description, path])
  return null
}
