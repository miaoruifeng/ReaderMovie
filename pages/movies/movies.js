var  util = require("../../utils/utils.js");
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheater: {},
        comingSoon: {},
        top250: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // var inTheaterUrl = 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
        // var inTheaterUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?apikey=' + app.globalData.apikey;
        // var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?apikey=' + app.globalData.apikey;
        // var top250Url = app.globalData.doubanBase + '/v2/movie/top250?apikey=' + app.globalData.apikey;

        var inTheaterUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
        var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
        var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
        this.getMovieListData(inTheaterUrl, 'inTheater', '正在热映');
        this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映');
        this.getMovieListData(top250Url, 'top250', '豆瓣Top50');
    },

    // 请求电影列表
    getMovieListData: function(url, settedKey, categoryTitle) {
        wx.request({
            url: url,
            method: 'GET',
            header: {
                "Conten-Type": "json"
            },
            success: res => {
                // console.log(res);
                this.processDoubanData(res.data, settedKey, categoryTitle);
            },
            fail: err => {
                console.error(err);
            }
        });
    },

    processDoubanData: function(moviesData, settedKey, categoryTitle) {
        // console.log(moviesData);
        // console.log(settedKey);
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
        // console.log(movies);
        var readyData = {};
        readyData[settedKey] = {
            categoryTitle,
            movies //es6写法 定义一个空对象，然后给对应属性赋值（JavaScript动态属性赋值） => inTheater: movies, comingSoon: movies, top250: movies
        }
        // console.log(readyData);
        // this.setData({
        //     movies
        // });
        this.setData(readyData);
    },

    onMoreTap: function(event) {
        const category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category,
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