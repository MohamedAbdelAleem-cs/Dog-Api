let timer;
let deleteFirstphotoDelay;

async function start(){
    try{
    const response=await fetch("https://dog.ceo/api/breeds/list/all");
    const data=await response.json();
    createList(data.message);
    }
    catch(error){
        console.log("error ",error);
    }
}

start();



function createList(breedList){
    document.getElementById("breed").innerHTML=`
    <select onchange="loadbyBreed(this.value)">
<option>Choose a dog breed</option>
    ${Object.keys(breedList).map(function(breed){
        return `<option>${breed}</option>`;
    }).join('')};
</select>
`;
}


async function loadbyBreed(breed){
    if(breed!=="Choose a dog breed"){
     const response=await fetch(`https://dog.ceo/api/breed/${breed}/images`);
     const data=await response.json();
     
     createSlideShow(data.message);
    }
}
function createSlideShow(images){
    let Pos=0;
    clearInterval(timer);
    clearTimeout(deleteFirstphotoDelay);
    const imgSpace=document.querySelector('#slideshow');
    if(images.length>1){
    imgSpace.innerHTML=`
                <div class="slide" style="background-image: url('${images[0]}')"></div>
                <div class="slide" style="background-image: url('${images[1]}')"></div>
               
`;
    Pos+=2;
    if(images.length==2){
        Pos=0;
    }
    timer=setInterval(nextSlide,3000);
    }
    else{
        imgSpace.innerHTML=`
                <div class="slide" style="background-image: url('${images[0]}')"></div>
                <div class="slide"></div>
               
`;
    }
    function nextSlide(){
        imgSpace.insertAdjacentHTML("beforeend", ` <div class="slide" style="background-image: url('${images[Pos]}')"></div>`);
       deleteFirstphotoDelay= setTimeout(function(){
            document.querySelector(".slide").remove();
        }, 1000);
        if(Pos+1>=images.length){
            Pos=0;
        }
        else{
            Pos++;
        }
    }
}