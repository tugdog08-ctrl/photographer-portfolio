// 内容与素材替换入口：把链接改成你的本地文件（建议放在 public/media/）或线上地址即可。
// Version the photos so mobile browsers do not reuse an earlier cached 404
// from the short window while GitHub Pages was still publishing the assets.
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}?v=20260902-1`

export const profile = {
  name: 'RIN',
  role: 'COSPLAY PHOTOGRAPHER',
  tagline: '让幻想，在现实中留下证据。',
  location: 'Shanghai · Available Worldwide',
  email: 'tugdog08@gmail.com',
  wechat: 'xiaotugou0828',
  portrait: asset('/media/profile/about-equipment.jpg'),
  heroVideo: asset('/media/hero-video.mp4'),
}

export const about = {
  handle: 'CN小土狗 / 08 男摄',
  headline: '耐心沟通，认真还原每一份独特的美。',
  intro: '拍摄时习惯先观察人物与环境，再通过光线、构图和场景关系突出客人的特点。比起套用固定模板，我更在意画面是否真正适合镜头前的人。',
  service: '同时承接后期精修、视觉特效、大型合成与背景替换。从现场拍摄到最终成片，可以独立完成完整的视觉制作流程。',
}

export const projects = [
  { no: '01', title: '伞下肖像', tag: '阴天 · 留白构图', year: '2026', image: asset('/media/selected/selected-01.jpg'), format: 'landscape' },
  { no: '02', title: '园林窗景', tag: '自然光 · 圆窗构成', year: '2026', image: asset('/media/selected/selected-02.jpg'), format: 'landscape' },
  { no: '03', title: '暗调角色', tag: '侧光 · 影子叙事', year: '2026', image: asset('/media/selected/selected-03.jpg'), format: 'portrait' },
  { no: '04', title: '街角花束', tag: '环境人像 · 日间', year: '2026', image: asset('/media/selected/selected-04.jpg'), format: 'landscape' },
  { no: '05', title: '灯火微光', tag: '蓝调 · 道具光', year: '2026', image: asset('/media/selected/selected-05.jpg'), format: 'landscape' },
  { no: '06', title: '园林门景', tag: '对称构图 · 雨后', year: '2026', image: asset('/media/selected/selected-06.jpg'), format: 'landscape' },
]

export const composites = [
  { no: '01', title: '深海异变', image: asset('/media/composites/composite-01.jpg'), format: 'landscape' },
  { no: '02', title: '蝶影战术', image: asset('/media/composites/composite-02.jpg'), format: 'portrait' },
  { no: '03', title: '深蓝幻境', image: asset('/media/composites/composite-03.jpg'), format: 'landscape' },
  { no: '04', title: '危城红影', image: asset('/media/composites/composite-04.jpg'), format: 'landscape' },
  { no: '05', title: '冰幕红影', image: asset('/media/composites/composite-05.jpg'), format: 'landscape' },
]

export const fieldNotes = [
  { src: asset('/media/field-notes/field-01.jpg'), alt: '展会现场战术服装角色全身照', index: '01', className: 'field-tall' },
  { src: asset('/media/field-notes/field-02.jpg'), alt: '展会现场黑白礼服角色半身照', index: '02', className: 'field-portrait' },
  { src: asset('/media/field-notes/field-03.jpg'), alt: '展会现场白色服装角色横幅全身照', index: '03', className: 'field-wide' },
  { src: asset('/media/field-notes/field-04.jpg'), alt: '展会现场蓝色服装角色横幅照', index: '04', className: 'field-landscape' },
  { src: asset('/media/field-notes/field-05.jpg'), alt: '展会现场紫色服装角色横幅照', index: '05', className: 'field-landscape' },
  { src: asset('/media/field-notes/field-06.jpg'), alt: '展会现场白色服装角色横幅照', index: '06', className: 'field-landscape field-last' },
]

export const stats = [
  ['耐心', '拍摄沟通'], ['光影', '环境塑造'], ['特效', '后期制作'], ['合成', '背景重构'],
]
