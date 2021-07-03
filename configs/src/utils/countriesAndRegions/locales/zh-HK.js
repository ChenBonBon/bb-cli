const contents = {
    AL: '阿爾巴尼亞',
    DZ: '阿爾及利亞',
    AF: '阿富汗',
    AR: '阿根廷',
    AE: '阿拉伯聯合大公國',
    AW: '阿路巴',
    OM: '阿曼',
    AZ: '亞塞拜然',
    AC: '亞森欣島',
    EG: '埃及',
    ET: '衣索比亞',
    IE: '愛爾蘭',
    EE: '愛沙尼亞',
    AD: '安道爾',
    AO: '安哥拉',
    AG: '安地卡及巴布達',
    AT: '奧地利',
    AU: '澳洲',
    MO: '澳門特別行政區',
    BB: '巴貝多',
    PG: '巴布亞紐幾內亞',
    BS: '巴哈馬',
    PK: '巴基斯坦',
    PY: '巴拉圭',
    PS: '巴勒斯坦民族權力機構',
    BH: '巴林',
    PA: '巴拿馬',
    BR: '巴西',
    BY: '白俄羅斯',
    BM: '百慕達',
    BG: '保加利亞',
    MP: '北馬里安納群島',
    MK: '北馬其頓',
    BJ: '貝南',
    BE: '比利時',
    IS: '冰島',
    PL: '波蘭',
    BA: '波士尼亞赫塞哥維納',
    BO: '玻利維亞',
    BZ: '貝里斯',
    BW: '波札那',
    BQ: '波奈',
    BT: '不丹',
    BF: '布吉納法索',
    BI: '蒲隆地',
    BV: '布威島',
    GQ: '赤道幾內亞',
    DK: '丹麥',
    DE: '德國',
    TL: '東帝汶',
    TG: '多哥',
    DO: '多明尼加',
    DM: '多米尼克',
    RU: '俄羅斯',
    EC: '厄瓜多',
    ER: '厄利垂亞',
    FR: '法國',
    FO: '法羅群島',
    PF: '法屬玻里尼西亞',
    GF: '法屬圭亞那',
    VA: '梵蒂岡',
    PH: '菲律賓',
    FJ: '斐濟',
    FI: '芬蘭',
    CV: '維德角',
    FK: '福克蘭群島',
    GM: '甘比亞',
    CG: '剛果共和國',
    CD: '剛果民主共和國',
    CO: '哥倫比亞',
    CR: '哥斯大黎加',
    GG: '根息',
    GD: '格瑞那達',
    GL: '格陵蘭',
    GE: '喬治亞',
    CU: '古巴',
    GP: '哥德洛普',
    GU: '關島',
    GY: '蓋亞納',
    KZ: '哈薩克',
    HT: '海地',
    KR: '韓國',
    NL: '荷蘭',
    AN: '前荷屬安替列斯',
    ME: '蒙特內哥羅',
    HN: '宏都拉斯',
    KI: '吉里巴斯',
    DJ: '吉布地',
    KG: '吉爾吉斯',
    GN: '幾內亞',
    GW: '幾內亞比索',
    CA: '加拿大',
    GH: '迦納',
    GA: '加彭',
    KH: '柬埔寨',
    CZ: '捷克',
    ZW: '辛巴威',
    CM: '喀麥隆',
    QA: '卡達',
    KY: '開曼群島',
    CC: '可可斯群島',
    KM: '葛摩',
    XK: '科索沃',
    CI: '科特迪瓦 (象牙海岸)',
    KW: '科威特',
    HR: '克羅埃西亞',
    KE: '肯亞',
    CK: '柯克群島',
    CW: '古拉梳',
    LV: '拉脫維亞',
    LS: '賴索托',
    LA: '寮國',
    LB: '黎巴嫩',
    LT: '立陶宛',
    LR: '賴比瑞亞',
    LY: '利比亞',
    LI: '列支敦斯登',
    RE: '留尼旺',
    LU: '盧森堡',
    RW: '盧安達',
    RO: '羅馬尼亞',
    MG: '馬達加斯加',
    IM: '曼島',
    MV: '馬爾地夫',
    MT: '馬爾他',
    MW: '馬拉威',
    MY: '馬來西亞',
    ML: '馬利',
    MH: '馬紹爾群島',
    MQ: '馬丁尼克',
    YT: '馬約特島',
    MU: '模里西斯',
    MR: '茅利塔尼亞',
    US: '美國',
    UM: '美國外島',
    VI: '美屬維爾京群島',
    MN: '蒙古',
    MS: '蒙特色拉特島',
    BD: '孟加拉',
    PE: '秘魯',
    FM: '密克羅尼西亞',
    MM: '緬甸',
    MD: '摩爾多瓦',
    MA: '摩洛哥',
    MC: '摩納哥',
    MZ: '莫三比克',
    MX: '墨西哥',
    NA: '納米比亞',
    ZA: '南非',
    AQ: '南極大陸',
    SS: '南蘇丹',
    NR: '諾魯',
    NP: '尼泊爾',
    NI: '尼加拉瓜',
    NE: '尼日',
    NG: '奈及利亞',
    NU: '紐威島',
    NO: '挪威',
    PW: '帛琉',
    PT: '葡萄牙',
    JP: '日本',
    SE: '瑞典',
    CH: '瑞士',
    SV: '薩爾瓦多',
    WS: '薩摩亞',
    RS: '塞爾維亞',
    SL: '獅子山',
    SN: '塞內加爾',
    CY: '賽普勒斯',
    SC: '塞席爾',
    XS: '沙巴',
    SA: '沙烏地阿拉伯',
    CX: '聖誕島',
    ST: '聖多美普林西比',
    SH: '聖赫勒拿、阿森松、特里斯坦達庫尼亞群島',
    KN: '聖克里斯多福及尼維斯',
    LC: '聖露西亞',
    SM: '聖馬利諾',
    PM: '聖匹島',
    VC: '聖文森及格瑞那丁',
    XE: '聖佑達修斯',
    LK: '斯里蘭卡',
    SK: '斯洛伐克',
    SI: '斯洛維尼亞',
    SJ: '挪威屬斯瓦巴',
    SZ: '史瓦濟蘭',
    SD: '蘇丹',
    SR: '蘇利南',
    SB: '索羅門群島',
    SO: '索馬利亞',
    TJ: '塔吉克',
    TW: '中國台灣',
    TH: '泰國',
    TZ: '坦尚尼亞',
    TO: '東加',
    TC: '土克斯及開科斯群島',
    TA: '垂斯坦昆哈群島',
    TT: '千里達及托巴哥',
    TN: '突尼西亞',
    TV: '吐瓦魯',
    TR: '土耳其',
    TM: '土庫曼',
    TK: '托克勞群島',
    WF: '瓦利斯及福杜納群島',
    VU: '萬那杜',
    GT: '瓜地馬拉',
    VE: '委內瑞拉',
    BN: '汶萊',
    UG: '烏干達',
    UA: '烏克蘭',
    UY: '烏拉圭',
    UZ: '烏茲別克',
    ES: '西班牙',
    GR: '希臘',
    HK: '香港特別行政區',
    SG: '新加坡',
    NC: '新喀里多尼亞群島',
    NZ: '紐西蘭',
    HU: '匈牙利',
    SY: '敘利亞',
    JM: '牙買加',
    AM: '亞美尼亞',
    XJ: '尖棉',
    YE: '葉門',
    IQ: '伊拉克',
    IR: '伊朗',
    IL: '以色列',
    IT: '義大利',
    IN: '印度',
    ID: '印尼',
    UK: '英國',
    VG: '英屬維爾京群島',
    IO: '英屬印度洋領地',
    JO: '約旦',
    VN: '越南',
    ZM: '尚比亞',
    JE: '澤西島',
    TD: '查德',
    GI: '直布羅陀',
    CL: '智利',
    CF: '中非共和國',
    CN: '中國',
}

export default contents;