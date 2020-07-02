/**
 * 描述: 任务路由模块
 * 作者: Jack Chen
 * 日期: 2020-06-20
*/

const express = require('express');
const router = express.Router();
const service = require('../services/taskService');
const { jwtAuth, decode } = require('../utils/user-jwt'); // 引入jwt认证函数


// 任务清单接口
router.get('/queryTaskList', jwtAuth, service.queryTaskList);

// 添加任务接口
router.post('/addTask', jwtAuth, service.addTask);

// 编辑任务接口
router.put('/editTask', jwtAuth, service.editTask);

// 操作任务状态接口
router.put('/updateTaskStatus', jwtAuth, service.updateTaskStatus);

// 点亮红星标记接口
router.put('/updateMark', jwtAuth, service.updateMark);

// 删除任务接口
router.delete('/deleteTask', jwtAuth, service.deleteTask);


module.exports = router;

