

function colorPickerStartUp() 
{
    let setActive = true;

    let cConst = 15;
    let red = 255;
    let green = 0;
    let blue = 0;
    let aktiveColor = "green";

    let colorPicker = document.getElementById("colorPicker");
    let color = new creColorPixel(colorPicker);

    while (red < 256)
    {
        let printColorRGB = `rgb(${red},${green},${blue})`;
        let printColorHex = convertToHex(red,green,blue);

        let newCol = color.creColom();
        let p = color.pixel(printColorRGB,printColorHex,newCol);
        p.addEventListener("click", () => {
            velgFarge(p);
        });

        for (let i = 2.5; i < 256; i += 2.5)
        {
            let nRed = red + i;
            let nGreen = green + i;
            let nBlue = blue + i;

            if (nRed > 255)
                nRed = 255;
            if (nGreen > 255)
                nGreen = 255;
            if (nBlue > 255)
                nBlue = 255;

            printColorRGB = `rgb(${nRed},${nGreen},${nBlue})`;
            printColorHex = convertToHex(nRed,nGreen,nBlue);
            let newP = color.pixel(printColorRGB,printColorHex,newCol);
            newP.addEventListener("click", () => {
                velgFarge(newP);
            });

            if (setActive && printColorHex == "ffffff")
            {
                newP.classList.add("colorPicked");
                setActive = false;
            }
        }

        if (aktiveColor == "green")
        {
            if (green == 255)
                red -= cConst;
            else
                green += cConst;

            if (red == 0)
                aktiveColor = "blue";
        }
        else if (aktiveColor == "blue")
        {
            if (blue == 255)
                green -= cConst;
            else
                blue += cConst;
                
            if (green == 0)
                aktiveColor = "red";
        }
        else if (aktiveColor == "red")
        {
            if (red == 255)
                blue -= cConst;
            else
                red += cConst;

            if (blue == 0)
                red++;
        }
    }
}

class creColorPixel
{
    /**
     * 
     * @param {HTMLElement} parent 
     */
    constructor(parent)
    {
        this.parent = parent;
    }
    /**
     * 
     * @param {string} colorRGB
     * @param {HTMLDivElement} col
     */
    pixel(colorRGB,colorHex,col)
    {
        let p = document.createElement("div");
        p.className = "pixel";
        p.style.background = colorRGB;
        p.setAttribute("RGB",colorRGB);
        p.setAttribute("Hex",colorHex)

        col.appendChild(p);

        return p;
    }
    creColom()
    {
        let col = document.createElement("div");
        col.className = "pixelColom";
        this.parent.appendChild(col);

        return col;
    }
}

/**
 * 
 * @param {string} cRgb
 * @param {string} val
 */
function gradientPicker(cRgb,val)
{
    let gradient = document.getElementById("gradient-picker");
    gradient.innerHTML = "";

    let rgb = getIndColorsRGB(cRgb);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    
    let i = 0;
    let delay = 0;
    while (i < 256)
    {
        let nR = Math.round(r - i);
        let nG = Math.round(g - i);
        let nB = Math.round(b - i);

        if (nR < 0)
            nR = 0;
        if (nG < 0)
            nG = 0;
        if (nB < 0)
            nB = 0;
        
        let newRgb = `rgb(${nR},${nG},${nB})`;
        let newHex = convertToHex(nR,nG,nB);
        let gP = creGradientPixel(newHex,newRgb);
        gP.style.animation = `fadeInPixels .5s ${delay}s`; 
        gP.style.animationFillMode = "forwards";
        gP.addEventListener("click", () => {
            velgFargeGradering(gP);
        });

        let nV = getIndColorsRGB(val);
        let newVal = `rgb(${nV[0]},${nV[1]},${nV[2]})`;
        if (newVal == newRgb)
            gP.classList.add("activFarge");
        
        gradient.appendChild(gP);

        delay += 0.01;
        i += 8.5;
    }
}
/**
 * 
 * @param {string} fargeHex
 * @param {string} fargeRgb
 */
function creGradientPixel(fargeHex,fargeRgb)
{
    let p = document.createElement("div");
    p.classList.add("gradient-pixel");
    p.style.background = fargeRgb;

    p.setAttribute("Hex",fargeHex);
    p.setAttribute("RGB",fargeRgb);

    return p;
}