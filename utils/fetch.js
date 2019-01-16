const baseUrl = 'http://admin.joinersafe.com'
function fetch (url, data, type) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + (url || ''),
            method: type || 'get',
            data: data,
            success (res) {
                resolve (res)
            },
            fail (res) {
                console.log(res)
            }
        })
    })
}
export default fetch