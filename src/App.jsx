import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { about, composites, fieldNotes, profile, projects, stats } from './content.js'

const navItems = [['#archive', '档案'], ['#about', '关于'], ['#contact', '联系']]
const chapters = [
  { no: '01', eyebrow: 'FIELD NOTES', title: '场照纪实', target: '#field-notes', image: fieldNotes[2].src },
  { no: '02', eyebrow: 'SELECTED', title: '精选外景', target: '#selected', image: projects[5].image },
  { no: '03', eyebrow: 'COMPOSITES', title: '后期合成', target: '#postproduction', image: composites[2].image },
  { no: '04', eyebrow: 'PROFILE', title: '关于摄影师', target: '#about', image: profile.portrait },
]

function ImageFrame({ src, alt, eager = false }) {
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  const heroPhotos = [composites[3], composites[0], fieldNotes[2], projects[5]]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const go = (target) => {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }
  const changeHero = (step) => setHeroIndex((heroIndex + step + heroPhotos.length) % heroPhotos.length)

  return <main>
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <button className="brand" onClick={() => go('#home')} aria-label="返回首页">RIN <span>/ VISUAL</span></button>
      <nav className={`navlinks ${menuOpen ? 'open' : ''}`} aria-label="主导航">
        {navItems.map(([target, label]) => <button key={target} onClick={() => go(target)}>{label}</button>)}
      </nav>
      <button className="nav-contact" onClick={() => go('#contact')}>BOOKING <ArrowUpRight size={14}/></button>
      <button className="menu" aria-label={menuOpen ? '关闭菜单' : '打开菜单'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="hero-kicker">PHOTOGRAPHS<br/>FOR A MORE MEANINGFUL<br/>TOMORROW</p>
        <div><h1>VISUAL<br/>ARCHIVE <i>26</i></h1><p className="hero-cn">视觉档案</p></div>
        <p className="hero-note">STILLS. ATMOSPHERES. NARRATIVES.<br/>A PERSONAL ARCHIVE OF FRAMES,<br/>PLACES AND EMOTIONS.</p>
        <button className="text-link" onClick={() => go('#archive')}>ENTER ARCHIVE <ArrowDown size={14}/></button>
      </div>
      <div className="hero-visual">
        <ImageFrame src={heroPhotos[heroIndex].image || heroPhotos[heroIndex].src} alt="摄影作品主视觉" eager />
        <div className="hero-visual-copy"><span>STILL<br/>BEYOND<br/>TIME</span></div>
        <div className="hero-controls"><span>{String(heroIndex + 1).padStart(2, '0')} / {String(heroPhotos.length).padStart(2, '0')}</span><div className="hero-progress"><i style={{ width: `${(heroIndex + 1) / heroPhotos.length * 100}%` }}/></div><button onClick={() => changeHero(-1)} aria-label="上一张"><ArrowLeft size={16}/></button><button onClick={() => changeHero(1)} aria-label="下一张"><ArrowRight size={16}/></button></div>
      </div>
    </section>

    <section className="archive-index" id="archive">
      <div className="index-label"><span>ARCHIVE INDEX</span><i/></div>
      <div className="chapter-rail">{chapters.map(chapter => <button className="chapter-card" key={chapter.no} onClick={() => go(chapter.target)}><span className="chapter-no">{chapter.no}</span><ImageFrame src={chapter.image} alt="" eager/><span className="chapter-name"><small>{chapter.eyebrow}</small>{chapter.title}</span><ArrowUpRight size={16}/></button>)}</div>
    </section>

    <section className="project section-wrap" id="field-notes">
      <ProjectHeader no="01" title="场照纪实" labels={['FIELD NOTES','STILLS','NARRATIVES']} note="在人群、展架与流动光线之间，记录角色进入现实的瞬间。保留现场的空气，也保留被摄者真实的状态。" meta={['LOCATION / EXHIBITION','FORMAT / DIGITAL','YEAR / 2026']}/>
      <div className="cinema-grid field-cinema">{fieldNotes.map(photo => <figure key={photo.src} className={photo.className}><ImageFrame src={photo.src} alt={photo.alt}/><figcaption><span>{photo.index}</span><span>ON LOCATION</span></figcaption></figure>)}</div>
    </section>

    <section className="project section-wrap" id="selected">
      <ProjectHeader no="02" title="精选外景" labels={['PORTRAITS','PLACES','NATURAL LIGHT']} note="让环境、光线与角色共享画面。每一处留白、门窗和风景，都是人物叙事的一部分。" meta={['LOCATION / OUTDOORS','FORMAT / DIGITAL','YEAR / 2026']}/>
      <div className="cinema-grid selected-cinema">{projects.map(project => <figure key={project.no} className={project.format}><ImageFrame src={project.image} alt={project.title}/><figcaption><span>{project.no}</span><strong>{project.title}</strong><span>{project.tag}</span></figcaption></figure>)}</div>
    </section>

    <section className="project post-section section-wrap" id="postproduction">
      <ProjectHeader no="03" title="后期合成" labels={['COMPOSITES','ATMOSPHERES','IMAGINED WORLDS']} note="从实拍出发，重构光线、空间与氛围。合成不是掩盖现场，而是把角色没有说完的故事继续讲下去。" meta={['PROCESS / COMPOSITE','FORMAT / DIGITAL','YEAR / 2026']}/>
      <div className="cinema-grid post-cinema">{composites.map(item => <figure key={item.no} className={item.format}><ImageFrame src={item.image} alt={`后期合成作品：${item.title}`}/><figcaption><span>{item.no}</span><strong>{item.title}</strong><span>POST-PRODUCTION</span></figcaption></figure>)}</div>
    </section>

    <section className="about section-wrap" id="about">
      <ProjectHeader no="04" title="关于摄影师" labels={['PROFILE','SHANGHAI','AVAILABLE WORLDWIDE']} note={about.intro}/>
      <div className="about-layout"><figure><ImageFrame src={profile.portrait} alt="摄影师与拍摄器材工作照"/></figure><div className="about-copy"><p className="handle">{about.handle}</p><h3>{about.headline}</h3><p>{about.service}</p><div className="stats">{stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div></div>
    </section>

    <footer id="contact" className="section-wrap">
      <div className="footer-top"><span>05 / CONTACT</span><span>2026 档期开放中</span></div><h2>MAKE THE<br/>IMAGE <em>REAL.</em></h2>
      <div className="contact-lines"><div><span>WECHAT</span><strong>{profile.wechat}</strong></div><a href={`mailto:${profile.email}`}><span>EMAIL</span><strong>{profile.email}</strong><ArrowUpRight/></a></div>
      <div className="footer-bottom"><span>© 2026 RIN / VISUAL</span><span>SHANGHAI, CHINA</span><button onClick={() => go('#home')}>BACK TO TOP <ArrowUpRight size={13}/></button></div>
    </footer>
  </main>
}

function ProjectHeader({ no, title, labels, note, meta = [] }) {
  return <header className="project-header"><div><strong>{no}</strong><h2>{title}</h2><span className="short-rule"/></div><p>{labels.map(label => <span key={label}>{label}<br/></span>)}</p><div className="project-note"><span>PROJECT NOTE</span><p>{note}</p>{meta.length > 0 && <small>{meta.map(item => <span key={item}>{item}<br/></span>)}</small>}</div></header>
}

export default App
