let saturation = document.getElementById("saturation");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");

let upload = document.getElementById("upload");
let imgBox = document.querySelector(".img-box");
let img = document.getElementById("img");

let download = document.getElementById("download")
let reset = document.getElementById("reset");

let filters = document.querySelectorAll("ul li input");

let rotateBtn = document.getElementById("rotate");


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = function(){
    rotateBtn.style.display = "none";
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";

}

upload.onchange = function(){

    resetValues();  
    rotateBtn.style.display = "block";
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block"

    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){
        img.src = file.result
    }
    img.onload = function (){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0,  canvas.width, canvas.height);
        img.style.display = "none";
    }
}

filters.forEach(function(filter){
    filter.addEventListener("input", function(){
        ctx.filter = `
        saturate(${saturation.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        `
        ctx.drawImage(img, 0, 0,  canvas.width, canvas.height);
    })
})

// reset.onclick = function(){
//     img.style.filter.saturation.value = "100"
//     img.style.filter.contrast.value = "100"
//     img.style.filter.brightness.value = "100"
//     img.style.filter.grayscale.value = "0"
//     img.style.filter.blur.value = "0"
// }

function resetValues(){
    ctx.filter = "none"
    saturation.value = "100"
    contrast.value = "100"
    brightness.value = "100"
    grayscale.value = "0"
    blur.value = "0"
    ctx.drawImage(img, 0, 0,  canvas.width, canvas.height);

}

let deg = 0 ;
rotateBtn.onclick = function(){
    deg = deg + 180;
    canvas.style.transform = `rotate(${deg}deg)`;

}
download.onclick = function(){
    download.href = canvas.toDataURL();
}