{
    let view ={
        el:'#page-3',
        show(){
            $(`#page-3`).addClass('active')
        },
        hide(){
            $(`#page-3`).removeClass('active')
        },
        renderSongList(result){
            $('.searchSongList>a').remove()
            result.map((item)=>{
                $aTag=$(`<a href="./song.html?id=${item.id}">
                <img src="./img/search.png" alt="">
                <p>${item.name}</p>                            
                </a>`)
                $('.searchSongList').append($aTag)
            })
        },
        renderNoSong(){
            $(this.el).find('.searchSongList>a>p').text('sorry,该歌曲暂未收入')
        },
        isHotSong(){
            $('.hotSearch').removeClass('delActive')
            $('.searchSongList').addClass('delActive')
        },
        isSearch(){
            $('.hotSearch').addClass('delActive')
            $('.searchSongList').removeClass('delActive')
        },
        renderSearchText(value){
            $(this.el).find('.searchSongList>p>span').text(value)
        },
        changeDelete(value){
            if(value.length===0){
                $('.deleteIcon').removeClass('active')
            }else{
                $('.deleteIcon').addClass('active')
            }
        }

    }
    let model={
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.bindEventHub()
            this.bindEvents()

        },
        bindEventHub(){
            window.eventHub.on('songs',(songs)=>{
                this.model.data=songs
            })
            window.eventHub.on('clickpage',(data)=>{
                if(data===2){
                    this.view.show()
                }else{
                    this.view.hide()
                }              
            })
        },
        bindEvents(view,fn){
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


            $('.deleteIcon').on('click',()=>{
                $value=$(this.view.el).find('input[type="search"]').val("")
                this.view.changeDelete($value)
                this.view.isHotSong()
            })
        },
        search(keyword){
            return new Promise((resolve,reject)=>{
                let database=this.model.data
                let result = database.filter(function(item){
                    return item.name.indexOf(keyword)>=0
                })
                setTimeout(function(){
                    resolve(result)
                },10)
            })
        }
    }
    controller.init(view,model)
}