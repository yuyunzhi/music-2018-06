
    //disc 容器

{
    let view = {
        el:'.disc-container',
        template:`       
        <div class="icon-wrapper">
        
        <svg class="icon icon-play" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
        </svg>
        <svg class="icon icon-pause" aria-hidden="true">
            <use xlink:href="#icon-pause"></use>
        </svg>
        </div>
    
        <img class="pointer"src="https://s3.music.126.net/m/s/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862" alt="">
        
        <div class="disc">
            <img class="ring" src="https://s3.music.126.net/m/s/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48" alt="">
            <img class="light" src="https://s3.music.126.net/m/s/img/disc_light-ip6.png?996fc8a2bc62e1ab3f51f135fc459577" alt="" class="linght">
            <img class="cover" src="https://i.loli.net/2018/06/09/5b1bf1ea204f8.png" alt="">
        </div>
    `,
        render(data){
            $(this.el).html(this.template)
        },
    }
    let model = {
        data:{
            id:"",
            cover:""
        },
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEventHub(this.model.data)

        },
        bindEventHub(){
            window.eventHub.on('oncanplay',()=>{
                $('.disc').addClass('active')
                $('.icon-pause').addClass('playing')
            })
            window.eventHub.on('stop',()=>{
                $('.icon-play').removeClass('playing')
                $('.icon-pause').addClass('playing')
                $('.disc').addClass('active')
            })
            window.eventHub.on('play',()=>{
                $('.icon-pause').removeClass('playing')
                $('.icon-play').addClass('playing')
                $('.disc').removeClass('active')
            })

        }
    }
    controller.init(view,model)
}