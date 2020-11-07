import Mock from 'mockjs'
export default function(page) {
    if(page == 1){
        page = 1
    }else {
        page = (page-1)*10+1
    }
    const data = {'list|10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': page,
            "money": '@natural(3000, 10000)',
            "name": "@cname",
            'state|1':['成功','失败'],
            "date": "@date",
            "address":'@county(true)',
            'thumb': "@image('40x40', '@color', '#FFF', 'Mock.js')"
        }],
        "pageTotal": 10000
    }
    return Mock.mock(data)
}
