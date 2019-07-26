var util = require("../../../utils/utils.js");
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: {},
        categoryTitle: '',
        requestUrl: '',
        totalCount: 0,
        isEmpty: true,
        requestNum: 0
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
                dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + app.globalData.apikey;
                break;
            case '即将上映':
                dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + app.globalData.apikey;
                break;
            case '豆瓣Top50':
                dataUrl = app.globalData.doubanBase + '/v2/movie/top250' + app.globalData.apikey;
                break;
        };
        this.data.requestUrl = dataUrl;
        util.http(dataUrl, this.processDoubanData);
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
        // 如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
        var totalMovies = {};
        if (!this.data.isEmpty) {
            totalMovies = this.data.movies.concat(movies);
        } else {
            totalMovies = movies;
            this.data.isEmpty = false;
        }
        this.setData({
            movies: totalMovies
        });
        // console.log(movies);
        this.data.totalCount += 20;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();

        this.data.requestNum++;
        const count = Math.ceil(moviesData.total / 20) + 1;
        // console.log(this.data.requestNum);
        // console.log(count);
        if (this.data.requestNum >= count) {
            wx.showToast({
                title: '亲，已经到底啦！',
                icon: 'none',
                duration: 1000
            });
        }
    },

    onMovieTap: function(event) {
        const movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId,
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
        var refreshUrl = this.data.requestUrl + '&start=0&count=20';
        this.data.movies = {};
        this.data.isEmpty = true;
        this.data.totalCount = 0;
        util.http(refreshUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
        this.data.requestNum = 0;
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var nextUrl = this.data.requestUrl + '&start=' + this.data.totalCount + '&count=20';
        util.http(nextUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})