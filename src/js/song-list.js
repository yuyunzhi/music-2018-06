

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
            let liList = songs.map((song)=>{
                let li =$(`<li></li>`).text(song.name).attr('data-id',song.id)
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
            songs:[]
        },
        find(){
            let query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs=songs.map((song)=>{
                    return {id:song.id,...song.attributes }
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
                this.view.activeItem($li)
                let songId =e.currentTarget.getAttribute('data-id')
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
            window.eventHub.on('uploadData',()=>{
                this.view.clearActive()
            })
            window.eventHub.on('create',(data)=>{
                this.model.data.songs.push(data)
                this.view.render(this.model.data)
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