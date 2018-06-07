{
    let view = {
        el:".page>.siderbar>.newSong",
        template:`
            <p>新建歌曲</p>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventHub()
        },
        active(){
            $(this.view.el).addClass('active')
        },
        removeActive(){
            $(this.view.el).removeClass('active')
        },
        bindEvents(){
            $(this.view.el).on('click','p',()=>{
                this.active()
                window.eventHub.emit('new',data={})
            })
        },
        bindEventHub(){
            window.eventHub.on('uploadData',()=>{
                this.active()
            })
            window.eventHub.on('activeItem',()=>{
                this.removeActive()
            })
        }
    }

    controller.init(view,model)
}