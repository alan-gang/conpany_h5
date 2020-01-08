let kq =  {active: false, dmid_: '1250:1', up_: 1}
let g = [
  // SSC
  {id: 1, gn: '时时彩', t_: 'ssc', mid: '11', n: '重庆欢乐生肖', hot: true, dmid_: '16:1', kq: true},
  {id: 155, gn: '时时彩', t_: 'ssc', mid: '116', n: '重庆怀旧时时彩', dmid_: '16:1', kq: true},
  {id: 157, gn: '时时彩', t_: 'ssc', mid: '118', n: '重庆怀旧分分彩', dmid_: '16:1', kq: true},
  {id: 29, gn: '时时彩', t_: 'ssc', mid: '96', n: '腾讯分分彩', hot: true, dmid_: '16:1', kq: true},
  {id: 17, gn: '时时彩', t_: 'ssc', mid: '79', n: '欢乐分分彩', hot: true, dmid_: '16:1', kq: true},
  {id: 21, gn: '时时彩', t_: 'ssc', mid: '80', n: '幸福三分彩', dmid_: '16:1', kq: true},
  {id: 150, gn: '时时彩', t_: 'ssc', mid: '75', n: '微博5分彩', hot: true, dmid_: '16:1', kq: true},
  {id: 3, gn: '时时彩', t_: 'ssc', mid: '12', n: '新疆时时彩', hot: true, dmid_: '16:1', kq: true},
  {id: 156, gn: '时时彩', t_: 'ssc', mid: '117', n: '新疆怀旧时时彩', dmid_: '16:1', kq: true},
  {id: 4, gn: '时时彩', t_: 'ssc', mid: '9', n: '天津时时彩', dmid_: '16:1', kq: true},
  {id: 35, gn: '时时彩', t_: 'ssc', mid: '101', n: '黑龙江时时彩', dmid_: '16:1', kq: true},
  {id: 161, gn: '时时彩', t_: 'ssc', mid: '122', n: '阿里云分分彩', dmid_: '16:1', kq: true},
  {id: 158, gn: '时时彩', t_: 'ssc', mid: '119', n: '河内5分彩', dmid_: '16:1', kq: true},
  {id: 163, gn: '时时彩', t_: 'ssc', mid: '126', n: '河内1分彩', dmid_: '16:1', kq: true},
  {id: 164, gn: '时时彩', t_: 'ssc', mid: '127', n: '奇趣腾讯分分彩', dmid_: '16:1', kq: true},
  {id: 152, gn: '时时彩', t_: 'ssc', mid: '113', n: '腾讯2分彩', dmid_: '16:1', kq: true},
  {id: 153, gn: '时时彩', t_: 'ssc', mid: '114', n: '腾讯2分彩', dmid_: '16:1', kq: true},
  {id: 18, gn: '时时彩', t_: 'ssc', mid: '128', n: '韩国1.5分彩', dmid_: '16:1', kq: true},
  {id: 19, gn: '时时彩', t_: 'ssc', mid: '129', n: '东京1.5分彩', dmid_: '16:1', kq: true},
  {id: 34, gn: '时时彩', t_: 'ssc', mid: '130', n: '激情30秒', dmid_: '16:1', kq: true},
  {id: 165, gn: '时时彩', t_: 'ssc', mid: '132', n: '奇趣腾讯5分彩', dmid_: '16:1', kq: true},
  {id: 166, gn: '时时彩', t_: 'ssc', mid: '133', n: '奇趣腾讯10分彩', dmid_: '16:1', kq: true},
  {id: 201, gn: '时时彩', t_: 'ssc', mid: '141', n: '奥地利50秒', dmid_: '16:1', kq: false},
  {id: 202, gn: '时时彩', t_: 'ssc', mid: '142', n: '奥地利100秒', dmid_: '16:1', kq: false},
  // PK10
  {id: 39, gn: 'PK10', t_: 'pk10', mid: '105', n: '幸运飞艇', hot: true, dmid_: '4001:1'},
  {id: 13, gn: 'PK10', t_: 'pk10', mid: '18', n: '北京PK10', hot: true, dmid_: '4001:1'},
  {id: 43, gn: 'PK10', t_: 'pk10', mid: '109', n: '幸运赛车', dmid_: '4001:1'},
  {id: 151, gn: 'PK10', t_: 'pk10', mid: '74', n: '腾讯赛车', dmid_: '4001:1'},
  {id: 162, gn: 'PK10', t_: 'pk10', mid: '123', n: '阿里云赛车', dmid_: '4001:1'},
  // 115
  {id: 6, gn: '11选5', t_: '115', mid: '16', n: '11运夺金', dmid_: '2001:1'},
  {id: 11, gn: '11选5', t_: '115', mid: '14', n: '夺金120秒', dmid_: '2001:1'},
  {id: 7, gn: '11选5', t_: '115', mid: '62', n: '多乐彩', dmid_: '2001:1'},
  {id: 8, gn: '11选5', t_: '115', mid: '15', n: '广东11选5', dmid_: '2001:1'},
  {id: 40, gn: '11选5', t_: '115', mid: '131', n: '辽宁11选5', dmid_: '2001:1'},
  {id: 22, gn: '11选5', t_: '115', mid: '81', n: '湖北11选5', dmid_: '2001:1'},
  {id: 36, gn: '11选5', t_: '115', mid: '102', n: '江苏11选5', dmid_: '2001:1'},
  {id: 37, gn: '11选5', t_: '115', mid: '103', n: '上海11选5', dmid_: '2001:1'},
  {id: 38, gn: '11选5', t_: '115', mid: '104', n: '安徽11选5', dmid_: '2001:1'},
  {id: 159, gn: '11选5', t_: '115', mid: '120', n: '福建11选5', dmid_: '2001:1'},
  {id: 46, gn: '11选5', t_: '115', mid: '124', n: '山西11选5', dmid_: '2001:1'},
  // K3
  {id: 23, gn: '快三', t_: 'k3', mid: '82', n: '安徽快三', dmid_: '5009:1'},
  {id: 24, gn: '快三', t_: 'k3', mid: '83', n: '江苏快三', dmid_: '5009:1'},
  {id: 25, gn: '快三', t_: 'k3', mid: '84', n: '吉林快三', dmid_: '5009:1'},
  {id: 26, gn: '快三', t_: 'k3', mid: '85', n: '北京快三', dmid_: '5009:1'},
  {id: 33, gn: '快三', t_: 'k3', mid: '19', n: '幸福快三', dmid_: '5009:1'},
  {id: 160, gn: '快三', t_: 'k3', mid: '121', n: '福建快三', dmid_: '5009:1'},
  // Other
  {id: 10, gn: '其它', t_: 'ssl', mid: '61', n: '排列三、五', dmid_: '1500:1'},
  {id: 9, gn: '其它', t_: 'ssl3d', mid: '60', n: '福彩3D', dmid_: '1500:1'},
  {id: 32, gn: '其它', t_: 'ssl3d', mid: '17', n: '欢乐3D', dmid_: '1500:1'},
  {id: 5, gn: '其它', t_: 'ssl3d', mid: '100', n: '上海时时乐', dmid_: '1500:1'},
  {id: 27, gn: '其它', t_: 'kl8', mid: '92', n: '北京快乐8', dmid_: '3001:1'},
  {id: 45, gn: '其它', t_: 'pcdd', mid: '112', n: 'PC蛋蛋', dmid_: '8001:1'},
  {id: 28, gn: '其它', t_: 'hc6', mid: '95', n: '六合彩', dmid_: '7001:1', up: 1},
  {nid: '_kg', gn: '其它', n: '基诺彩', pid: 18, gid: 203},
]
g.forEach(x => x.kq = x.kq ? Object.assign({}, kq) : null)
export default g
