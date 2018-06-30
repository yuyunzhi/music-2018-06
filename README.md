<h1>如何用jQuery制作移动端网易云音乐？</h1>

<a href="https://zhuanlan.zhihu.com/p/38099257">博客地址点击这里查看</a>

<p>一直都想做一个音乐播放器，这次总算做了一个。</p>

<img src="https://i.loli.net/2018/06/30/5b3795e25ca3f.jpg">

<p><strong>关键词：</strong>JavaScript、jQuery、响应式布局 、MVC、eventHub（发布/订阅模式）、七牛&LeanCloud数据库、Swiper、移动端</p>
<p><strong>描述：</strong>移动端播放歌曲、切换、暂停、搜索等功能，PC 端歌曲上传、删除、修改等功能。使用 jQuery、MVC，以及 LeanCloud、七牛等作为数据库实现。使用vConsole进行调试</p>

<p><strong>源码链接：</strong>本页代码</p>
<p><strong>预览链接：</strong><a href="https://yuyunzhi.github.io/music-2018-06/src/index.html">点这里查看</a></p>

<p>整理一下页面分析和解决bug的通用方法：</p>

<h2>一、页面分析</h2>

<h3>1、网易云音乐logo+下载APP：</h3>
<p>logo用SVG做，a标签做跳转</p>

<h3>2、推荐音乐、热歌榜、搜索三个Tab键跳转</h3>

<ul>
    <li>用ol>li>span标签包裹：推荐音乐、热歌榜、搜索</li>
    <li>通过onclick事件点击任意一个Tab，将其余两个Tab页面隐藏，并用::after来显示红色下划线</li>
    <li>对span使用inline-block，让红色下划线能够动态获取父元素的宽度</li>
</ul>

<h3>3、推荐音乐页面-轮播</h3>

<p>使用Swiper官网组件，引入min.css和min.js，自定修改样式</p>

<h3>4、推荐音乐页面-推荐歌单</h3>

<uli>
    <li>使用ol>li*6>a>img+p标签插入跳转、图片、文字</li>
    <li>确定每个li元素的宽度和间隙</li>
    <li>使用flex布局:flex-wrap:wrap、flex-direction:row、justify-content:space-between</li>
    <li>a标签的href=“跳转页面的地址+查询参数（？id=xxxxxx）”</li>
</uli>

<h3>5、推荐音乐页面-最新音乐</h3>

<p>音乐歌曲、图片上传到七牛，地址、歌名、歌描述、歌词、歌的id保存到LeanCloud</p>
    
<p>从数据库批量获取所存音乐，并把获取的数据通过evenHub通知其他所需要数据的页面</p>

```
find(){
    let query = new AV.Query('Song');
    return query.find().then((songs)=>{
       this.data.songs=songs.map((song)=>{
           let {background,cover,descript,hotSong,lyric,name,url}=song.attributes
           let id=song.id                  
           return {background,cover,descript,hotSong,lyric,name,url,id}
        })
       window.eventHub.emit("songs",this.data.songs)
       return songs
      });
 }
 ```

 <p>对获取音乐的数组进行map()动态生成音乐清单，播放图标使用iconfont，smybol引用</p>

 ```
 renderSongList(data){
    let songs=data
    songs.map((song)=>{
       let name = song.attributes.name
       let descript =song.attributes.descript
       let url =song.attributes.url
       let id = song.id
       let $li = $(`
           <li>
               <h3>${name}</h3>
               <div class='sq'></div>
               <p>${descript}</p>
               <a href="./song.html?id=${id}">
                   <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-play1"></use>
                    </svg>
                </a>
            </li>           
        `)
       $(this.el).find('#lastestMusic').append($li)
     })
   },
```

<img src="https://i.loli.net/2018/06/30/5b37970042ba9.jpg" >

<h3>6、推荐音乐页面-底部logo</h3>

<p>logo用SVG做，a标签做跳转</p>

<h3>7、热歌榜-云音乐背景</h3>

<img src="https://i.loli.net/2018/06/30/5b37973145ec8.jpg" >

<ul>
    <li>其中白色的字的图片是一个雪碧图</li>
    <li>外面再套一个特定宽高的div使用overflow:hidden</li>
    <li>对雪碧图进行移动</li>
</ul>

<h3>8、热歌榜-音乐清单</h3>

<img src="https://i.loli.net/2018/06/30/5b37977ae6976.jpg" alt="">

<p>同5从数据库动态获取所有的音乐，然后把含有hotSong的音乐filter()出来，动态插入页面</p>

```
window.eventHub.on("songs",(songs)=>{
    let newSongs=songs.filter((song)=>{
    return song.hotSong
})
```

<p>1、2、3数字高亮</p>

```
activeNumber(){
    let $songsNumber=$('.hotMusicList').find('.songNumber')
    for(let i=0;i<=2;i++){
       $songsNumber.eq(i).addClass('active')
    }
 }
 ```

 <p>1、2、3变成01、02、03</p>

 ```
 makeNumber(n){
    if(n<10){
         n=`0${n}`
      }
    return n
}
```

<h3>9、搜索-搜索框</h3>

<img src="https://i.loli.net/2018/06/30/5b3797c16d2e5.jpg" alt="">

<p>搜索框html代码如下</p>

```
<div class="searchContainer">
    <img class="searchIcon"src="xxx" alt="">
    <input type="search" placeholder="搜索歌曲、歌手" >
    <img class="deleteIcon"src="xxx" alt="">
</div>
```

<p>对输入框的value.length进行监听，searchIcon默认显示，当用户输入内容时deleteIcon显示。</p>

```
changeDelete(value){
    if(value.length===0){
         $('.deleteIcon').removeClass('active')
    }else{
         $('.deleteIcon').addClass('active')
     }
 }
 ```

 <p>当用户点击删除按钮，则令value=“”，并显示热门搜索</p>
 <img src="https://i.loli.net/2018/06/30/5b37981767631.jpg" alt="">

 <h3>10、搜索-从数据库动态显示用户输入的音乐</h3>

 <ul>
     <li>每400毫秒获取一次用户输入的value值</li>
     <li>把value值传进一个函数，该函数从数据库获取所有音乐的信息，并找出包含value值得音乐，并返回数组</li>
 </ul>

 ```
 search(keyword){
    return new Promise((resolve,reject)=>{
        let database=this.model.data
        let result = database.filter(function(item){
             return item.name.indexOf(keyword)>=0
        })
             resolve(result)
      })
}
```

<p>获取该数组的音乐的信息，进行页面的渲染</p>

```
renderSongList(result){
    $('.searchSongList>a').remove()
    result.map((item)=>{
        $aTag=$(`
           <a href="./song.html?id=${item.id}">
               <img src="./img/search.png" alt="">
               <p>${item.name}</p>                            
           </a>`)
        $('.searchSongList').append($aTag)
     })
 },
 renderNoSong(){
    $(this.el).find('.searchSongList>a>p').text('sorry,该歌曲暂未收入')
 }
 ```

 <p>整段代码如下：</p>

 ```
 let timer
 $(this.view.el).find('input[type="search"]').on('input',(e)=>{
    let $input=$(e.currentTarget)
    let value = $input.val().trim()
    if(timer){
        clearTimeout(timer)
     }
     timer = setTimeout(()=>{
        if(value.length===0){
             this.view.changeDelete(value)
             this.view.isHotSong()
         }else{
             this.view.changeDelete(value)
             this.view.isSearch()
             this.view.renderSearchText(value)  
             this.search(value).then((result)=>{
                 let songNumber = result.length
                 if(songNumber==0){
                     this.view.renderNoSong()               
                 }else{
                     this.view.renderSongList(result)     
                 }
              })
         }
     },400)
 })
 ```

 <h3>11、播放音乐页面-光盘旋转</h3>
 <img src="https://i.loli.net/2018/06/30/5b3798893186b.jpg" alt="">

 <ul>
     <li>三张图片进行旋转</li>
     <li>根据播放和暂停来激活active 旋转</li>
 </ul>

 ```
 @keyframes circle{
    0%{
 transform: rotate(0);
    }
    100%{
 transform: rotate(360deg);
    }
}
.disc-container>.disc.active{
    animation: circle 20s linear infinite;
}
```

<h3>12、播放音乐页面-音乐播放与暂停</h3>

<p>对播放与暂停的icon进行onclick监听，并通过evenHub通知光盘模块进行切换旋转状态，以及icon切换</p>

```
$('.icon-play').on('click',function(){
    window.eventHub.emit('stop')
    let audio = $(view.el).find('audio')[0]
    audio.play()
})
$('.icon-pause').on('click',function(){
    window.eventHub.emit('play')
    let audio = $(view.el).find('audio')[0]
    audio.pause();
})    
```

<h3>13、播放音乐页面-歌词同步</h3>
<p><strong>原理：</strong>lyric是对应了时间time1和歌词的，然后我们获取当前time2=audio.currentTime,进行时间的对比，然后显示某段歌词，再移动和高亮。</p>

<p>获取歌词</p>

```
getContentAndRender(){
    window.eventHub.on('songInformaition',(data)=>{
       let lyric=data.lyric //获取歌词
       this.model.initLyric(lyric) //歌词处理
       this.view.render(data.descript,this.model.array) //歌词渲染页面           
    })      
}
```

<p>歌词处理</p>

```
initLyric(lyric){
    let array = lyric.split('\\n')             
    let regex = /^\[(.+)\](.*)$/ 
    array = array.map(function(string,index){
          let matches = string.match(regex)
          if(matches){
              return {
                time:matches[1],
                words:matches[2]
               }
          }
     }) 
 this.array=array            
}
```

<p>歌词渲染页面</p>

```
render(descript,array){
    $(this.el).find('h2').text(descript)
    let $line = $('.lyric>.line')
    array.map(function(object){
        let $p = $(`<p>${object.words}</p>`)
        $p.attr('data-time',object.time)
        $line.append($p)
    })
}
```

<p>歌词移动</p>

```
moveLyric(){
    window.eventHub.on('seconds',(time)=>{
    let $lines = $(this.view.el).find('.line>p')
    let $thisLine
    for(let i=0;i<$lines.length;i++){
    let currentLineTime = $lines.eq(i).attr('data-time')
    let nextLineTime = $lines.eq(i+1).attr('data-time')
        if( $lines.eq(i+1).length !== 0 && currentLineTime < time && nextLineTime > time ){
           //显示第i行
           $thisLine = $lines.eq(i)
        }
    }
     if($thisLine){
        $thisLine.addClass('active').prev().removeClass('active')
        let top = $thisLine.offset().top
        let lineTop = $('.line').offset().top
        let delta = top -lineTop-$('.lyric').height()/3
        $('.line').css('top',`-${delta}px`)                  
    }
   })
}
```

<h2>二、bug解决方案</h2>

<h3>1、遇到报错</h3>

<ul>
    <li>查StackOverFlow</li>
    <li>查GOOGLE</li>
    <li>查知乎</li>
    <li>查组件官网</li>
</ul>

<h3>2、没有报错，但不出结果</h3>

<ul>
    <li>JS：console.log('xxx')、console.log(变量)</li>
    <li>CSS：border:1px solid red</li>
</ul>

<h3>3、手机端没有控制台</h3>

<ul>
    <li>把console.log(),改为alert()</li>
    <li>使用vConsole：<a href="https://link.zhihu.com/?target=https%3A//github.com/yuyunzhi/vConsole">地址在这</a></li>
    <li>使用onerror事件</li>
</ul>

```
<script>
    window.onerror=function(message,file,row){
      alert(message)
      alert(file)
      alert(row)
  }
</script>
```
