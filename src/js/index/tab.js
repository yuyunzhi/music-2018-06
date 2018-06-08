{
    let view={
        el:"#tabs",
        template:`
        <nav class="siteNav">
            <ol>
                <li class="active">
                <span>推荐音乐</span>
                </li>
                <li>
                    <span>热歌榜</span>
                </li>
                <li>
                    <span>搜索</span>
                </li>
            </ol>
        </nav>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model={
        data:{},
        numberLi:""
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.bindEvents()
        },
        bindEvents(){
            $(this.view.el).on('click','.siteNav>ol>li',(e)=>{
                let $li = $(e.currentTarget)
                let index = $li.index()
                this.model.numberLi = index
                $li.addClass('active')
                    .siblings().removeClass('active')
                    window.eventHub.emit("clickpage",this.model.numberLi)
              
            })

        }
    }
    controller.init(view,model)
}