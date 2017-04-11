import {iColorSource} from "./iColorSource"

// import * as lang from "dojo/_base/lang"

export class Doodler {
    private _canvas: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D

    private _bound_draw: EventListenerObject = null
    private _bound_start_drawing: EventListenerObject = null
    private _bound_stop_drawing: EventListenerObject = null

    private _color_source: iColorSource

    private _saved_image: string

    private _draw_end_callbacks: Function[] = []

    constructor( id: string, parent: string, width: number, height: number, color_source: iColorSource ) {
        
        this._color_source = color_source

        this._canvas = document.createElement("canvas")
        this._canvas.id = id
        this._canvas.classList.add('doodler-canvas')
        this._canvas.width = width
        this._canvas.height = height
        document.getElementById(parent).appendChild(this._canvas)
        this._ctx = this._canvas.getContext("2d")

        // disable the context menu
        this._canvas.oncontextmenu = function(){ return false }

        if(this._color_source){
            this.start_draw_listeners()
            this.set_line_width(4)
        }

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
        if(evt.button == 0 && this._bound_draw === null){
            let bound_draw = this.draw.bind(this)
            this._bound_draw = bound_draw
            this._canvas.addEventListener("mousemove", bound_draw, false)

            let x = evt.offsetX, y = evt.offsetY
            let color = this._color_source.get_primary_hsl().as_string()
            this._ctx.strokeStyle = color
            let lw = this._ctx.lineWidth
            this._ctx.beginPath()
            // @TODO: let the user just click once to add a dot
            // this._ctx.moveTo(x-lw/4,y)
            // this._ctx.lineTo(x+lw/2,y)
            // this._ctx.stroke()
        }
    }

    private draw(evt: MouseEvent){
        if(evt.button == 0){
            let x = evt.offsetX, y = evt.offsetY
            this._ctx.lineTo(x,y)
            this._ctx.stroke()
        }

    }

    private stop_drawing(evt: MouseEvent){
        if(evt.button == 0 && this._bound_draw !== null){
            this._canvas.removeEventListener("mousemove", this._bound_draw, false)
            this._bound_draw = null

            let x = evt.offsetX, y = evt.offsetY
            this._ctx.lineTo(x,y)
            
            this._ctx.stroke()

            this.on_draw_end()
        }
    }

    private on_draw_end(){
        console.log("Doodler::_on_draw_end")

        for( let f of this._draw_end_callbacks){
            f()
        }
    }

    add_draw_end_callback(f: Function){
        console.log("Doodler::_on_draw_end")

        this._draw_end_callbacks.push(f)
    }

    clear_canvas(){
        console.log("Doodler::clear_canvas")
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
        this._ctx.beginPath() // call this just for safety
    }

    save_image(){
        console.log("Doodler::save_canvas_blob")
        return this._canvas.toDataURL('image/png')
    }

    load_image(img: string) {
        console.log("Doodler::load_image")
        let image = new Image(this._canvas.width,this._canvas.height)
        image.onload = function onImageLoad() {
            this._ctx.drawImage(image,0,0)
        }.bind(this)
        image.src = img
    }

}