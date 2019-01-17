// pages/index/index.js
const app = getApp();
Component({
    data: {
        showFlag: false
    },
    methods: {
        _show: function () {
            this.setData({
                showFlag: true
            })
        },
        _close () {
            this.setData({
                showFlag: false
            })
        }
    }
})