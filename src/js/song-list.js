

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
                let li =$(`<li></li>`).text(song.name)
                return li
            })
            $(this.el).find('ul').empty()
            liList.map((domLi)=>{
                $(this.el).find('ul').append(domLi)
            })       
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {
        data:{
            songs:[]
        }
    }
    let controller ={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            window.eventHub.on('uploadData',()=>{
                this.view.clearActive()

            })
            window.eventHub.on('create',(data)=>{
                this.model.data.songs.push(data)
                this.view.render(this.model.data)

            })
        }
    }
    controller.init(view,model)
}