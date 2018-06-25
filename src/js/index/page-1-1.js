{
    //推荐歌单
    let view={
        el:"section.playLists",
        template:
        `
        <h2>
            <span>推荐歌单</span>
        </h2>
        <ul>
            <li>
                <img src="./img/1.jpg" alt="1.jpg">
                <p>生活明朗，万物可爱</p>
            </li>
            <li>
                <img src="./img/2.jpg" alt="2.jpg">
                <p>线上空调 | 如何用一把吉他冰镇夏天</p>
            </li>
            <li>
                <img src="./img/3.jpg" alt="3.jpg">
                <p>难道六岁的我 就不能为爱流一次眼泪吗</p>
            </li>
            <li>
                <img src="./img/4.jpg" alt="4.jpg">
                <p>中文hip hop 听就完事儿了</p>
            </li>
            <li>
                <img src="./img/5.jpg" alt="5.jpg">
                <p>单曲循环|｡･㉨･)っ♡　喜欢你♪</p>
            </li>
            <li>
                <img src="./img/6.jpg" alt="6.jpg">
                <p>予你情诗百首，余生你是我的所有</p>
            </li>
        </ul>
        
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model={
        data:{},
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)

        }
    }
    controller.init(view,model)

}