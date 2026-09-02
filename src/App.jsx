import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { about, composites, fieldNotes, profile, projects, stats } from './content.js'

const navItems = [['#about', '关于'], ['#works', '作品'], ['#postproduction', '后期'], ['#contact', '联系']]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (target) => {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

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
      <img className="hero-image" src={composites[3].image} alt="后期合成作品：危城红影" loading="eager" fetchPriority="high" decoding="async"/>
      <div className="hero-dim"/>
      <div className="hero-meta"><span>COSPLAY PHOTOGRAPHER</span><span>SHANGHAI / 2026</span></div>
      <div className="hero-title"><p>PHOTOGRAPHY &amp; POST-PRODUCTION</p><h1>RIN <i>/</i><br/>VISUAL</h1></div>
      <button className="hero-scroll" onClick={() => go('#about')} aria-label="继续浏览">INDEX <ArrowDown size={14}/></button>
    </section>

    <section className="intro section-wrap" id="about">
      <div className="chapter"><span>01</span><span>PROFILE / 关于</span></div>
      <div className="intro-grid">
        <h2>让角色从设定里走出来，<br/><em>在现实中留下证据。</em></h2>
        <div className="intro-copy"><p className="handle">{about.handle}</p><p>{about.intro}</p><p>{about.service}</p></div>
      </div>
      <div className="profile-strip">
        <figure><img src={profile.portrait} alt="摄影师与拍摄器材工作照" loading="lazy" decoding="async"/></figure>
        <div className="profile-facts">{stats.map(([value, label]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      </div>
    </section>

    <section className="field-notes section-wrap" id="works">
      <div className="chapter"><span>02</span><span>FIELD NOTES / 场照纪实</span></div>
      <div className="section-intro"><h2>现场不是背景，<br/>它是照片的一部分。</h2><p>在人群、展架与流动光线之间，快速捕捉角色进入现实的瞬间。</p></div>
      <div className="field-grid">{fieldNotes.map(photo => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" decoding="async"/><figcaption><span>{photo.index} / ON LOCATION</span><span>AVAILABLE LIGHT + FLASH</span></figcaption></figure>)}</div>
    </section>

    <section className="selected section-wrap">
      <div className="chapter"><span>03</span><span>SELECTED PHOTOGRAPHS / 精选外景</span></div>
      <div className="selected-grid">{projects.map(project => <figure key={project.no}><img src={project.image} alt={project.title} loading="lazy" decoding="async"/><figcaption><span>{project.no}</span><strong>{project.title}</strong><small>{project.tag}</small></figcaption></figure>)}</div>
    </section>

    <section className="post section-wrap" id="postproduction">
      <div className="chapter"><span>04</span><span>POST-PRODUCTION / 后期合成</span></div>
      <div className="post-heading"><h2>从实拍出发，<br/>抵达想象之外。</h2><p>场景重构、氛围塑造与视觉特效。每一张合成都从原始光线与角色气质出发。</p></div>
      <div className="post-grid">{composites.map(item => <figure className={item.format} key={item.no}><img src={item.image} alt={`后期合成作品：${item.title}`} loading="lazy" decoding="async"/><figcaption><span>{item.no} / POST-PRODUCTION</span><strong>{item.title}</strong></figcaption></figure>)}</div>
    </section>

    <section className="capabilities section-wrap" id="skills">
      <div className="chapter"><span>05</span><span>CAPABILITIES / 创作能力</span></div>
      <div className="capability-list"><p>角色理解 <span>Character study</span></p><p>光影构建 <span>Light design</span></p><p>现场拍摄 <span>On-location</span></p><p>后期合成 <span>Post-production</span></p></div>
    </section>

    <footer id="contact" className="section-wrap">
      <div className="chapter"><span>06</span><span>CONTACT / 联系合作</span></div>
      <div className="footer-title"><p>2026 档期开放中</p><h2>LET'S MAKE<br/>THE IMAGE <em>REAL.</em></h2></div>
      <div className="contact-lines">
        <div><span>WECHAT</span><strong>{profile.wechat}</strong></div>
        <a href={`mailto:${profile.email}`}><span>EMAIL</span><strong>{profile.email}</strong><ArrowUpRight/></a>
      </div>
      <div className="footer-bottom"><span>© 2026 RIN / VISUAL</span><span>SHANGHAI, CHINA</span><button onClick={() => go('#home')}>BACK TO TOP ↑</button></div>
    </footer>
  </main>
}

export default App
