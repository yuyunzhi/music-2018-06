page-1-1

{
    let view={
        el:"#musicList",
        template:`
        <h2>
            <span>最新音乐</span>
        </h2>
        <div class="loading">
            <img class="loadingImg"src="./img/loading.gif" alt="loading">
        </div>
        <ol id="lastestMusic"></ol>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model={
        data:{},
        find(){
            let query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs=songs.map((song)=>{
                    return {id:song.id,...song.attributes }
                })
                return songs
              });
        }
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.model.find().then((data)=>{
                let songs=data
                songs.map((song)=>{
                    let name = song.attributes.name
                    let singer =song.attributes.singer
                    let url =song.attributes.url
                    let id = song.id
                    console.log(name,singer,url,id)
                    let $li = $(`
                    <li>
                        <h3>${name}</h3>
                        <div class='sq'></div>
                        <p>${singer}</p>
                        <a href="./song.html?id=${id}">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-play1"></use>
                            </svg>
                        </a>
                    </li>           
                    `)
                    $(this.view.el).find('#lastestMusic').append($li)
                })
            })
            this.view.render(this.model.data)
        }
    }

    controller.init(view,model)
}