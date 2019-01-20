// pages/index/index.js
import CourseList from '../../api/courseList/courseList'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        answerIndex: '-1', // 是否选中此选项
        isLastQuestion: 0, // 是否最后一题
        letter: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        title: '', // 题目
        optionList: [], // 选项
        total: '',
        now_question_id: '', // 当前题目的id
        exam_question_id: '' // 试题id
    },
    onLoad: function () {
        this.setData({
            total: wx.getStorageSync('total_question'),
            now_question_id: wx.getStorageSync('now_question_id'),
            exam_question_id: wx.getStorageSync('exam_question_id')
        }, () => {
            this.getQuestion()
        })
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    // 得到这道题的详情
    getQuestion: function () {
        CourseList._getQuestion({
            question_id: this.data.now_question_id,
            exam_question_id: this.data.exam_question_id
        }).then(result => {
            let res = result.data
            if (res.code == 0) {
                console.log(res)
                // 初始化哪些选项是选中的
                if (res.data.answer) {
                    this.setData({
                        answerIndex: parseInt(res.data.answer) - 1
                    })
                    // try {
                    //     let arr = res.data.answer.split(',')
                    //     console.log(arr) // [1,2]
                    //     for (let i = 0; i < res.data.option.length; i++) {
                    //         if (arr.includes((i + 1).toString())) {
                    //             isOnList[i] = true
                    //         } else {
                    //             isOnList[i] = false
                    //         }
                    //     }
                    //     console.log(isOnList)
                    //     this.setData({
                    //         isOnList: isOnList
                    //     })
                    // } catch (err) {
                    //     console.log(err)
                    // }
                }
                this.setData({
                    title: res.data.title,
                    optionList: res.data.option,
                    isLastQuestion: res.data.is_last_question
                })
            } else {
                 wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    // 选择一个答案
    choose:function(event) {
        let index = event.currentTarget.dataset.index
        this.setData({
            answerIndex: index
        })
    },
    // 提交答案
    saveAnswer: function () {
        if (this.data.answerIndex == '-1') {
             wx.showToast({
                title: '请选择答案！',
                icon: 'none',
                duration: 2000
            })
             return false
        }
        CourseList._saveAnswer({
            exam_question_id : this.data.exam_question_id,
            question_id: this.data.now_question_id,
            answer_id: parseInt(this.data.answerIndex) + 1
        }).then(result => {
            let res = result.data
            if (res.code == 0) {
                console.log(res)
                if (this.data.isLastQuestion == 1) {
                    console.log('弹窗组件问下交卷不')
                } else {
                    console.log('前往下一题')
                    this.getNextQuestionType()
                }
            } else {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    // 请求下一题是什么类型，跳转对应页面,题目类型 1=单选 2=多选 3=判断
    getNextQuestionType: function () {
         CourseList._getQuestion({
            question_id: parseInt(this.data.now_question_id) + 1,
            exam_question_id: this.data.exam_question_id
        }).then(result => {
            let res = result.data
            if (res.code == 0) {
                wx.setStorageSync('now_question_id', parseInt(this.data.now_question_id) + 1)
                let type = res.data.type
                if (type == 1) {
                    wx.redirectTo({
                      url: '/pages/singleChoose/singleChoose'
                    })
                } else if (type == 2) {
                    console.log('多选')
                } else if (type == 3) {
                    console.log('判断')
                }
            } else {
                 wx.showToast({
                    title: `获取第${parseInt(this.data.now_question_id) + 1}题类型失败!`,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    }
})