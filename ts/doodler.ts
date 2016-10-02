
export class Doodler {
    private _canvas: Element
    private _ctx: CanvasRenderingContext2D

    private _boundDraw: EventListenerObject

    constructor( id: string, parent: string, width: number, height: number) {
        let html = '<canvas id="'+ id +'" width="' + width + '" height="' + height + '"></canvas>'
        document.getElementById(parent).innerHTML = html

        this._canvas = document.getElementById(id)
        this._ctx = this._canvas.getContext("2d")

        this.start_draw_listeners()

        console.debug(this._ctx)
    }

    test_circle() {
        this._ctx.beginPath()
        this._ctx.arc(95,50,40,0,2*Math.PI)
        this._ctx.stroke()
    } 

    start_draw_listeners(){
        console.log("Doodler:start_draw_listeners")
        // this._canvas.addEventListener()
        this._canvas.addEventListener("mousedown", this.start_drawing.bind(this), false)
        this._canvas.addEventListener("mouseup", this.stop_drawing.bind(this), false)
    }

    stop_draw_listeners(){

    }

    start_drawing(evt: MouseEvent){
        console.group("Doodler::start_drawing")
        console.log(evt)
        console.log(evt.offsetX, evt.offsetY)
        console.groupEnd()
        this._boundDraw = this.draw.bind(this)
        this._canvas.addEventListener("mousemove", this._boundDraw, false)

        let x = evt.offsetX
        let y = evt.offsetY
        
        this._ctx.moveTo(x,y)
    }

    draw(evt: MouseEvent){
        console.group("Doodler::draw")
        console.log(evt.offsetX, evt.offsetY)
        console.groupEnd()

        let x = evt.offsetX
        let y = evt.offsetY
        this._ctx.lineTo(x,y)
        this._ctx.stroke()

    }

    stop_drawing(evt: MouseEvent){
        console.group("Doodler::stop_drawing")
        console.log(evt.offsetX, evt.offsetY)
        console.groupEnd()
        this._canvas.removeEventListener("mousemove", this._boundDraw, false)
        this._canvas.removeEventListener

        let x = evt.offsetX
        let y = evt.offsetY
        this._ctx.lineTo(x,y)
        this._ctx.stroke()
        
    }
}