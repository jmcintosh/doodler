import {HSL} from "./hsl"

export interface iColorSource {
    get_primary_hsl(): HSL
    get_secondary_hsl(): HSL

}