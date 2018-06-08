$(function(){

    let id = location.search.match(/\bid=([^&]*)/)[1]
    $.get('./song.json').then(function(response){
        let songs = response
        let song = songs.filter((s)=>{
            return s.id == id
        })
        let url = song[0].url
        let name = song[0].name
        let descript = song[0].descript
        let lyric = song[0].lyric
        initPlayer(url)
        initText(descript,lyric)
    })
    
})



        
function initPlayer(url){

    let audio = document.createElement('audio') 
    audio.src=url
    audio.oncanplay=function(){
        audio.play()
        $('.disc').addClass('active')
        $('.icon-pause').addClass('playing')
    }
    $('.icon-pause').on('click',function(){
        $('.icon-pause').removeClass('playing')
        $('.icon-play').addClass('playing')
        $('.disc').removeClass('active')
        audio.pause();
    })
    $('.icon-play').on('click',function(){
        $('.icon-play').removeClass('playing')
        $('.icon-pause').addClass('playing')
        $('.disc').addClass('active')
        audio.play();
    })
    setInterval(()=>{
        let seconds = audio.currentTime
        let minute = parseInt(seconds/60)
        let remain = seconds-minute*60
        let time = `${addZero(minute)}:${addZero(remain)}`
        let $lines = $('.line>p')
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
    },300)
}


function addZero(number){
    if(number<10){
        number = `0${number}`
    }
    return number
}


function initText(descript,lyric){

    let array = lyric.split('\n')
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
    $('.song-description >h2').text(descript)
    let $line = $('.lyric>.line')
    array.map(function(object){
        let $p = $(`<p>${object.words}</p>`)
        $p.attr('data-time',object.time)
        $line.append($p)
    })
}