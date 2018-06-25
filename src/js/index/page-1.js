{
 //加载page-1的两个个模块
    let view ={
        el:'#page-1',
        show(){
            $(`#page-1`).addClass('active')
        },
        hide(){
            $(`#page-1`).removeClass('active')
        },
    }
    let model={
        data:{}
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.startSwiper()
            this.loadModlue1()
            this.loadModlue2()
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('clickpage',(data)=>{
                if(data===0){
                    this.view.show()
                    this.startSwiper()
                }else{
                    this.view.hide()
                }              
            })
        },
        startSwiper(){
            var mySwiper = new Swiper ('.swiper-container', {               
                loop: true,           
                // If we need pagination
                pagination: {
                el: '.swiper-pagination',
                },           
                // And if we need scrollbar
                scrollbar: {
                el: '.swiper-scrollbar',
                },
                autoplay: {
                delay: 1500,
                stopOnLastSlide: false,
                disableOnInteraction: true,
                }
            })
        },
        loadModlue1(){
            let script1 = document.createElement('script')
            script1.src = './js/index/page-1-1.js'
            document.body.appendChild(script1)
            //script1.onload= function(){console.log('1加载完毕')}
        },
        loadModlue2(){
            let script2 = document.createElement('script')
            script2.src = './js/index/page-1-2.js'
            document.body.appendChild(script2)
            //script2.onload= function(){console.log('2加载完毕')}
        }
    }
    controller.init(view,model)
}