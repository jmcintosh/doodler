
export class Doodler {
    private _canvas: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D

    private _bound_draw: EventListenerObject[] = []
    private _bound_start_drawing: EventListenerObject = null
    private _bound_stop_drawing: EventListenerObject = null

    private saved_image: string

    constructor( id: string, parent: string, width: number, height: number ) {
        this._canvas = document.createElement("canvas")
        this._canvas.id = id
        this._canvas.width = width
        this._canvas.height = height
        document.getElementById(parent).appendChild(this._canvas)
        this._ctx = this._canvas.getContext("2d")

        // disable the context menu
        this._canvas.oncontextmenu = function(){ return false }

        this.start_draw_listeners()
        this.set_line_width(1)
    }

    private test_circle() {
        this._ctx.beginPath()
        this._ctx.arc(95,50,40,0,2*Math.PI)
        this._ctx.stroke()
    } 

    private start_draw_listeners(){
        console.log("Doodler:start_draw_listeners")
        // this._canvas.addEventListener()

        if (!this._bound_start_drawing) {
            this._bound_start_drawing = this.start_drawing.bind(this)
            this._canvas.addEventListener("mousedown", this._bound_start_drawing, false)
        }

        if (!this._bound_stop_drawing) {
            this._bound_stop_drawing = this.stop_drawing.bind(this)
            this._canvas.addEventListener("mouseup", this._bound_stop_drawing, false)
        }
    }

    private stop_draw_listeners(){
        console.log("Doodler:stop_draw_listeners")
        if (this._bound_start_drawing) {
            this._canvas.removeEventListener("mousedown", this._bound_start_drawing, false)
            this._bound_start_drawing = null
        }
        
        if (this._bound_stop_drawing){
            this._canvas.removeEventListener("mouseup", this._bound_stop_drawing, false)
            this._bound_stop_drawing = null
        }
    }

    private set_line_width(width: number){
        this._ctx.lineWidth = width
    }

    private start_drawing(evt: MouseEvent){
        // console.group("Doodler::start_drawing")
        // console.log(evt)
        // console.log(evt.offsetX, evt.offsetY)
        // console.groupEnd()
        if(evt.button == 0){
            let bound_draw = this.draw.bind(this)
            this._bound_draw.push(bound_draw)
            this._canvas.addEventListener("mousemove", bound_draw, false)

            let x = evt.offsetX, y = evt.offsetY
            
            this._ctx.beginPath()
            this._ctx.moveTo(x,y)
            let width = this._ctx.lineWidth
            x = x - Math.floor(width/2)
            y = y - Math.floor(width/2)
            this._ctx.fillRect( x, y, width, width ); // adds a single pixel
        }
    }

    private draw(evt: MouseEvent){
        // console.group("Doodler::draw")
        // console.log(evt.offsetX, evt.offsetY)
        // console.groupEnd()
        if(evt.button == 0){
            let x = evt.offsetX, y = evt.offsetY
            this._ctx.lineTo(x,y)
            this._ctx.stroke()
        }

    }

    private stop_drawing(evt: MouseEvent){
        // console.group("Doodler::stop_drawing")
        // console.log(evt.offsetX, evt.offsetY)
        // console.groupEnd()
        if(evt.button == 0){
            for(let bound_draw of this._bound_draw){
                this._canvas.removeEventListener("mousemove", bound_draw, false)
            }

            let x = evt.offsetX, y = evt.offsetY
            this._ctx.lineTo(x,y)
            let width = this._ctx.lineWidth
            x = x - Math.floor(width/2)
            y = y - Math.floor(width/2)
            this._ctx.fillRect( x, y, width, width ); // adds a single pixel
            
            this._ctx.stroke()
        }

    }

    clear_canvas(){
        console.log("Doodler::clear_canvas")
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
        this._ctx.beginPath() // call this just for safety
    }

    save_image(){
        console.log("Doodler::save_canvas_blob")
        this.saved_image = this._canvas.toDataURL('image/png')
    }

    load_image(){
        console.log("Doodler::load_canvas_blob")
        let image = new Image()
        image.src = this.saved_image
        this._ctx.drawImage(image,0,0)
    }

}