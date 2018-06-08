{
    let view ={
        el:'#page-3',
        show(){
            $(`#page-3`).addClass('active')
        },
        hide(){
            $(`#page-3`).removeClass('active')
        },
        template:`
        
        `

    }
    let model={}
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('clickpage',(data)=>{
                if(data===2){
                    this.view.show()
                }else{
                    this.view.hide()
                }              
            })
        }
    }
    controller.init(view,model)
}