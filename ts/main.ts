import {Doodler} from "./doodler"
import {ColorPicker} from "./color_picker"

let color_picker = new ColorPicker('color-picker','color-picker-container', 360, 50)
let background = new Doodler('background',"doodler-container", 800, 600, null)
let foreground = new Doodler('foreground',"doodler-container", 800, 600, color_picker)

let socket = io('http://localhost:5150')

// event emitters
foreground.add_draw_end_callback(function(){
    let img = foreground.save_image()
    socket.emit('image/to_server',img)
    foreground.clear_canvas()
    background.load_image(img)
})


// event listeners
socket.on('image/from_server', function (img) {
    console.debug('image/from_server')
    background.load_image(img)
})