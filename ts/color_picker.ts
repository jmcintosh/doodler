import {HSL} from "./hsl"
import {iColorSource} from "./iColorSource"

export class ColorPicker implements iColorSource{
    private _canvas: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D

    private _l_slider: HTMLInputElement

    private _primary_preview: HTMLDivElement
    private _secondary_preview: HTMLDivElement

    private primary_hsl: HSL = null
    private secondary_hsl: HSL = null

    constructor( id: string, parent: string, width: number, height: number ){
        this._canvas = document.createElement("canvas")
        this._canvas.id = id
        this._canvas.width = width
        this._canvas.height = height
        this._canvas.style.display = "inline"
        let parent_elmt = document.getElementById(parent)
        parent_elmt.appendChild(this._canvas)
        this._ctx = this._canvas.getContext("2d")

        // disable the context menu
        this._canvas.oncontextmenu = function(){ return false }

        this._l_slider = document.createElement("input")
        this._l_slider.setAttribute("type", "range")
        this._l_slider.min = "0"
        this._l_slider.max = "100"
        this._l_slider.value = "50"

        // add color gradient
        this.draw_gradient()

        this.primary_hsl = new HSL(0)
        this.secondary_hsl = new HSL(180)

        this._primary_preview = document.createElement("div")
        this._primary_preview.style.height = height/2 + "px"
        this._primary_preview.style.width = height/2 + "px"
        this._primary_preview.style.backgroundColor = this.primary_hsl.as_string()
        this._primary_preview.style.display = "inline-block"
        this._primary_preview.style.position = "relative"
        this._primary_preview.style.bottom = height/2 + "px"

        this._secondary_preview = document.createElement("div")
        this._secondary_preview.style.height = height/2 + "px"
        this._secondary_preview.style.width = height/2 + "px"
        this._secondary_preview.style.backgroundColor = this.secondary_hsl.as_string()
        this._secondary_preview.style.display = "inline-block"
        this._secondary_preview.style.position = "relative"
        this._secondary_preview.style.right = height/2 + "px"


        parent_elmt.appendChild(this._primary_preview)
        parent_elmt.appendChild(this._secondary_preview)
        parent_elmt.appendChild(this._l_slider)
        parent_elmt.style.display = "inline"


        this.init_event_listeners()
    }

    get_primary_hsl(){
        return this.primary_hsl
    }

    get_secondary_hsl(){
        return this.secondary_hsl
    }

    init_event_listeners(){
        console.log("ColorPicker::init")
        this._canvas.addEventListener("mousedown",this.pick_color.bind(this))
        this._l_slider.addEventListener("input",this.draw_gradient.bind(this))
    }

    draw_gradient(){
        let width = this._canvas.width
        let height = this._canvas.height
        let l = this._l_slider.value

        for (let i = 0; i < width; i++) {
            for(let j = 0; j < height; j++){
                let h = this.normalize_h(i)
                let s = this.normalize_s(j)
                this._ctx.fillStyle = "hsl(" + h + "," + s + "%," + l +"%)"
                this._ctx.fillRect(i,j,1,1)
            }
        }
    }

    pick_color(evt: MouseEvent){
        console.log("ColorPicker::pick_color",evt)

        let h = this.normalize_h(evt.offsetX)
        let s = this.normalize_s(evt.offsetY)
        let l = Number(this._l_slider.value)

        if(evt.button == 0 ){ // set primary_hsl
            this.primary_hsl.set(h,s,l)
            this._primary_preview.style.backgroundColor = this.primary_hsl.as_string()
        } else if( evt.button == 2 ){
            this.secondary_hsl.set(h,s,l)
            this._secondary_preview.style.backgroundColor = this.secondary_hsl.as_string()
        }


    }

    normalize_h(h: number){
        return Math.floor(h * 360/this._canvas.width)
    }

    normalize_s(s: number){
        return Math.floor(100-(s * 100/this._canvas.height))
    }

}