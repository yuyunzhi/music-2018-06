

$(function(){
    $.get('./song.json').then(function(response){
        let items = response
        items.forEach((i)=>{
            let $li = $(`
            <li>
                <h3>${i.name}</h3>
                <div class='sq'></div>
                <p>${i.descript}</p>
                <a href="./song.html?id=${i.id}">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-play1"></use>
                    </svg>
                </a>
            </li>           
            `)
            $('#lastestMusic').append($li)
        })
        $('.loading').remove()

    }  )

})
