

{
    let view = {
        el:".songlist-contrainer",
        template:`
        <ul class="songList">
        </ul>
        `,
        render(data){
            $(this.el).html(this.template)
            let songs = data.songs
            let selectSongId = data.selectSongId
            let liList = songs.map((song)=>{
                let li =$(`<li></li>`).text(song.name).attr('data-id',song.id)
                if(song.id === selectSongId){
                    li.addClass('active')
                }
                return li
            })
            $(this.el).find('ul').empty()
            liList.map((domLi)=>{
                $(this.el).find('ul').append(domLi)
            })       
        },
        activeItem($li){
            $li.addClass('active')
                .siblings('.active').removeClass('active')
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {
        data:{
            songs:[],
            selectSongId:"",
        },
        find(){
            let query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs=songs.map((song)=>{
                    let {background,cover,descript,hotSong,lyric,name,url}=song.attributes
                    let id=song.id                  
                    return {background,cover,descript,hotSong,lyric,name,url,id}
                })
                return songs
              });

        }
    }
    let controller ={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventHub()
            this.getAllSongs()
        },
        bindEvents(){
            $(this.view.el).on('click','li',(e)=>{
                let $li = $(e.currentTarget)
                //this.view.activeItem($li)
                let songId =e.currentTarget.getAttribute('data-id')

                this.model.data.selectSongId = songId
                this.view.render(this.model.data)

                let songs = this.model.data.songs
                let data
                for(let i=0;i<songs.length;i++){
                    if(songs[i].id===songId){
                        data=songs[i]
                        break
                    }
                }
                let object =JSON.parse(JSON.stringify(data))
                window.eventHub.emit('activeItem',object)
            })
        },
        bindEventHub(){

            window.eventHub.on('create',(data)=>{
                this.model.data.songs.push(data)
                this.view.render(this.model.data)
            })

            window.eventHub.on('new',(data)=>{
                this.view.clearActive()
            })

            window.eventHub.on('update',(song)=>{
                let songs=this.model.data.songs
                for(let i=0;songs.length;i++){
                    if(songs[i].id === song.id){
                        Object.assign(songs[i],song)
                        this.view.render(this.model.data)

                    }
                }       
            })
        },
        getAllSongs(){
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view,model)
}