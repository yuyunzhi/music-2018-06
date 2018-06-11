
    //disc 容器

{
    let view = {
        el:'.disc-container',
        render(data){
            $('.page').css('background-image',`url(${data.background})`)
            $(this.el).find('.cover').attr('src',data.cover)
        }
    }
    let model = {
        data:{
            song:{
            },
            id:''
        },
        getId(id){
            var query = new AV.Query('Song')
            return query.get(id).then((song)=>{
                window.eventHub.emit('songInformaition',song.attributes)
                return song.attributes
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
            this.model.getId(this.model.data.id).then((data)=>{
                this.view.render(data)
            })
            this.bindEventHub()

        },
        bindEventHub(){
            window.eventHub.on('oncanplay',()=>{
                $('.disc').addClass('active')
                $('.icon-pause').addClass('playing')
            })
            window.eventHub.on('stop',()=>{
                $('.icon-play').removeClass('playing')
                $('.icon-pause').addClass('playing')
                $('.disc').addClass('active')
            })
            window.eventHub.on('play',()=>{
                $('.icon-pause').removeClass('playing')
                $('.icon-play').addClass('playing')
                $('.disc').removeClass('active')
            })

        }
    }
    controller.init(view,model)
}