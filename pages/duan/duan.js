var API = require('../../utils/api.js');
Page({
  data: {
    list: [],
    pageNum: 1,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({ title: '段子' });
    this.loadMore();
  },
  onReachBottom: function () {
    this.loadMore();
  },
  onPullDownRefresh: function () {
    this.setData({ list: [], pageNum: 1 });
    this.loadMore();
  },
  loadMore: function (event) {
    let that = this;
    wx.request({
      url: API.getDuanURL(that.data.pageNum++),
      success(res) {
        that.setData({ list: that.data.list.concat(res.data.comments) })
      }
    })
  },
  vote: function (event) {
    let that = this;
    wx.request({
      url: API.getVoteURL(),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        comment_id: event.target.dataset.postid,
        like_type: event.target.dataset.vote,
        data_type: 'comment'
      },
      success(res) {
        if (res.data.error == 0) {
          wx.showToast({
            title: '投票成功'
          });
        } else {
          wx.showToast({
            title: '已经投过票',
            icon: 'loading'
          });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})
