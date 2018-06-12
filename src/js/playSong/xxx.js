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

result.map((item)=>{
    console.log()
    $aTag=$(`
    <a href="./song.html?id=${item.id}">
        <img src="./img/search.png" alt="">
        <p>${item[0].name}</p>
     </a>
    `)
    $('.searchSongList').append($aTag)
}) 