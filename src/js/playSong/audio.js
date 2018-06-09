{

    let view = {
        el:'#app',
        template:`<audio autoplay src={{url}}></audio>`,
        render(data){

            $(this.el).html(this.template.replace('{{url}}',data.url))

        },
        initPlayIcon(data){
            window.eventHub.emit('oncanplay',data.id)
        }
    }
    let model = {
        data:{},
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
                this.view.render(this.model.data)
            })
            this.view.initPlayIcon(this.model.data)
            this.bindEvents(this.view)
        },
        bindEvents(view){
            //点击播放图标，开始播放，显示暂停按钮
            $('.icon-play').on('click',function(){
                window.eventHub.emit('stop')
                let audio = $(view.el).find('audio')[0]
                audio.play()
            })

           //点击暂停按钮，停止播放，显示播放图标
           $('.icon-pause').on('click',function(){
                window.eventHub.emit('play')
                let audio = $(view.el).find('audio')[0]
                audio.pause();
        })
        }
    }
    controller.init(view,model)
}