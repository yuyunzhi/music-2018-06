{
    let view ={
        el:'#page-2',
        show(){
            $(`#page-2`).addClass('active')
        },
        hide(){
            $(`#page-2`).removeClass('active')
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
                if(data===1){
                    this.view.show()
                }else{
                    this.view.hide()
                }              
            })
        }
    }
    controller.init(view,model)
}