{
    let view = {
        el:'',
        template:``,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {
        data:{}
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.reder(this.model.data)
        }
    }
    controller.init(view,model)
}


