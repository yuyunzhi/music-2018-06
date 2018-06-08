{

    let view = {
        el:'#song-description',
        template:`
            <h2></h2>
            <div class="lyric">
                <div class="line"></div>
            </div>
        `,
        render(data){
            $(this.el).html(this.template)
        },
        renderText(descript,lyric){ 
            $(this.el).find('h2').text(descript)

        }
    }
    let model = {
        data:{
            descript:{},
            lyric:{},
            id:'',
        },
        getId(){
            var query = new AV.Query('Song')
            return query.get(this.data.id).then((song)=>{
                Object.assign(this.data,song.attributes)
                return song
        })

        },
        queryNumber(){
            let id = window.location.search.substring(4)
            this.data.id = id
        },      
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.model.queryNumber()
            this.model.getId().then(()=>{
                console.log(this.model.data)
            })

            this.view.render(this.model.data)
        }
    }
    controller.init(view,model)
}