/*
 * @Author: hejin
 * nodejs express路由
 */
const { Router } = require('express')
const router = Router()

router.get('/api/test', (req, res, next) => {
  res.send({
    success: true,
  })
})

module.exports = router
