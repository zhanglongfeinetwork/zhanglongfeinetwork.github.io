"use strict";
import {diary} from "../stroe.js";

// const diary = diary;

(function ($, diary, window) {
    let data = {
        diary: null,
        Y2017: diary.Y2017,
        Y2018: diary.Y2018,
        All: diary.All,
        news: diary.news,
        page: {
            totalPage: 1,
            currentPage: 1,
            pageSize: 6,
        },
        type: 'All'
    }
    let dom = {
        news: $('#first-article'),
        diary: $('#diary'),
        year: $('#year'),
        indexPosts: $('#indexPosts'),
        pager: $('#pager'),

        navfooter: $('#navfooter'),
    }
    let _do = {
        diaryDatahanlder(res) {
            let  mydiaryarr, text
            // debugger
            if (Object.keys(res).length === 0) {
                return data.news // 如果为空,返回最新
            } else {
                mydiaryarr = api.getDiaryData({pageSize: 'all', type: res.type}).diaryList
                mydiaryarr.forEach(i => {
                    if (i.diaryId == res.diaryId) {
                        text = i
                    }
                })
            }
            return text
        },
        mediator: function () {
            return {
                changedData: function (diaryName) {
                    _do.initializePage()
                    data.type = diaryName
                    let res = api.getDiaryData({type: diaryName})
                    data.diary = res.diaryList
                    data.page.totalPage = res.totalPage
                    data.slp.init({
                        totalPageCount: Math.ceil(data.page.totalPage / data.page.pageSize),
                    })
                    _do.renderDiary()

                }
            }
        }(),
        titleAddBr(titlearr) {
            titlearr = titlearr.split(' ')
            let title = ''
            if (titlearr.length > 2) {
                diaryLoop2:
                    for (let k = 0; k < titlearr.length; k++) {

                        if (k == 2) {
                            title += `</br>${titlearr[k]}`
                        } else title += ` ${titlearr[k]}`
                    }
            } else if (titlearr.length == 2) {
                title = `${titlearr[0]}<br/>${titlearr[1]}`
            } else {
                title = `${titlearr[0]}`
            }
            return title
        },
        renderDiary() {
            let diary = data.diary
            let i = 0, imgnum = 2, l = diary.length, html = ``, titlearr
            diaryLoop1:
                for (i; i < l; i++, i) {
                    imgnum = Math.floor(Math.random() * (28 - 2) + 2)
                    let title = _do.titleAddBr(diary[i].title)
                    html += `
                                <article>
									<header>
										<span class="date">${diary[i].time}</span>
										<h2><a href="javascript:void(0);" onclick="onGoDiary(${i},${imgnum})">${title}</a></h2>
									</header>
									<a href="javascript:void(0);" onclick="onGoDiary(${i},${imgnum})" class="image fit"><img src="images/pic0${imgnum}.jpg" alt="" /></a>
									<p>${diary[i].abstract}</p>
									<ul class="actions">
										<li><a href="javascript:void(0);" onclick="onGoDiary(${i},${imgnum})" class="button">Full Story</a></li>
									</ul>
								</article>
               `
                }
            dom.indexPosts.html(html)

        },
        SimplePagination: function () {
            function SimplePagination(totalPageCount) {
                if (!totalPageCount)
                    return;
                this.state = {
                    pageNumber: 1,
                    totalPageCount: totalPageCount
                };
            }

            SimplePagination.prototype.init = function (paramsObj) {
                var state = this.state;
                // 页面元素的外部容器
                state.container = paramsObj.container || '.pagination';
                state.totalPageCount = paramsObj.totalPageCount || 10;
                state.pageNumber = paramsObj.pageNumber || 1;
                // 不包括开头和结尾的两个固定按钮外，中间最多展示几个数字页码按钮
                state.maxShowBtnCount = paramsObj.maxShowBtnCount || 3;
                // 所有的页码元素，包括上一页、下一页
                state.pCName = paramsObj.pCName || 'page',
                    // 当选中页码时添加的类名class
                    state.activeCName = paramsObj.activeCName || 'active',
                    // 代表页码数字的属性
                    state.dataNumberAttr = paramsObj.dataNumberAttr || 'data-number',
                    // 上一页 按钮的类名class
                    state.prevCName = paramsObj.prevCName || 'previous',
                    // 下一页 按钮的类名class
                    state.nextCName = paramsObj.nextCName || 'next',
                    // 禁用 上一页 按钮时给此按钮添加的类名class
                    state.disbalePrevCName = paramsObj.disbalePrevCName || 'disabled',
                    // 禁用 下一页 按钮时给此按钮添加的类名class
                    state.disbaleNextCName = paramsObj.disbaleNextCName || 'disabled',
                    // 不包括 上一页 下一页 省略号 按钮的页码元素类名
                    state.pageNumberCName = paramsObj.pageNumberCName || 'page-number';
                // 触发切换页面的事件
                state.swEvent = paramsObj.swEvent || 'click';
                // 切换页面时调用的函数
                state.onPageChange = paramsObj.onPageChange || state.onPageChange;
                // 当需要省略符号占位时，确定 active的位置
                state.totalPageCount > state.maxShowBtnCount + 2 && (state.activePosition = Math.ceil(state.maxShowBtnCount / 2));
                this.renderPageDOM();
            };
            SimplePagination.prototype.switchPage = function () {
                var _this = this;
                var state = this.state;
                var pCNameList = this.selectorEle('.' + state.pCName, true);
                var pageNumber;
                pCNameList.forEach(function (item) {
                    item.addEventListener(state.swEvent, function (e) {
                        var currentPageEle = e.target;
                        if (_this.hasClass(currentPageEle, state.activeCName))
                            return;
                        var dataNumberAttr = currentPageEle.getAttribute(state.dataNumberAttr);

                        if (dataNumberAttr) {
                            // 点击 数字 按钮
                            pageNumber = +dataNumberAttr;
                        }
                        else if (_this.hasClass(currentPageEle, state.prevCName)) {
                            // 点击 上一页 按钮
                            state.pageNumber > 1 && (pageNumber = state.pageNumber - 1);
                        }
                        else if (_this.hasClass(currentPageEle, state.nextCName)) {
                            // 点击 下一页 按钮
                            state.pageNumber < state.totalPageCount && (pageNumber = state.pageNumber + 1);
                        }
                        pageNumber && _this.gotoPage(pageNumber);
                    });
                });
            };
            SimplePagination.prototype.gotoPage = function (pageNumber) {
                var state = this.state;
                var evaNumberLi = this.selectorEle('.' + state.pageNumberCName, true);
                var len = evaNumberLi.length;
                if (!len || this.isIllegal(pageNumber))
                    return;
                // 清除 active 样式
                this.removeClass(this.selectorEle("." + state.pCName + "." + state.activeCName), state.activeCName);
                if (state.activePosition) {
                    var rEllipseSign = state.totalPageCount - (state.maxShowBtnCount - state.activePosition) - 1;
                    // 左边不需要出现省略符号占位
                    if (pageNumber <= state.maxShowBtnCount && (pageNumber < rEllipseSign)) {
                        if (+evaNumberLi[1].getAttribute(state.dataNumberAttr) > 2) {
                            for (var i = 1; i < state.maxShowBtnCount + 1; i++) {
                                evaNumberLi[i].innerText = i + 1;
                                evaNumberLi[i].setAttribute(state.dataNumberAttr, i + 1);
                            }
                        }
                        this.hiddenEllipse('.ellipsis-head');
                        this.hiddenEllipse('.ellipsis-tail', false);
                        this.addClass(evaNumberLi[pageNumber - 1], state.activeCName);
                    }
                    // 两边都需要出现省略符号占位
                    if (pageNumber > state.maxShowBtnCount && pageNumber < rEllipseSign) {
                        // 针对 maxShowBtnCount===1 的特殊处理
                        this.hiddenEllipse('.ellipsis-head', pageNumber === 2 && state.maxShowBtnCount === 1);
                        this.hiddenEllipse('.ellipsis-tail', false);
                        for (var i = 1; i < state.maxShowBtnCount + 1; i++) {
                            evaNumberLi[i].innerText = pageNumber + (i - state.activePosition);
                            evaNumberLi[i].setAttribute(state.dataNumberAttr, pageNumber + (i - state.activePosition));
                        }
                        this.addClass(evaNumberLi[state.activePosition], state.activeCName);
                    }
                    // 右边不需要出现省略符号占位
                    if (pageNumber >= rEllipseSign) {
                        this.hiddenEllipse('.ellipsis-tail');
                        this.hiddenEllipse('.ellipsis-head', false);
                        if (+evaNumberLi[len - 2].getAttribute(state.dataNumberAttr) < state.totalPageCount - 1) {
                            for (var i = 1; i < state.maxShowBtnCount + 1; i++) {
                                evaNumberLi[i].innerText = state.totalPageCount - (state.maxShowBtnCount - i) - 1;
                                evaNumberLi[i].setAttribute(state.dataNumberAttr, state.totalPageCount - (state.maxShowBtnCount - i) - 1);
                            }
                        }
                        this.addClass(evaNumberLi[(state.maxShowBtnCount + 1) - (state.totalPageCount - pageNumber)], state.activeCName);
                    }
                }
                else {
                    // 不需要省略符号占位
                    this.addClass(evaNumberLi[pageNumber - 1], state.activeCName);
                }
                state.pageNumber = pageNumber;
                state.onPageChange && state.onPageChange(state);
                // 判断 上一页 下一页 是否可使用
                this.switchPrevNextAble();
            };
            SimplePagination.prototype.switchPrevNextAble = function () {
                var state = this.state;
                var prevBtn = this.selectorEle('.' + state.prevCName);
                var nextBtn = this.selectorEle('.' + state.nextCName);
                // 当前页已经是第一页，则禁止 上一页 按钮的可用性
                state.pageNumber > 1
                    ? (this.hasClass(prevBtn, state.disbalePrevCName) && this.removeClass(prevBtn, state.disbalePrevCName))
                    : (!this.hasClass(prevBtn, state.disbalePrevCName) && this.addClass(prevBtn, state.disbalePrevCName));
                // 当前页已经是最后一页，则禁止 下一页 按钮的可用性
                state.pageNumber >= state.totalPageCount
                    ? (!this.hasClass(nextBtn, state.disbaleNextCName) && this.addClass(nextBtn, state.disbaleNextCName))
                    : (this.hasClass(nextBtn, state.disbaleNextCName) && this.removeClass(nextBtn, state.disbaleNextCName));
            };
            SimplePagination.prototype.renderPageDOM = function () {
                // 渲染页码DOM
                var state = this.state;
                var pageContainer = this.selectorEle(state.container);
                if (!pageContainer)
                    return;
                var totalPageCount = state.totalPageCount, pCName = state.pCName, prevCName = state.prevCName,
                    disbalePrevCName = state.disbalePrevCName, pageNumberCName = state.pageNumberCName,
                    activeCName = state.activeCName, dataNumberAttr = state.dataNumberAttr,
                    maxShowBtnCount = state.maxShowBtnCount, nextCName = state.nextCName,
                    disbaleNextCName = state.disbaleNextCName;
                var paginationStr = `<a href="javascript:void(0);" class="page previous disabled">Prev</a>
                                    <a href="javascript:void(0);" class="page ${pageNumberCName} ${activeCName} " ${dataNumberAttr}='1'>1</a>`;
                if (totalPageCount - 2 > maxShowBtnCount) {
                    paginationStr += `<span class="ellipsis-head extra">&hellip;</span>`;
                    for (var i = 2; i < maxShowBtnCount + 2; i++) {
                        paginationStr += `<a class="page ${i === 1 ? activeCName : ''} ${pageNumberCName}" ${dataNumberAttr}='${i}'>${i}</a>`;
                    }
                    paginationStr += `
                        <span class="ellipsis-tail extra">&hellip;</span>
                        <a href="javascript:void(0);" class="page ${pageNumberCName}" ${dataNumberAttr}='${totalPageCount}'>${totalPageCount}</a>
                    `;
                }
                else {
                    for (var i = 2; i <= totalPageCount; i++) {
                        paginationStr += `<a href="javascript:void(0);" class="page ${pageNumberCName}" ${dataNumberAttr}='${i}'>${i}</a>`
                    }
                }
                paginationStr += `<a href="javascript:void(0);" class="page next ${totalPageCount === 1 ? ' ' + disbaleNextCName : ''}">Next</a>`
                pageContainer.innerHTML = paginationStr;
                // 切换页码
                this.switchPage();
            };
            SimplePagination.prototype.isIllegal = function (pageNumber) {
                var state = this.state;
                return (state.pageNumber === pageNumber || Math.ceil(pageNumber) !== pageNumber ||
                    pageNumber > state.totalPageCount || pageNumber < 1 ||
                    typeof pageNumber !== 'number' || pageNumber !== pageNumber);
            };
            SimplePagination.prototype.hiddenEllipse = function (selector, shouldHidden) {
                if (shouldHidden === void 0) {
                    shouldHidden = true;
                }
                this.selectorEle(selector).style.display = shouldHidden ? 'none' : '';
            };
            SimplePagination.prototype.selectorEle = function (selector, all) {
                if (all === void 0) {
                    all = false;
                }
                return all ? document.querySelectorAll(selector) : document.querySelector(selector);
            };
            SimplePagination.prototype.hasClass = function (eleObj, className) {
                return eleObj.classList.contains(className);
            };
            SimplePagination.prototype.addClass = function (eleObj, className) {
                eleObj.classList.add(className);
            };
            SimplePagination.prototype.removeClass = function (eleObj, className) {
                if (this.hasClass(eleObj, className)) {
                    eleObj.classList.remove(className);
                }
            };
            return SimplePagination;

        }(),
        initializePage() {
            let page = data.page
            data.page.currentPage = 1
        },
        //跳转获取参数
        getQueryString: function getQueryString() {
            var resObj = {},
                name, value;

            var str = window.location.href;
            var num = str.indexOf("?");
            str = str.substr(num + 1);

            var arr = str.split('&');

            for (var i = 0; i < arr.length; i++) {
                num = arr[i].indexOf('=');
                if (num > 0) {
                    name = arr[i].substr(0, num);
                    value = arr[i].substr(num + 1);
                    resObj[name] = value;
                }
            }
            return resObj;
        },


    }

    function init() {
        data.slp = new _do.SimplePagination(10)
        render()
        handler(window)


    }

    let api = {
        getDiaryData({pageSize = data.page.pageSize, currentPage = 1, type = 'All'}) {
            let diaryName = type,
                totalPage,
                diaryList

            function datatransform(dataArr) {
                if (pageSize == 'all') {
                    return dataArr
                } else {
                    return dataArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                }
            }

            if (diaryName == 'All') {
                diaryList = data.All
                totalPage = diaryList.length
            } else if (diaryName == '2017') {
                diaryList = data.Y2017
                totalPage = diaryList.length

            } else if (diaryName == '2018') {
                diaryList = data.Y2018
                totalPage = diaryList.length
            }
            // else if (diaryName == '2019') {
            //     diaryList = data.Y2019
            //     totalPage = diaryList.length
            // }
            else {
                return alert('暂未完工')
            }
            diaryList = datatransform(diaryList)
            return {
                diaryList: diaryList,
                totalPage: totalPage
            }
        }
    }

    function render() {
        let html
        const news = data.news
        // 详情页
        if (window.location.href.indexOf('generic') > 0) {
            let res = _do.getQueryString()

            let mydiaryarr = api.getDiaryData({pageSize: 'all', type: res.type}).diaryList
            let diarydata = _do.diaryDatahanlder(res)
            let title = _do.titleAddBr(diarydata.title)

            if (Object.keys(res).length === 0||mydiaryarr.length==1) {
                dom.navfooter.html(`
                    <ul class="actions">
                    <!--<li><a href="#" class="button special">Special</a></li>-->
                    <li><a href="index.html" class="button">&nbsp;&nbsp;__Back__&nbsp;&nbsp;</a></li>
                </ul>
                `)
            }else {
                res.diaryId = Math.floor(res.diaryId)
                if(res.diaryId == 0 ) {
                    dom.navfooter.html(`
                <ul class="actions">
                    <li><a href="index.html" class="button">&nbsp;&nbsp;Back&nbsp;&nbsp;</a></li>
                    <li><a href="generic.html?diaryId=${res.diaryId+1}&type=${res.type}" class="button">NEXT</a></li>
                </ul>
                `)
                } else if(res.diaryId+1 == mydiaryarr.length){
                    dom.navfooter.html(`
                <ul class="actions">
                    <li><a href="generic.html?diaryId=${res.diaryId-1}&type=${res.type}" class="button">PREV</a></li>
                    <!--<li><a href="#" class="button special">Special</a></li>-->
                    <li><a href="index.html" class="button">&nbsp;&nbsp;__Back__&nbsp;&nbsp;</a></li>
                </ul>
                `)
                }else {
                    dom.navfooter.html(`
                <ul class="actions">
                    <li><a href="generic.html?diaryId=${res.diaryId-1}&type=${res.type}" class="button">PREV</a></li>
                    <!--<li><a href="#" class="button special">Special</a></li>-->
                    <li><a href="index.html" class="button">&nbsp;&nbsp;__Back__&nbsp;&nbsp;</a></li>
                    <li><a href="generic.html?diaryId=${res.diaryId+1}&type=${res.type}" class="button">NEXT</a></li>
                </ul>
                `)
                }

            }
            let imgsrc
            if(Object.keys(res).length === 0){
                imgsrc = "images/pic01.jpg"
            }else {
                if(res.image) imgsrc = `images/pic0${res.image}.jpg`
                else imgsrc = `images/pic0${Math.floor(Math.random() * (28 - 2) + 2)}.jpg`


            }
            html = `
            <header class="major">
                <span class="date">${diarydata.time}</span>
                <h1>${title}</h1>
                <p>${diarydata.abstract}</p>
            </header>
            <div class="image main"><img src="${imgsrc}" alt=""/></div>
            <p>${diarydata.content}</p>
            `


                dom.diary.html(html)
        }
        {
            let title = _do.titleAddBr(news.title)

            html = `
								<header class="major">
								<span class="date">${news.time}</span>
								<h2><a href="generic.html">${title}</h2>
								<p>${news.abstract}</p>
							</header>
								<a href="generic.html" class="image main"><img src="images/pic01.jpg" alt="" /></a>
								<ul class="actions">
									<li><a href="generic.html" class="button big">Full Story</a></li>
								</ul>
            `
            dom.news.html(html)
        }
        {
            //如果有缓存 则走缓存
            data.diary = api.getDiaryData({type: 'All'}).diaryList
            data.page.totalPage = api.getDiaryData({type: 'All'}).totalPage
            _do.renderDiary()
            data.slp.init({
                totalPageCount: Math.ceil(data.page.totalPage / data.page.pageSize),
                container: '#pager',
                onPageChange: state => {
                    let res = api.getDiaryData({type: data.type, currentPage: state.pageNumber})
                    data.diary = res.diaryList
                    _do.renderDiary()
                }
            })
        }


    }


    function handler(window) {
        {
            dom.year.on('click', (e) => {
                var diaryName = $(e.target).text()
                _do.mediator.changedData(diaryName)
            })
        }
        {
            window.onGoDiary = function () {
                console.log(arguments[0]);

                let url = `generic.html?diaryId=${data.diary[arguments[0]].diaryId}&type=${data.type}&image=${arguments[1]}`;//此处拼接内容
                window.location.href = url;
            }
        }
    }


    init()

}($, diary, window))
