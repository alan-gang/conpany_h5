export default [
  // 五星
  {gn: '三星', ln: '', id: '2001:1', n: '直选复式', d: '从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。', e: '如：选择01，02，03，开奖号码顺序为01，02，03 * *，即为中奖。'},
  {gn: '三星', ln: '', id: '2001:0', n: '直选单式', d: '手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。', e: '如：手动输入01 02 03，开奖号码为是01 02 03 * *，即为中奖。'},
  {gn: '三星', ln: '', id: '2002:1', n: '组选复式', d: '从01-11中共11个号码中选择3个号码，所选号码与当期顺序摇出的5个号码中的前3个号码相同，顺序不限，即为中奖。', e: '如：选择01 02 03（展开为01 02 03 * *，01 03 02 * *，02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *），开奖号码为03 01 02  如：，即为中奖。'},
  {gn: '三星', ln: '', id: '2003:0', n: '组选单式', d: '手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前3个号码相同，顺序不限，即为中奖。', e: '如：手动输入01 02 03（展开为01 02 03 * *，01 03 02 * * , 02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *），开奖号码为01 03 02 * *，即为中奖。'},
  {gn: '三星', ln: '', id: '2004:1', n: '组选胆拖', d: '分别从胆码和拖码的01-11中，至少选择1个胆码和2个拖码组成一注。当期顺序摇出的5个号码中的前3个号码中同时包含所选的1个胆码和2个拖码，顺序不限，即为中奖。', e: '如：选择胆码 01，选择拖码 02 06，开奖号码为 02 01 06 * *，即为中奖。'},
  {gn: '二星', ln: '', id: '2005:1', n: '直选复式', d: '从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前2个号码相同，且顺序一致，即中奖。', e: '如：选择01 02，开奖号码 01 02 * * *，即为中奖。'},
  {gn: '二星', ln: '', id: '2036:0', n: '直选单式', d: '手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前2个号码相同，且顺序一致，即为中奖。', e: '如：手动输入 01 02，开奖号码为01 02 * * *，即为中奖。'},
  {gn: '二星', ln: '', id: '2006:1', n: '组选复式', d: '从01-11中共11个号码中选择2个号码，所选号码与当期顺序摇出的5个号码中的前2个号码相同，顺序不限，即为中奖。 ', e: '如：选择01 02（展开为01 02 * * *，02 01 * * *），开奖号码为02 01 * * * 或 01 02 * * *，即为中奖。'},
  {gn: '二星', ln: '', id: '2037:0', n: '组选单式', d: '手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前2个号码相同，顺序不限，即为中奖。', e: '如：手动输入01 02（展开为01 02 * * *，02 01 * * *），开奖号码为02 01 *** 或 01 02 ***，即为中奖。'},
  {gn: '二星', ln: '', id: '2007:1', n: '组选胆拖', d: '分别从胆码和拖码的01-11中，至少选择1个胆码和1个拖码组成一注。当期顺序摇出的5个号码中的前2个号码中同时包含所选的1个胆码和1个拖码，顺序不限，即为中奖。', e: '如：选择胆码 01，选择拖码 06，开奖号码为 06 01* * *，即为中奖。'},
  {gn: '一星', ln: '', id: '2008:1', n: '定位胆', d: '从第一位，第二位，第三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖', e: '  如：万位上选择01，开奖号码为01 * * * *，即为中奖。'},
  {gn: '不定位', ln: '复式', id: '2009:1', n: '前三不定位', d: '从01-11中共11个号码中选择1个号码，每注由1个号码组成，只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码，即为中奖。', e: '如：选择01，开奖号码为01 * * * *，* 01 * * *，* * 01 * *,即为中奖。'},
  {gn: '任选', ln: '复式', id: '2010:1', n: '一中一', d: '从01-11共11个号码中选择1个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05，开奖号码为08 04 11 05 03，即为中奖'},
  {gn: '任选', ln: '复式', id: '2011:1', n: '二中二', d: '从01-11共11个号码中选择2个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '复式', id: '2012:1', n: '三中三', d: '从01-11共11个号码中选择3个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 11，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '复式', id: '2013:1', n: '四中四', d: '从01-11共11个号码中选择4个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 08 03，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '复式', id: '2014:1', n: '五中五', d: '从01-11共11个号码中选择5个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '复式', id: '2015:1', n: '六中五', d: '从01-11共11个号码中选择6个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖', e: '如：选择05 10 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '复式', id: '2016:1', n: '七中五', d: '从01-11共11个号码中选择7个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 10 11 03 08 09，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '复式', id: '2017:1', n: '八中五', d: '从01-11共11个号码中选择8个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 11 03 08 10 09 01，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '单式', id: '2018:0', n: '一中一', d: '从01-11共11个号码中选择1个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05，开奖号码为08 04 11 05 03，即为中奖'},
  {gn: '任选', ln: '单式', id: '2019:0', n: '二中二', d: '从01-11共11个号码中选择2个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '单式', id: '2020:0', n: '三中三', d: '从01-11共11个号码中选择3个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 11，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '单式', id: '2021:0', n: '四中四', d: '从01-11共11个号码中选择4个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 08 03，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '单式', id: '2022:0', n: '五中五', d: '从01-11共11个号码中选择5个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '单式', id: '2023:0', n: '六中五', d: '从01-11共11个号码中选择6个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖', e: '如：选择05 10 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '单式', id: '2024:0', n: '七中五', d: '从01-11共11个号码中选择7个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 10 11 03 08 09，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '单式', id: '2025:0', n: '八中五', d: '从01-11共11个号码中选择8个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。', e: '如：选择05 04 11 03 08 10 09 01，开奖号码为08 04 11 05 03，即为中奖。'},
  {gn: '任选', ln: '胆拖', id: '2026:1', n: '二中二', d: '分别从胆码和拖码的01-11中，至少选择1个胆码和1个拖码组成一注，只要当期顺序摇出的5个开奖号码中同时包含所选的1个胆码和1个拖码，所选胆码必须全中，即为中奖。', e: '如：选择胆码 08，选择拖码 06，开奖号码为 06 08 11 09 02，即为中奖'},
  {gn: '任选', ln: '胆拖', id: '2027:1', n: '三中三', d: '分别从胆码和拖码的01-11中，至少选择1个胆码和1个拖码组成一注，只要当期顺序摇出的5个开奖号码中同时包含所选的1个胆码和2个拖码，所选胆码必须全中，即为中奖。', e: '如：选择胆码 08，选择拖码 06 11，开奖号码为 06 08 11 09 02，即为中奖。'},
  {gn: '任选', ln: '胆拖', id: '2028:1', n: '四中四', d: '分别从胆码和拖码的01-11中，至少选择1个胆码和3个拖码组成一注，只要当期顺序摇出的5个开奖号码中同时包含所选的1个胆码和3个拖码，所选胆码必须全中，即为中奖。', e: '如：选择胆码 08，选择拖码 06 09 11，开奖号码为 06 08 11 09 02，即为中奖。'},
  {gn: '任选', ln: '胆拖', id: '2029:1', n: '五中五', d: '分别从胆码和拖码的01-11中，至少选择1个胆码和4个拖码组成一注，只要当期顺序摇出的5个开奖号码中同时包含所选的1个胆码和4个拖码，所选胆码必须全中，即为中奖。', e: '如：选择胆码 08，选择拖码 02 06 09 11，开奖号码为  06 08 11 09 02，即为中奖。'},
  {gn: '任选', ln: '胆拖', id: '2030:1', n: '六中五', d: '分别从胆码和拖码的01-11中，至少选择1个胆码和5个拖码组成一注，只要当期顺序摇出的5个开奖号码同时存在于胆码和拖码的任意组合中，即为中奖。', e: '如：选择胆码 08，选择拖码 01 02 05 06 09 11，开奖号码为 06 08 11 09 02，即为中奖。'},
  {gn: '任选', ln: '胆拖', id: '2031:1', n: '七中五', d: '分别从胆码和拖码的01-11中，至少选择1个胆码和6个拖码组成一注，只要当期顺序摇出的5个开奖号码同时存在于胆码和拖码的任意组合中，即为中奖。', e: '如：选择胆码 08，选择拖码 01 02 05 06 07 09 11，开奖号码为 06 08 11 09 02，即为中奖。'},
  {gn: '任选', ln: '胆拖', id: '2032:1', n: '八中五', d: '分别从胆码和拖码的01-11中，至少选择1个胆码和7个拖码组成一注，只要当期顺序摇出的5个开奖号码同时存在于胆码和拖码的任意组合中，即为中奖。', e: '如：选择胆码 08，选择拖码 01 02 03 05 06 07 09 11，开奖号码为 06 08 11 09 02，即为中奖。'},
  {gn: '趣味', ln: '', id: '2033:1', n: '定单双', d: '从5种单双个数组合中选择1种组合，当期开奖号码的单双个数与所选单双组合一致，即为中奖。', e: '如：选择5单0双，开奖号码01，03，05，07，09五个单数，即为中奖。'},
  {gn: '趣味', ln: '', id: '2034:1', n: '猜中位', d: '从3-9中选择1个号码进行购买，所选号码与5个开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。', e: '如：选择8，开奖号码为11，04，09，05，08，按开奖号码的数字大小排列为04，05，08，09，11，中间数08，即为中奖。'},
  {gn: '趣味', ln: '', id: '2035:1', n: '龙虎', d: '根据选择的位置比较第一位号码与第二位号码的大小， 大则为：龙， 小则为：虎', e: '龙[第一位，第二位]，开奖号码08 07 * * *，即中龙虎'},
]
