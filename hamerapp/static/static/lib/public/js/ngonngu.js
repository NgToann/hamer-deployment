$(document).ready(function(){
  
    $(".changelang").click(function(){
     
                 $.post(URL+"ngonngu/change/"+$(this).attr("data-id"),function(o){
                     if(o.tinhtrang==1)
                         window.location=URL;
         
     },"JSON");
    })
})