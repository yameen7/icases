function open_popup(e){
    let popup =$('.popup');
    let target = e.currentTarget.children[2].id;
    if($('#'+target).css('display')==='block')
    {
        $('#'+target).css('display',"none")
    }
    else{
        for(let i=0;i<popup.length;i++){
            console.log(popup[i])
            $('.'+popup[i].className).css("display","none");
        }
        $('#'+target).css('display',"block")
    }
}

function openmenu(){
   $('#nav-bar').toggle();
}