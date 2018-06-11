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

window.console={
    log(x){
        let p = document.createElement('p')
        p.innerText =x
        consoleOutput.appendChid(p)
    }
}
//创建一个id为consoleOutput的div，然后写fix的样式
