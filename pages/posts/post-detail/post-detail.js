var postsData = require("../../../data/posts-data.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // collected: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var postId = options.id;
        // console.log(postId);
        var postData = postsData.postList[postId];
        this.setData({
            postData,
            currentPostId: postId
        });

        // storage缓存 -- 同步
        // wx.setStorageSync('key', '这是一个storage缓存');
        // wx.setStorageSync('key1', {
        //     name: 'lilei',
        //     age: 19
        // });
        // var key1 = wx.getStorageSync('key1');
        // console.log(key1);
        // wx.removeStorageSync('key');
        // wx.clearStorageSync();

        // 利用storage缓存 模拟实现收藏-取消收藏

        // var postsCollected = {
        //     1: true,
        //     2: false,
        //     3: true,
        //     ...
        // }

        var postsCollected = wx.getStorageSync('posts_collected');
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            if (postCollected) {
                this.setData({
                    collected: postCollected
                });
            }
        } else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }
    },

    onCollectionTap: function() {
        var postsCollected = wx.getStorageSync('posts_collected');
        // console.log(this.data.currentPostId);
        var postCollected = postsCollected[this.data.currentPostId];
        postCollected = !postCollected; // 收藏变成未收藏 未收藏变成收藏
        postsCollected[this.data.currentPostId] = postCollected;
        this.showToast(postCollected, postsCollected);
        // this.showModal(postCollected, postsCollected);
    },

    showToast: function(postCollected, postsCollected) {
        wx.setStorageSync('posts_collected', postsCollected); //更新文章是否收藏的缓存值
        this.setData({ //更新数据绑定，从而实现切换图片
            collected: postCollected
        });
        wx.showToast({
            title: postCollected ? '收藏成功' : '取消收藏',
            icon: 'success',
            duration: 1000
        });
    },

    showModal: function(postCollected, postsCollected) {
        wx.showModal({
            title: '收藏',
            content: postCollected ? '收藏该文章？' : '取消收藏该文章？',
            cancelText: '取消',
            cancelColor: '#333',
            confirmText: '确认',
            confirmColor: '#405f80',
            success: res => {
                if (res.confirm) {
                    wx.setStorageSync('posts_collected', postsCollected);
                    this.setData({
                        collected: postCollected
                    });
                }
            }
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