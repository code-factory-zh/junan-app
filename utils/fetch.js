const baseUrl = 'http://admin.joinersafe.com'
function fetch(url, data, type) {
    let currentData = {
        "token": wx.getStorageSync('token') || ''
    }
    if (!data) {
        data = {}
    }
    let newData = Object.assign({}, currentData, data)
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + (url || ''),
            method: type || 'get',
            data: newData,
            success (res) {
                resolve(res)
            },
            fail (res) {
                console.log(res)
            }
        })
    })
}
export default fetch