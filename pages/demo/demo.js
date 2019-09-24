// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message1: [],
    message: "",
    liguid: "",
    sguid: "",
    slat: "",
    slon: "",
    name: "",
    lfstdname: "",
    lestdname: "",
    lfstdetime: "",
    lfstdftime: "",
    lfstdetime1: "",
    lfstdftime1: "",
    lineStandInfo: "",
    remainno: "",
    remainno1: "",
    distancestation: "",
    distancestation1: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var that = this;
    var message2 = [];
    var message3 = [];
    that.setData({
      liguid: options.liguid,
      sguid: options.sguid,
      slat: options.slat,
      slon: options.slon
    })
    wx.request({
        url: 'http://180.101.205.44:7775/app/nearby/operationTime',
        data: {
          liguid: this.data.liguid,
          sguid: this.data.sguid,
          slat: this.data.slat,
          slon: this.data.slon
        },
        method: 'POST',
        header: {
          "content-type": "application/json"
        },
        success: function(res) {

          that.setData({
            remainno: res.data.dataObj[0].remainno,
            remainno1: res.data.dataObj[1].remainno,
            distancestation: res.data.dataObj[0].distancestation,
            distancestation1: res.data.dataObj[1].distancestation
          })
        }
      }),
      wx.request({
        url: 'http://180.101.205.44:7775/app/nearby/detailStandsByLine',
        data: {
          liguid: this.data.liguid
        },
        method: 'POST',
        header: {
          "content-type": "application/json"
        },
        success: function(res) {
          that.setData({
            message: res.data.dataObj.list,
            name: res.data.dataObj.lname,
            lfstdname: res.data.dataObj.list[0].sname,
            lestdname: res.data.dataObj.list[res.data.dataObj.list.length - 1].sname,
            lfstdetime: res.data.dataObj.list[0].lfstdetime.substring(0, 2),
            lfstdftime: res.data.dataObj.list[0].lfstdftime.substring(0, 2),
            lfstdetime1: res.data.dataObj.list[0].lfstdetime.substring(2, 4),
            lfstdftime1: res.data.dataObj.list[0].lfstdftime.substring(2, 4),
            message3: res.data.dataObj.list
          })
        }
      }),
      wx.request({
        url: 'http://180.101.205.44:7775/app/traffic/trafficOrder',
        data: {
          liguid: this.data.liguid,
          origins: "120.75504760,31.69524107"
        },
        method: 'POST',
        header: {
          "content-type": "application/json"
        },
        success: function(res) {
          console.log(res)
          that.setData({
            lineStandInfo: res.data.dataObj
          })
        }
      }),
      wx.request({
          url: 'http://180.101.205.44:7775/busdata/' + this.data.liguid + '/buses',
          data: {},
          method: 'POST',
          header: {
            "content-type": "application/json"
          },

          success: function(res) {
            for (var i = 0; i < res.data.content.length; i++) {
              message2[i] = res.data.content[i].sguid
            }
            that.setData({
              message1: message2
            })
          }
        }


      )
  }
})