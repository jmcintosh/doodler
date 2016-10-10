import {Doodler} from "./doodler"
import {ColorPicker} from "./color_picker"

let color_picker = new ColorPicker('color-picker','color-picker-container', 360, 50)
let doodler = new Doodler('doodler-canvas',"doodler-container", 800, 600, color_picker)



// hook up event buttons
let clear_btn = document.getElementById("clear")
let save_btn = document.getElementById("save")
let load_btn = document.getElementById("load")

clear_btn.addEventListener("click", doodler.clear_canvas.bind(doodler))
save_btn.addEventListener("click", doodler.save_image.bind(doodler))
load_btn.addEventListener("click", doodler.load_image.bind(doodler))