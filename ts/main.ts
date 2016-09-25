

function init(id: string, parent: string, width: number, height: number){
    var html = '<canvas id="'+ id +'" width="' + width + '" height="' + height + '"></canvas>'
    document.getElementById(parent).innerHTML = html

    var c = document.getElementById(id)
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(95,50,40,0,2*Math.PI);
    ctx.stroke();


}

init('doodler-canvas',"doodler-container", 800, 600)

