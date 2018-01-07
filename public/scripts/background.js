var counter = 0;
function changeBG(){
    var imgs = [
        "url(http://www.slyar.com/blog/wp-content/uploads/2012/08/DSC_0804.jpg)",
        "url(https://media.cntraveler.com/photos/59baad8b56085e35b15e7622/master/pass/Bangkok_GettyImages-sb10065342aq-001.jpg)",
        "url(http://www.slyar.com/blog/wp-content/uploads/2012/08/DSC_0805.jpg)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 5000);


