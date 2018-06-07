
{
    let view = {
        el:'.page > main',
        init(){
            this.$el=$(this.el)
        },
        template:`

        <form>
            <div class="row">
                <label for="">歌名
                    <input name="name" type="text" value="__name__">
                </label>
            </div>

            <div class="row">
                <label for="">歌手
                    <input name="singer" type="text" value="__singer__">
                </label>
            </div>
            
            <div class="row">
                <label for="">外链
                    <input name="url"type="text" value="__url__">
                </label>
            </div>

            <div class="row">
                    <button type="submit">保存</button>
            </div>
        </form>

        `,
        render(data){
            let place = ['name','singer','url','id']
            let html = this.template
            place.map((string)=>{
                html=html.replace(`__${string}__`,data[string]||'')
            })
            $(this.el).html(html)
            this.editSong(data)

        },
        reset(){
            this.render({})
        },
        editSong(data){
            if(data.id){

                $(this.el).find('p').remove()
                $(this.el).prepend('<p>编辑歌曲</p>')
            }else{
                $(this.el).find('p').remove()
                $(this.el).prepend('<p>新建歌曲</p>')
            }
        }

    }
    
    let model = {
        data:{
            name:'',
            singer:'',
            url:''
        },
        hash:{},
        create(data){
            // 声明类型
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('name',data.name);
            song.set('singer',data.singer);
            song.set('url',data.url);            
            // 设置优先级
            return song.save().then((newSong)=>{
                let {id,attributes}=newSong
                this.data={id,...attributes}  
            },(error)=>{
                console.log('失败了');
            });

        } 
    }

    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
            this.view.render(this.model.data)
            window.eventHub.on("uploadData",(data)=>{
                this.view.render(data)
            })
            window.eventHub.on('activeItem',(data)=>{
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',(data)=>{
                this.view.editSong({})
                this.model.data = data
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()
                let needs = ['name','singer','url']
                let data={}
                needs.map((string)=>{
                    data[string]=this.view.$el.find(`[name="${string}"]`).val()
                })
                this.model.create(data)
                    .then(()=>{
                         this.view.reset()
                         window.eventHub.emit('create',this.model.data)
                })

            })
        }
    }
    controller.init(view,model)
}