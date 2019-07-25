var util = require("../../../utils/utils.js");
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryTitle: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const category = options.category;
        this.setData({
            categoryTitle: category
        });

        var dataUrl = '';
        switch (category) {
            case '正在热映':
                dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
                break;
            case '即将上映':
                dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
                break;
            case '豆瓣Top50':
                dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
                break;
        };
        this.getMovieListData(dataUrl);
    },

    getMovieListData: function(url) {
        wx.request({
            url: url,
            method: 'GET',
            header: {
                "Conten-Type": "json"
            },
            success: res => {
                this.processDoubanData(res.data);
            },
            fail: err => {
                console.error(err);
            }
        });
    },

    processDoubanData: function(moviesData) {
        var movies = [];
        for (var idx in moviesData.subjects) {
            var subject = moviesData.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + '...';
            }
            var temp = {
                movieId: subject.id,
                title: title,
                coverageUrl: subject.images.large,
                average: subject.rating.average,
                stars: util.convertToStarsArray(subject.rating.stars)
            }
            movies.push(temp);
        }
        this.setData({
            movies
        });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.categoryTitle,
        });
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