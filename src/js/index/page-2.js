{
    let view ={
        el:'#page-2',
        show(){
            $(`#page-2`).addClass('active')
        },
        hide(){
            $(`#page-2`).removeClass('active')
        },
        renderHotSongList(newSongs){
            let n=0
            newSongs.map((song)=>{
                n++
                let {id,hotSong,name,descript}=song
                $songList = $(`
                <li> 
                    <div class="songNumber">${this.makeNumber(n)}</div> 
                    <div class="songContent">                 
                        <h3>${name}</h3>
                        <div class='sq'></div>
                        <p>${descript}</p>
                        <a href="./song.html?id=${id}">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-play1"></use>
                            </svg>
                        </a>
                    </div>  
                </li>
                `)
                $('.hotMusicList>ol').append($songList) 
            })
        },
        activeNumber(){
            let $songsNumber=$('.hotMusicList').find('.songNumber')
            for(let i=0;i<=2;i++){
                $songsNumber.eq(i).addClass('active')
            }
        },
        makeNumber(n){
            if(n<10){
                n=`0${n}`
            }
            return n
        }

    }
    let model={
        hotSongList:{},
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on("songs",(songs)=>{
                let newSongs=songs.filter((song)=>{
                    return song.hotSong
                })
                this.model.hotSongList = newSongs
                this.view.renderHotSongList(newSongs)
                this.view.activeNumber()
            })
            window.eventHub.on('clickpage',(data)=>{
                if(data===1){
                    this.view.show()
                }else{
                    this.view.hide()
                }              
            })
        }
    }
    controller.init(view,model)
}