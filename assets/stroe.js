const DIARY = function () {
    const Day = new Date(),
        myDate = function (year, moth, day) {
            let dateStore
            switch (moth) {
                case '1':
                    dateStore = 'January'
                    break;
                case '2':
                    dateStore = 'February'
                    break;
                case '3':
                    dateStore = 'March'
                    break;
                case '4':
                    dateStore = 'April'
                    break;
                case '5':
                    dateStore = 'May'
                    break;
                case '6':
                    dateStore = 'June'
                    break;
                case '7':
                    dateStore = 'July'
                    break;
                case '8':
                    dateStore = 'August'
                    break;
                case '9':
                    dateStore = 'September'
                    break;
                case '10':
                    dateStore = 'October'
                    break;
                case '11':
                    dateStore = 'November'
                    break;
                case '12':
                    dateStore = 'December'
                    break;
            }
            // console.log(dateStore)
            dateStore = dateStore + '\t' + day+',' + '\t' + year
            return dateStore

        },
        compare = function (property) {
            return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                // return value1 - value2;     //升序
                return value2 - value1;     // 降序
            }
        },
        myDiary = function (diary) {



            if (diary instanceof Array) {

                diary.forEach((i, index) => {
                    if (typeof i.time == 'string') {
                        let time = i.time.split('/')
                        i.time = myDate(time[0], time[1], time[2])

                    }
                    if (typeof i.content == 'string') {
                        if (i.content.length > 100) i.abstract = i.content.slice(0, 50) + '...'
                        else if (100 > i.content.length && i.content.length > 50) i.abstract = i.content.slice(0, 20) + '...'
                        else i.abstract = i.content.slice(0, 10)
                    }

                    i.diaryId = index
                })
            }
            return diary
        },
        getNew = function (diary) {
            let New = null
            if (diary instanceof Array) {
                diary.forEach((i, index) => {
                    let time = i.time.split('/')
                    i.timevlaue = new Date(time[0], time[1], time[2]).getTime()

                    // i.time = new Date(time[0], time[1], time[2])
                })

            }

            New = diary.sort(compare("timevlaue"));
            New[0].type = 'news'
            return New[0]
        },
        /**
         * abstract 描述
         * diaryId id
         * time 时间
         * title 标题
         * content 内容
         * @type {*[]}
         */
        my2017 = [
            {
                time: '2016/12/5',
                title: '16.12.3 2017序 一周一更新',
                content: '感觉好久没写日记了，\n' +
                    '我要记录一下我的一十七年，我的巅峰之巅，总是感觉花了成长阶段10-27的十七年都在玩游戏，看小说。等时间上度过，这俩应该修满了。\n' +
                    '游戏《魔兽争霸》时间最长预测在1万小时以上\n' +
                    '《英雄联盟》\n' +
                    '《魔力宝贝》\n' +
                    '《彩虹岛》\n' +
                    '《石器时代》\n' +
                    '《永恒之塔》\n' +
                    '《上古世纪》\n' +
                    '手游yu\n' +
                    '《仙剑奇侠》\n' +
                    '《挖矿与冒险》\n' +
                    '《阴阳师》\n' +
                    '几个占用我大量时间的游戏\n' +
                    '还有一直跟随我的起点\n' +
                    '读了很多爽文，\n' +
                    '这些一定会有用，我要把这些经历过的事情在2017年码上一些字，构思。融合一些题材，设计一些构架，写一部小说。\n' +
                    '人一老真悲哀。\n' +
                    '所以趁年轻多干活，到老了才有吹嘘的资本，更要记下吹嘘的资本。\n' +
                    '再点修的方向一是英语，听力口语，写作争取拿下5000单词1000口语，100篇文章，10本英文小说。\n' +
                    '二是电脑，主修sio苹果app系统，最好靠一些证件，去高薪为的应聘。\n' +
                    '三4000人民币扛一年，不打算再过多的投入。金融学习不能放弃。\n' +
                    '四空余时间学习钢琴。\n' +
                    '完成四大块，还要挣更多的钱，瘦更多的身，变得更有智力和魅力。',
            },

            {
                time: '2016/12/16',
                title: '16.12.2017序-二 一周更新一次',
                content: `  说好更新一晃就这么长时间了三号我都忘了更新了，过去了13天。给自己定出了很多的目标，但很难持续下去。打了鸡血，一顿挫折就没激情了。
怎么这么期待2017呢？人的情绪变化，我也疲惫，只能好好休息，一年好好的状态迎接挑战。
继续构思我的小说。试想一个穿越的少年，到了魔法世界，会遇到什么呢？最开始的困难是什么呢？一定不能太容易，一定要紧张局势，一定要有坚强的意志，和不屈的精神，在困难上解决方案又要闪耀智慧，读完我的小说不能让读者白读，一定要有一股暖流的精神，激励读者也可以在现实中鼓励。一定要有个女主。这个女主一定要在精神上激励主人公。会遇到良师，也会遇到恶霸，环境会恶劣，生存艰难，却充满不可思议。自然环境一定要好，文明一定会不一样。
2017年，我真的要解决一下我的遗留问题，英语差。我不相信我的英语永远只有45分。140分也是我的目标。虽然不高考了，但英语一定要弥补，我不想老了还是40分的英语。花一年。学会它，值。
2017年钢琴，也是我的心病，买了一直没学成。这次一定要会。一年。拼了吧。把钢琴，英语给赶上去。还有15天，我要严格按照我的格式来过这15天。早睡，锻炼是我的能源供应，每天花2小时英语是必须的。钢琴1小时也是必须的。一年要花365个小时学习钢琴。720小时英语学习。找个课程。认认真真，踏踏实实学。坚持，更多是是毅力。2017年。十万元。存款。学习。码字。减肥。
我的命运轨道变了，真的要去金融行业了。嗯那就把目标里多加一个，读下系统金融体系知识。
不仅这样，人必须要有斗志和野心！`
            },
            {
                time: '2016/12/23',
                title: '23.12.2016.1.18 序三 每周一更',
                content: `从开始的兴奋，到现在的疲惫，我已经不能想象，我2017底会不会想我序一想的那样达标，翻回几年前的微信，一眼看去好幼稚，做的事放到现在更不会去做，我要尽全力，不让自己偏离正轨，把我的结构稳定，每周一早上写思路，晚上练字和身体，再记忆些单词。六日出去换换空气，旅行旅行，想说的很多，还离新年就一周了，我的专科要换成金融学。时间真是宝贵，更要安排合理，一天下来总要有收获，更要注重自身的清理，比如刷牙，牙线，避孕套使用等等。我要离开图书馆后，也要读书。给自己规划一下如何考试。周六日好好思索思索，2017年不会荒废，很重要。深谋远虑，为年底着想，牺牲到眼前利益，为大局着想。`
            },
            {
                time: '2016/12/30',
                title: '2016.12.30 序四 一周更新一次 周五更早',
                content: `  这周爆发了疾病，很是遗憾的浪费了4天
周一锻炼完，又买了书做了计划，光是想想，就压力巨大，我真的能完成吗？所以
我又放纵了自己，荒废了周二周三周四,以及今天要荒废的周五，生病却不早睡，睡不着，也是内心的释放，如果我的5年内又爆发疾病的话，我是否还能达到？我毁了3年的高中复读，正是因为我的疾病。主要身体太差，或者我给自己的点都集中在了一起，刺穿了我。我懂得了不是删除就可以解决你的时间占用，排压的重要性，以及晚上自控能力低下的可怕。我想如果生病，我不想荒废，一定要主要目的是恢复好身体，尽快恢复，尽早躺床上，多喝水。更多是可以心里静静呆着，追求宁静。建立完好的自我，以防止自己干出浪费时间，拖延病情的事情。平时更多的应是锻炼身体，投资身体带来的收益远远大于投资其他。打完这些字后，我明白了我现在该做什么，时间不能荒废了。就差2天我的2017年就要开启了，我已经准备好了，31号把48金币打印出来。详细构思动用我一切现在手头上的资源。比如现在想安排充电时间，安排冥想吐纳呼吸，安排下上英语时间，安排乐器时间，安排课程时间，以及看书时间。缓解压力很是重要，近期我被打败了俩次，一次是被女神拒绝心塞，去逛了一天百货大楼，买了个吉他，一次是周一，安排读书，咨询考研。
对我要安排我的小说码写字。
不妨在这里说说思路。
小个小的故事试试手。`
            },
            {
                time: '2017/1/5',
                title: '2017.1.5 第一章 可怕的迎头一击',
                content: `  第一周，过的十分恶劣！痛苦，与放纵。我的疾病，终究没好，编演的更加恶劣。咳嗽不断，意志被不断消耗，最消耗意志的还是玩我的游戏彩虹岛。这是个必须按照设计走的游戏。主题就是挂机。，我已经到现在挂了3天了。我想了很多，这个游戏更练的是意志。慢慢玩吧，看看最后是什么样的结果。但我知道不能在这上花太多的精力时间。这只是我的支线任务，我要从中吸取教训。开始的第一周就荒废了，真的没预想到，我更多的是生病的节奏，要休息，要静养，要吃素，少油少盐。统计，状态差的情况下我要14天才能恢复，这次我没吃药，只是大量喝水，做自己不满意是更多时候我在玩游戏而不是休息恢复抵抗力。这是退俩步，没加强，又退了步。明天要看一下这周的财经，记录下来，并先点评，然后预测。真的是不好的开始。又放荡了，下周要进俩步。不过现在生病想出来也不是什么好点子。在非满状态下。我要防守。下周我要进我的公司了。真正的公司。我要坚持5年。做个好员工。帮老板挣钱。同时英语每日必需跟上。碎片，整块不能低于10分钟最少。起床，身体好了，我要7点起，做些有用的事情。锻炼要恢复。以及我在年末的单子。今天看来应该可以更好。我可以走到的。我的梦想。去伦敦金融机构看一看。工作工作。吸取教训，下周往前走俩步。我的笔记上要有总波动。`
            },
            {
                time: '2017/1/15',
                title: '2017.1.15 第二章 初到贵企',
                content: `  一周，跟我预想差了十万八千里，前三天的剧烈咳嗽，后三天的疲劳，计算。今天的恢复身体，一周说长不长，但确实充实而遗憾，遗憾一，开局不顺，第一周，第二周，偏离预期颇多，甚多，很多，唯一让我满意的是，病情好转。要更快的找回状态，减少彩虹岛的时间，更多的要用在读书、学习和运动上。一周不满意的很多，上班没有很集中学习，没有做出很好的规划，下班太多时间玩电脑，还有精神气不足，没有了年前的精神。我要刷牙，记账，学吉他，减肥健身，和读书。这周统统都没有做。周六日更是玩过去了，要想稳固前进周六日不能荒废，更要自己自强，管理好一切，抽出4小时整理，整理思路，整理衣物。一周有什么收获？在哪里办公地方很是爽，找到了一条捷径，认识了几位老师，在浮躁的时候被人说了一顿，虽然不爽，但应该警醒，第二章也就这么过去了。累，尽快运动跟上。磨练跟上，自己做饭，跟上。照顾好自己，下周，每天8点起，天好7点起跑步。
1.早读英语1小时。
2.午休！
3.不熬夜，
4.晚上练字。
5.早晚刷牙。
6.周六日学习！
7.一天读30页教材。
8.晚上做做卷子。
9.工作适度。
10.记住休息。
11.回家抽出20分钟学习吉他吧。8点之前。
12.温习外汇思路。
13.不要畏惧。
14.你是最叼的交易员。
15.买买买！不要怕花钱在投资自己身上。`
            },
            {
                time: '2017/1/22',
                title: '2017.1.22 周日 夜里 第三章 忙碌',
                content: `  这周，跟上周比优势巨大，身体调整好了，没有咳嗽的困扰，在最后的8分钟里，总结一下这周大事，周一总结上周不足，持续改善，看书，盯盘，周五过小年，下班就想锻炼，却得盯紧游戏，今天周日 周六一直游戏， 但花了钱没有达到预期，很是冷却， 过热的情绪，一下驱散很多，下周要锻炼，要一样忙碌的同事重点放在工作和学习上。收心，同时紧切。扩大优势，弥补不足。 早起学英语。游戏只是陪衬。早睡早起不熬夜，不吃手，不手淫。外加锻炼身体。健康饮食。自己做饭。
`
            },
            {
                time: '2017/1/29',
                title: '1.29 第四章 减小阻力方为王道',
                content: `  4个星期，2017年的第一个月就这么走过去了，跟想象中的差了不止一星半点，我究竟有多差劲，这四个星期是一页书也没读，定下的三戒更是破戒十次以上，身体恢复，没有好好学习，没有锻炼身体，连续俩星期，竟然连续玩电脑时间占用高达53%之多。更是花钱2168，之多投入到游戏里。高达我一个月的工资，心里很是愧疚，但我也意识到，过于的苛刻只会增加阻力，成功的路上，只要你去减少阻力，就是成功，就想你把笔放理近一厘米，时间缩短一半。而迫切的成功之心只会增大阻力，下周好好赚钱，好好休息，好好学习，目标没变，难度又提升了，过节破为无聊，是我感受变差了，小时候能感受到的现在都感受不到了，自制，良好的机制，构架。说好的写作，乐器，做饭。
今天从我大舅妈哪里听来了一个事情，当时选择，牛棚父母出了4万加1万，而我大舅只收到了8000，剩下都是四处奔波借的。最后才买下了现在的30年产权的地皮。如今竟然要拆了。矛盾激起，陈年往事，谁也道不清，而张老一只会大喊大叫，没有一点详细的描述，刘秀文呢，只会夸大自己，事实更是那边的浮夸。这件事情，值得深思，帮人不帮到点上，没有证据，最好录下来。然后`
            },


        ],
        my2018 = [{
            time: '2018/1/6',
            title: '第一章 好的开始 2018.01.06 周六 在地铁上',
            content: `我在开往学校的地铁上，这周快而精彩，不往好的开始。
 1.周五去面试，环节十分刺激，我十分喜，但感觉自己过刚，应该表现要适应公司一些。
  开始我过去，让我填写基本信息，然后让我写技术考题，写了半个小时，然后跟技术来聊。为了凸显我的技术，我把对方公司的网站做的错误，指出来了。并给出如何解决，之后公司王总把他们的技术给交过来，让我跟他说如何解决，技术一直闷闷不乐，提出几个尖锐问题，我并未回答如流，有点次，下次应该思考一下，然后跟技术沟通好。
  总之，我还是太着急了，没有把握细节，想得没有太过周全，没有什么亮点，要多练习练习。
 2.这周状态是在赶项目，上午半天，然后下午上课，按理说项目早已赶完现在却不到百分之十，主要问题是方式不对，晚睡缺不写项目，正确是6.30，洗漱好了，吃完饭了，就开始写项目，至少有2.30小时或者在家吃，两点到学校，总之少玩游戏，现在工作没着落，项目写多了也是优势。
3.过得太快了，晚上冥想，应该有主题，反思一下自己，每次都可以有新的发现，不过就单单十分钟，真漫长，还有不能不做运动，人是动物，太舒适的话，身体会变坏，增强代谢，把身体练出来，保持良好习惯。
4.今天也很精彩，思考了一下，假证问题，敲门砖，重要也不重要，更加让我坚定，要自己考，我张龙飞还是不适合办假证。这种偷懒耍滑的技巧，还是没有天赋。
5.英语，定出的10分钟，应该在10个单词左右，可以自己减少一下数量，但绝对要坚持。而这周只有三天坚持了单词，不知道是不是少活了一天，太快了，完全记不得竟然过了五天，总以为还得有一天才能到休息。
好吧，不写了，因为今天星期六，我要去学校赶我项目了。`
        }],
        my2019 = [{
            time: '2019/4/1',
            id:'1'
        },
            {
                time: '2019/4/6',
                id:'2'
            }
        ]


    function array_copy(arr) {
        var out = [], i, len;
        if (arr instanceof Array === false) {
            return arr;
        }

        for (i = 0, len = arr.length; i < len; i++) {
            if (out[i] instanceof Array) {
                out[i] = deepcopy(arr[i]);
            } else {
                out[i] = arr[i];
            }
        }

        return out;
    }


    DIARY.prototype.news = getNew(my2017)
    DIARY.prototype.Y2017 = function () {
            let Myarr =  array_copy(my2017)
        return myDiary(Myarr)
    }()
    DIARY.prototype.Y2018 = function () {
        let Myarr =  array_copy(my2018)
        return myDiary(Myarr)
    }()
    DIARY.prototype.All = function () {
            let Aarr = [];
        console.log(my2018);
        console.log(my2017);
        Aarr = [...my2017,...my2018]
        console.log(Aarr);
        Aarr.forEach((i,index)=>{
            i.diaryId = index
        })
        return Aarr
    }()

}

export const diary = new DIARY()


