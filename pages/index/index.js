//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    message: '',
    keywords: "",
    liguid: "",
    sguid: "",
    slat: "",
    slon: ""
  },

  //获取文本框的输入值
  userNameInput: function(e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  onReady: function() {
    var s = [];
    var that = this
    wx.request({
      url: 'http://180.101.205.44:7775/app/nearby/standInfoByKeyword',
      data: {
        pi: "1",
        ps: "50",
        radius: "1000",
        slat: "31.69524107",
        slon: "120.75504760",
        userId: "okjmN5s_zNgrKnavDc1hTuWC3gGg"
      },
      method: 'POST',
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        for (var i = 0; i < res.data.dataObj.list.length; i++) {
          var a = res.data.dataObj.list[i].lname.split(",");
          res.data.dataObj.list[i].lname = a[0];
        }
        // for (var i = 0; i < res.data.dataObj.list.length; i++) {
        //   if (s.indexOf(res.data.dataObj.list[i]) === -1) {
        //     s.push(res.data.dataObj.list[i])
        //   }
        // }
        that.setData({
          message: res.data.dataObj.list
        })
      }
    })
  },
  search: function() {
    console.log("关键字是：" + this.data.keywords)
    var that = this
    wx.request({
      url: 'http://180.101.205.44:7775/app/traffic/searchLineStandPlaceInfoByKeyword',
      data: {
        city: "320581",
        citylimit: "true",
        keywords: this.data.keywords,
        location: "120.75504760,31.69524107"
      },
      method: 'POST',
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data.dataObj)
        that.setData({
          message: res.data.dataObj.line.dataObj
        })
      }
    })
  },
  click: function(e) {
    this.setData({
      liguid: e.currentTarget.dataset.text.liguid,
      sguid: e.currentTarget.dataset.text.sguid,
      slat: e.currentTarget.dataset.text.slat,
      slon: e.currentTarget.dataset.text.slon
    })
    wx.navigateTo({
      url: '../demo/demo?liguid=' + this.data.liguid + '&sguid=' + this.data.sguid + '&slat=' + this.data.slat + '&slon=' + this.data.slon
    })
  }
})