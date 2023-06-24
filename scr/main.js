const img1 = new Image();
const img2 = new Image();
const img3 = new Image();
const img1_ap = new Image();
const img2_ap = new Image();
const img3_ap = new Image();
var cropperImg = document.getElementById('trim');
var img_x = cropperImg.width
let __count__ = 0;


function updateValue(e) {
    var fileReader = new FileReader();
    //fileのパス
    var file = e.target.files[0];
    var class_name = e.target.className.split(' ');
    var img = class_name[0]
    console.log(img)
    //var img = e.target.class;
    //fileをdata: URL の文字列に
    fileReader.readAsDataURL(file);
    // document.getElementById(img).src = this.result
    fileReader.onload = function () {
        document.getElementById(img).src = this.result
        console.log(document.getElementById(img))
    }

}



document.getElementById('first_done').addEventListener('click', function () {
    var url = document.getElementById('img1').src;
    var img_x = document.getElementById('img1').width
    cropper = new Cropper(cropperImg, {
        viewMode: 1,
        minCropBoxWidth: img_x,
        scalable: false,
        zoomable: false,
    });
    cropper.replace(url)
});

document.getElementById('second_done').addEventListener('click', function () {
    cropperData = cropper.getData();
    var trim_height = cropperData.height
    var trim_pos_y = cropperData.y
    comb(trim_height, trim_pos_y)
});

document.getElementById('third_done').addEventListener('click', function () {
    var canvas = document.getElementById("canvas1");
    var link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "result.png";
    link.click();
});


document.getElementById('input1').addEventListener('change', updateValue);
document.getElementById('input1_ap').addEventListener('change', updateValue);
document.getElementById('input2').addEventListener('change', updateValue);
document.getElementById('input2_ap').addEventListener('change', updateValue);
document.getElementById('input3').addEventListener('change', updateValue);
document.getElementById('input3_ap').addEventListener('change', updateValue);

function comb(trim_height, trim_pos_y) {
    //描画コンテキストの取得
    var canvas = document.getElementById('canvas');
    var sw = document.getElementById('img1').width;
    var sh = document.getElementById('img1').height;
    canvas.setAttribute("width", sw);
    canvas.setAttribute("height", sh);
    var context = canvas.getContext('2d');
    //context.drawImage(img1, sx,sy); //うまくいく
    //一枚目
    img1.src = document.getElementById('img1').src
    img1_ap.src = document.getElementById('img1_ap').src
    context.drawImage(img1, 0, 0);
    //一枚目A
    //ctx.drawImage  (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    context.drawImage(img1_ap, 0, trim_pos_y, sw, trim_height, 0, trim_pos_y - trim_height, sw, trim_height);


    //同じ事を２度やる 2枚目用
    var canvas2 = document.getElementById('canvas2');
    canvas2.setAttribute("width", sw);
    canvas2.setAttribute("height", sh);
    var context2 = canvas2.getContext('2d');
    img2.src = document.getElementById('img2').src
    img2_ap.src = document.getElementById('img2_ap').src
    context2.drawImage(img2, 0, 0);
    context2.drawImage(img2_ap, 0, trim_pos_y, sw, trim_height, 0, trim_pos_y - trim_height, sw, trim_height);
    //同じ事を２度やる 3枚目用
    var canvas3 = document.getElementById('canvas3');
    canvas3.setAttribute("width", sw);
    canvas3.setAttribute("height", sh);
    var context3 = canvas3.getContext('2d');
    img3.src = document.getElementById('img3').src
    img3_ap.src = document.getElementById('img3_ap').src
    context3.drawImage(img3, 0, 0);
    context3.drawImage(img3_ap, 0, trim_pos_y, sw, trim_height, 0, trim_pos_y - trim_height, sw, trim_height);

    //合成用
    var canvas4 = document.getElementById('canvas4');
    canvas4.setAttribute("width", sw);
    canvas4.setAttribute("height", sh * __count__ + 1);
    var context4 = canvas.getContext('2d');
    context4.drawImage(context, 0, 0)
    context4.drawImage(context2, 0, sh + 1)
    context4.drawImage(context3, 0, sh * 2 + 1)
}




