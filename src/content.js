// 内容与素材替换入口：把链接改成你的本地文件（建议放在 public/media/）或线上地址即可。
// Version the photos so mobile browsers do not reuse an earlier cached 404
// from the short window while GitHub Pages was still publishing the assets.
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}?v=20260813-2`

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
  { no: '01', title: '外景人像', tag: '自然光 · 林间', year: '2026', image: asset('/media/selected/selected-01.jpg'), format: 'portrait' },
  { no: '02', title: '园林人像', tag: '环境构成 · 日间', year: '2026', image: asset('/media/selected/selected-02.jpg'), format: 'landscape' },
  { no: '03', title: '情绪光影', tag: '黄昏 · 道具光', year: '2026', image: asset('/media/selected/selected-03.jpg'), format: 'landscape' },
  { no: '04', title: '角色人像', tag: '低机位 · 自然光', year: '2026', image: asset('/media/selected/selected-04.jpg'), format: 'landscape' },
  { no: '05', title: '棚拍肖像', tag: '单灯 · 明暗关系', year: '2026', image: asset('/media/selected/selected-05.jpg'), format: 'portrait' },
]

export const fieldNotes = [
  { src: asset('/media/field-notes/field-04.jpg'), alt: '展会现场蓝白服装角色全身照', index: '01', className: 'field-tall' },
  { src: asset('/media/field-notes/field-03.jpg'), alt: '展会现场蓝金服装角色半身照', index: '02', className: 'field-wide' },
  { src: asset('/media/field-notes/field-01.jpg'), alt: '展会现场持扇角色全身照', index: '03', className: 'field-portrait' },
  { src: asset('/media/field-notes/field-02.jpg'), alt: '展会现场蓝绿色双马尾角色照', index: '04', className: 'field-landscape' },
  { src: asset('/media/field-notes/field-05.jpg'), alt: '展会现场紫色服装角色照', index: '05', className: 'field-landscape field-last' },
]

export const stats = [
  ['耐心', '拍摄沟通'], ['光影', '环境塑造'], ['特效', '后期制作'], ['合成', '背景重构'],
]
