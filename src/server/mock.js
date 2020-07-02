/*
 * @Author: hejin
 * @Date: 2020-05-14 11:52:44
 * @LastEditTime: 2020-07-01 15:51:48
 * @Description: 生成mock.js数据
 * @Website: http://mockjs.com/examples.html#
 */
const Mock = require('mockjs')

const random = Mock.Random

const data = []

for (let index = 0; index < 10; index++) {
  data.push(
    Mock.mock({
      id: random.id(), // id
      uuid: random.guid(), // uuid
      time: random.datetime(), // datetime时间
      'number|1-100': 100, // number (1 - 100)
      phone: /^1[0-9]{10}$/, // 手机号码
      'str|1-10': 'abc',
      email: random.email(), // email
      webUrl: random.url(), // website
      name: random.cname(), // name
      title: random.title(10, 15), // article title
      word: random.word(10, 15), // English word
      success: random.boolean(), // boolean
      obj: {
        foo: 'Hello',
        nested: {
          a: {
            b: {
              c: 'Mock.js',
            },
          },
        },
      }, // object
      'objectArray|1-10': [
        {
          'name|+1': ['Hello', 'Mock.js', '!'],
        },
      ], // object array
    })
  )
}

const pdtResetData = Mock.mock({
  'items|100': [
    {
      accountNumber: '5OW74631',
      'accountType|1': ['MARGIN', 'CASH'],
      applyTime: random.datetime(),
      'status|1': ['pending', 'complted', 'rejected'],
      updateTime: random.datetime(),
      id: random.id(),
    },
  ],
  pageNo: 1,
  pageSize: 20,
  totalPages: 137,
  totalRows: 2740,
})

module.exports = { data }
