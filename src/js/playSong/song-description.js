{
    let view={
        el:'#song-description',
        render(descript,array){
            $(this.el).find('h2').text(descript)
            let $line = $('.lyric>.line')
            array.map(function(object){
                let $p = $(`<p>${object.words}</p>`)
                $p.attr('data-time',object.time)
                $line.append($p)
            })
        }
    }
    let model={
        data:{},
        array:{},//分割后的歌词
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
    }
    let controller={
        init(view,model){
            this.view = view
            this.model = model
            this.getContentAndRender()
            this.moveLyric()
        },
        getContentAndRender(){
            window.eventHub.on('songInformaition',(data)=>{
                let lyric=data.lyric
                this.model.initLyric(lyric)
                this.view.render(data.descript,this.model.array)               
            })      
            
        },
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
    }
    controller.init(view,model)
}