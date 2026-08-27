import { ArrowDownRight, ArrowUpRight, Aperture, Focus, Layers3, Mail, Menu, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { about, composites, fieldNotes, profile, projects, stats } from './content.js'
import { initMotion } from './motion.js'

const capabilities = [
  { icon: Focus, no: '01', title: '角色理解', en: 'CHARACTER STUDY', text: '从设定、性格到情绪弧光，为每次拍摄建立准确的叙事内核。' },
  { icon: Aperture, no: '02', title: '光影构建', en: 'LIGHT DESIGN', text: '用克制的布光和色彩关系，塑造具有电影感的二次元视觉。' },
  { icon: Layers3, no: '03', title: '全案执行', en: 'FULL PRODUCTION', text: '前期策划、场景勘察、现场拍摄与后期精修，全流程统一完成。' },
  { icon: Sparkles, no: '04', title: '风格定制', en: 'ART DIRECTION', text: '拒绝批量模板，为每位创作者建立独一无二的画面语言。' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll(); window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => initMotion(), [])

  const go = (id) => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  return <main>
    <div className="opening-curtain" aria-hidden="true"><span>RIN / VISUAL</span><i/></div>
    <header className={scrolled ? 'nav scrolled' : 'nav'}>
      <button className="brand" onClick={() => go('#home')}>RIN<span>©26</span></button>
      <nav className={menuOpen ? 'navlinks open' : 'navlinks'}>
        <button onClick={() => go('#about')}>关于</button><button onClick={() => go('#works')}>作品</button><button onClick={() => go('#postproduction')}>后期</button><button onClick={() => go('#skills')}>能力</button>
      </nav>
      <button className="contact-pill" onClick={() => go('#contact')}>预约拍摄 <ArrowUpRight size={16}/></button>
      <button className="menu" aria-label="菜单" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section className="hero" id="home">
      <video className="hero-video" autoPlay muted loop playsInline poster={projects[0].image}><source src={profile.heroVideo} type="video/mp4" /></video>
      <div className="hero-wash"/><div className="noise"/>
      <div className="hero-content">
        <div className="eyebrow"><span className="dot"/> COSPLAY PHOTOGRAPHER / 2026</div>
        <h1 className="hero-title-cn"><span>让幻想，</span><span>留在现实<i>。</i></span></h1>
        <div className="hero-bottom">
          <p>{profile.tagline}<br/><small>{profile.location}</small></p>
          <button className="round-button" onClick={() => go('#works')} aria-label="查看作品"><ArrowDownRight/></button>
        </div>
      </div>
      <div className="side-label">SCROLL TO EXPLORE <span>↓</span></div>
    </section>

    <section className="about wrap" id="about">
      <div className="section-tag"><span>01</span> PROFILE / 关于我</div>
      <div className="about-grid">
        <div className="portrait-frame"><img src={profile.portrait} alt="摄影师相机与拍摄器材工作照"/><span>TOOLS OF THE TRADE</span></div>
        <div className="about-copy">
          <div className="about-handle">{about.handle}</div>
          <p className="lead">{about.headline.split('，')[0]}，<br/><span>{about.headline.split('，')[1]}</span></p>
          <div className="bio-columns">
            <p>{about.intro}</p>
            <p>{about.service}</p>
          </div>
          <div className="mini-contact"><span>CONTACT</span><a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={15}/></a><span>WECHAT / {profile.wechat}</span></div>
        </div>
      </div>
      <div className="stats">{stats.map(([num,label]) => <div key={label}><strong>{num}</strong><span>{label}</span></div>)}</div>
    </section>

    <section className="field-notes wrap" id="works">
      <div className="section-tag"><span>02</span> EVENT FIELD NOTES / 场照纪实</div>
      <div className="field-intro">
        <h2>场照纪实<br/><i>正在发生的现场。</i></h2>
        <div><span>ON-SITE PORTRAITS · 2026</span><p>在人群、展架与流动光线之间，快速捕捉角色进入现实的瞬间。保留现场的呼吸，也保留每个人独特的表达。</p></div>
      </div>
      <div className="field-gallery">{fieldNotes.map(photo => <figure className={photo.className} key={photo.src}>
        <div className="field-image"><img src={photo.src} alt={photo.alt}/><span>{photo.index}</span></div>
        <figcaption><span>FIELD NOTE / {photo.index}</span><span>AVAILABLE LIGHT + FLASH</span></figcaption>
      </figure>)}</div>
      <div className="field-end"><span>END OF SERIES</span><span>06 FRAMES / ON LOCATION</span></div>
    </section>

    <section className="works selected-works"><div className="wrap">
      <div className="section-head"><div className="section-tag"><span>03</span> SELECTED PHOTOGRAPHS / 精选照片</div><p>让照片成为主体，<br/>分类只负责提供线索。</p></div>
      <div className="project-list">{projects.map((p,i) => <article className="project" key={p.title}>
        <img src={p.image} alt={p.title}/><div className="project-shade"/><span className="project-no">{p.no}</span>
        <button aria-label={`查看 ${p.title}`}><ArrowUpRight/></button>
      </article>)}</div>
    </div></section>

    <section className="composite-works" id="postproduction"><div className="wrap">
      <div className="composite-head">
        <div className="section-tag light"><span>04</span> POST-PRODUCTION / 后期合成</div>
        <h2>让现场延伸至<br/><i>想象之外。</i></h2>
        <p>从实拍光影出发，通过场景重构、氛围塑造与视觉特效，完成角色世界观的第二次创作。</p>
      </div>
      <div className="composite-grid">{composites.map(item => <figure className={`composite-card ${item.format}`} key={item.no}>
        <img src={item.image} alt={`后期合成作品：${item.title}`}/>
        <figcaption><span>{item.no} / POST-PRODUCTION</span><strong>{item.title}</strong></figcaption>
      </figure>)}</div>
    </div></section>

    <section className="skills wrap" id="skills">
      <div className="section-tag"><span>05</span> CAPABILITIES / 创作能力</div>
      <div className="skills-title"><h2>从灵感到成片，<br/>保持同一种<span>审美精度。</span></h2><p>IDEA → FRAME → FINAL</p></div>
      <div className="skill-grid">{capabilities.map(({icon:Icon,...c}) => <article key={c.no}><div><span>{c.no}</span><Icon size={28}/></div><h3>{c.title}</h3><small>{c.en}</small><p>{c.text}</p></article>)}</div>
    </section>

    <footer id="contact">
      <div className="contact-glow"/><div className="footer-inner wrap">
        <div className="section-tag light"><span>06</span> START A PROJECT / 联系合作</div>
        <p className="available"><span className="dot"/> 2026 档期开放中</p>
        <h2>LET'S CREATE<br/><i>SOMETHING</i> REAL.</h2>
        <div className="footer-contacts">
          <div className="contact-row"><span>WECHAT / 微信</span><strong>{profile.wechat}</strong></div>
          <a className="mail-link" href={`mailto:${profile.email}`}><span>EMAIL / 邮箱</span><strong>{profile.email}</strong><ArrowUpRight/></a>
        </div>
        <div className="footer-bottom"><span>© 2026 {profile.name} VISUAL</span><span>SHANGHAI · CHINA</span><button onClick={() => go('#home')}>BACK TO TOP ↑</button></div>
      </div>
    </footer>
  </main>
}

export default App
