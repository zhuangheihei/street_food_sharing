var counter = 0;
function changeBG(){
    var imgs = [
        "url(http://www.slyar.com/blog/wp-content/uploads/2012/08/DSC_0804.jpg)",
        "url(https://i.pinimg.com/736x/12/3e/5e/123e5ea22e11bd2368ebfab1d31ef8b4--japanese-street-food-japanese-food.jpg)",
        "url(http://www.slyar.com/blog/wp-content/uploads/2012/08/DSC_0805.jpg)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 5000);


