var postsData = require("../../data/posts-data.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // postsList: []
    },

    onSwiperTap: function(event) {
        // target 和 currentTarget
        // target指的是当前点击的组件，而currentTarget指的是事件捕获的组件
        // 在这里target指的是image, 而currentTarget指的是swiper
        const postId = event.target.dataset.postid;
        wx.navigateTo({
            url: `post-detail/post-detail?id=${postId}`
        });
    },

    onPostTap: function(event) {
        const postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            // url: 'post-detail/post-detail?id=' + postId
            url: `post-detail/post-detail?id=${postId}`
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            bannerImgUrls: postsData.bannerImgUrls,
            postsList: postsData.postList
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})