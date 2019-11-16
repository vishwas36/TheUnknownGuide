var count=0;

function slideshow(){
    var a=document.getElementById('aa');
    var list=["../images/insp2.jpg","../images/insp1.jpg","../images/insp3.jpg","../images/insp4.jpg"];
    a.src=list[count%list.length];
    count++;
}
setInterval('slideshow()',5000);
