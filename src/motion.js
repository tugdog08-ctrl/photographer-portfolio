import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    gsap.set('.opening-curtain', { display: 'none' })
    return () => {}
  }

  const ctx = gsap.context(() => {
    const opening = gsap.timeline({ defaults: { ease: 'power4.inOut' } })
    opening
      .set('body', { overflow: 'hidden' })
      .from('.opening-curtain span', { yPercent: 140, duration: 1.15 })
      .from('.opening-curtain i', { scaleX: 0, duration: .9 }, '-=.7')
      .to('.opening-curtain span', { yPercent: -140, duration: .8, delay: .25 })
      .to('.opening-curtain', { clipPath: 'inset(0 0 100% 0)', duration: 1.25 }, '-=.5')
      .set('.opening-curtain', { display: 'none', pointerEvents: 'none' })
      .set('body', { overflow: '' })
      .from('.nav', { yPercent: -120, duration: .9 }, '-=.65')
      .from('.eyebrow', { opacity: 0, y: 25, duration: .8 }, '-=.7')
      .from('.hero-title-cn span', { yPercent: 115, scaleX: .72, transformOrigin: 'left center', duration: 1.45, stagger: .16 }, '-=.65')
      .set('.hero-title-cn span', { overflow: 'visible' })
      .from('.hero-bottom, .side-label', { opacity: 0, y: 35, duration: .9, stagger: .12 }, '-=.6')

    gsap.to('.hero-video', {
      yPercent: 12, scale: 1.06, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
    })

    document.querySelectorAll('.section-tag').forEach((tag) => {
      gsap.from(tag, {
        xPercent: -22, opacity: 0, duration: 1.25, ease: 'power4.out',
        scrollTrigger: { trigger: tag, start: 'top 88%', once: true },
      })
    })

    const headingGroups = ['.about-copy .lead', '.field-intro h2', '.skills-title h2', 'footer h2']
    headingGroups.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => gsap.from(el, {
        y: 110, scaleX: .78, opacity: 0, transformOrigin: 'left center', duration: 1.5, ease: 'expo.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }))
    })

    const revealGroups = [
      ['.about-grid', '.portrait-frame, .about-copy'],
      ['.field-gallery', 'figure'],
      ['.selected-works .project-list', '.project'],
      ['.skill-grid', 'article'],
      ['.stats', '.stats > div'],
    ]
    revealGroups.forEach(([trigger, targets]) => {
      const items = gsap.utils.toArray(targets)
      if (!items.length) return
      gsap.from(items, {
        y: 80, opacity: 0, clipPath: 'inset(18% 0 0 0)', duration: 1.35, stagger: .14, ease: 'power4.out', immediateRender: false,
        scrollTrigger: { trigger, start: 'top 82%', once: true },
      })
    })

    document.querySelectorAll('.field-image img, .selected-works .project img').forEach((img) => {
      gsap.fromTo(img, { scale: 1.12 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
      })
    })

    gsap.from('.footer-contacts > *', {
      xPercent: -12, opacity: 0, duration: 1.2, stagger: .16, ease: 'power4.out',
      scrollTrigger: { trigger: '.footer-contacts', start: 'top 88%', once: true },
    })
  })

  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh, { once: true })
  return () => { window.removeEventListener('load', refresh); ctx.revert() }
}
