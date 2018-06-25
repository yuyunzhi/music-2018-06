
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
        update(data){
             // 第一个参数是 className，第二个参数是 objectId
             var song = AV.Object.createWithoutData('Song', this.data.id)
             song.set('name', data.name)
             song.set('singer', data.singer)
             song.set('url', data.url)            
             // 保存到云端
             return song.save().then((response)=>{
                Object.assign(this.data,data)
                return response
             })
        },
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
                //未改动前 this.data={id,...attributes}
                this.data={background,cover,descript,hotSong,lyric,name,url,id}
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
            window.eventHub.on("new",(data)=>{
                this.view.editSong(data)//更改编辑、新建的title
                if(this.model.data.id){
                    this.model.data={} 
                } else{
                    Object.assign(this.model.data,data)
                }
                this.view.render(this.model.data)  //渲染页面的歌曲信息
            })


            window.eventHub.on('activeItem',(data)=>{
                this.model.data = data
                this.view.render(this.model.data)
            })

        },
        create(){
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
        },
        update(){
            let needs = ['name','singer','url']
            let data={}
            needs.map((string)=>{
                data[string]=this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.update(data)
                .then(()=>{
                    alert('更新成功了')
                    window.eventHub.emit('update',this.model.data)
                })

        },
        bindEvents(){
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()              
                if(this.model.data.id){
                    this.update()
                }else{
                    this.create()
                }

            })
        }
    }
    controller.init(view,model)
}