{
    let view = {
        el:".page>.siderbar>.newSong",
        template:`
            新建歌曲
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
            window.eventHub.on('uploadData',()=>{
                this.active()
            })
            window.eventHub.on('activeItem',()=>{
                this.removeActive()
            })
        },
        active(){
            $(this.view.el).addClass('active')
        },
        removeActive(){
            $(this.view.el).removeClass('active')
        }
    }

    controller.init(view,model)
}