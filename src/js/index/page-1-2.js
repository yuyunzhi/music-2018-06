{
    //最新音乐
    let view={
        el:"section.lastestMusic",
        template:`
        <h2>
             <span>最新音乐</span>
        </h2>
        <div class="loading">
            <img class="loadingImg"src="./img/loading.gif" alt="loading">
        </div>
        <ol id="lastestMusic"></ol>
         `,
        render(data){
            $(this.el).html(this.template)
        },
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
        removeLouding(){
            $('.loading').remove()
        }
    }
    let model={
        song:{},
        data:{},
        find(){

            let query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs=songs.map((song)=>{
                    let {background,cover,descript,hotSong,lyric,name,url}=song.attributes
                    let id=song.id                  
                    return {background,cover,descript,hotSong,lyric,name,url,id}
                })
                console.log(this.data.songs)
                window.eventHub.emit("songs",this.data.songs)
                return songs
              });
        }
        
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.model.find().then((data)=>{
                this.model.song=data
                this.view.renderSongList(this.model.song)
                this.view.removeLouding()
                
            })

        },
    }
    controller.init(view,model)
}