export class ColorPicker{
    private _canvas: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D

    private _preview: HTMLSpanElement
    private _primary_preview: HTMLDivElement
    private _secondary_preview: HTMLDivElement

    readonly primary_hsl: hsl = null
    readonly secondary_hsl: hsl = null

    constructor( id: string, parent: string, height: number ){
        this._canvas = document.createElement("canvas")
        this._canvas.id = id
        this._canvas.width = 360
        this._canvas.height = height
        this._canvas.style.display = "inline"
        let parent_elmt = document.getElementById(parent)
        parent_elmt.appendChild(this._canvas)
        this._ctx = this._canvas.getContext("2d")

        // disable the context menu
        this._canvas.oncontextmenu = function(){ return false }

        this._primary_preview = document.createElement("div")
        this._primary_preview.style.height = height/2 + "px"
        this._primary_preview.style.width = height/2 + "px"
        this._secondary_preview = document.createElement("div")
        this._secondary_preview.style.height = height/2 + "px"
        this._secondary_preview.style.width = height/2 + "px"

        // add color gradient
        for (let i = 0; i < 360; i++) {
            this._ctx.fillStyle = "hsl(" + i.toString() + ",100%,50%)"
            this._ctx.fillRect(i,0,1,height)
        }

        this.primary_hsl = new hsl(0)
        this.secondary_hsl = new hsl(180)

        this._primary_preview = document.createElement("div")
        this._primary_preview.style.height = height/2 + "px"
        this._primary_preview.style.width = height/2 + "px"
        this._primary_preview.style.backgroundColor = this.primary_hsl.as_string()


        this._secondary_preview = document.createElement("div")
        this._secondary_preview.style.height = height/2 + "px"
        this._secondary_preview.style.width = height/2 + "px"
        this._secondary_preview.style.backgroundColor = this.secondary_hsl.as_string()

        this._preview = document.createElement("span")

        this._preview.appendChild(this._primary_preview)
        this._preview.appendChild(this._secondary_preview)

        parent_elmt.appendChild(this._preview)
        parent_elmt.style.display = "inline"

        this.init_event_listeners()
    }

    init_event_listeners(){
        console.log("ColorPicker::init")
        this._canvas.addEventListener("mousedown",this.pick_color.bind(this))
    }

    pick_color(evt: MouseEvent){
        console.log("ColorPicker::pick_color",evt)

        if(evt.button == 0 ){ // set primary_hsl
            this.primary_hsl.set(evt.offsetX)
            this._primary_preview.style.backgroundColor = this.primary_hsl.as_string()
        } else if( evt.button == 2 ){
            this.secondary_hsl.set(evt.offsetX)
            this._secondary_preview.style.backgroundColor = this.secondary_hsl.as_string()
        }


    }

}

class hsl {
    public h: number
    public s: number
    public l: number

    constructor( h: number, s = 100, l = 50 ){
        this.set(h,s,l)
    }

    set( h: number, s = 100, l = 50 ){
        console.log(h)
        this.h = h % 360

        if ( s < 0 ) { 
            this.s = 0
        } else if (s > 100){ 
            this.s = 100
        } else{
            this.s = s
        }

        if ( l < 0 ) { 
            this.l = 0
        } else if (l > 100){ 
            this.l = 100
        } else{
            this.l = l
        }
    }

    as_string(){
        return "hsl("+this.h+", "+this.s+"%, "+this.l+"%)"
    }
}