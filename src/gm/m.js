import ssc from './m_ssc'
import g115 from './m_115'
import k3 from './m_k3'
import pk10 from './m_pk10'
import ssl from './m_ssl'
import ssl3d from './m_ssl3d'
import kl8 from './m_kl8'
import pcdd from './m_pcdd'
import hc6 from './m_hc6'
import kq from './m_kq'
ssc.forEach(x => x.show = true)
g115.forEach(x => x.show = true)
k3.forEach(x => x.show = true)
pk10.forEach(x => x.show = true)
ssl.forEach(x => x.show = true)
ssl3d.forEach(x => x.show = true)
kl8.forEach(x => x.show = true)
// 输入倍数型
pcdd.forEach(x => (x.show = true) && (x.times = true))
hc6.forEach(x => (x.show = true) && (x.times = (x.times !== -1)))
kq.forEach(x => (x.show = true) && (x.times = (x.times !== -1)))
export default {
  ssc: ssc,
  115: g115,
  k3: k3,
  pk10: pk10,
  ssl: ssl,
  ssl3d: ssl3d,
  kl8: kl8,
  pcdd: pcdd,
  hc6: hc6,
  kq: kq,
}
