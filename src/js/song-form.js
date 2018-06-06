
{
    let view = {
        el:'.page > main',
        template:`
        <form>
            <div class="row">
                <label for="">歌名
                    <input type="text" value="__xxx__">
                </label>
            </div>

            <div class="row">
                <label for="">歌手
                    <input type="text">
                </label>
            </div>
            
            <div class="row">
                <label for="">外链
                    <input type="text" value="__yyy__">
                </label>
            </div>

            <div class="row">
                    <button type="submit">保存</button>
            </div>
        </form>

        <span id="uploadStatus"></span>

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
        }

    }
    controller.init(view,model)
}