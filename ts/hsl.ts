export class HSL {
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