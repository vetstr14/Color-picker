/**
 * 
 * @param {number} rgb 
 */
function rgbToHex(rgb)
{
    let roundRgb = Math.round(rgb);
    let hex = Number(roundRgb).toString(16);
    if (hex < 2)
        hex = "0" + hex;

    return hex;
}

/**
 * 
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 */
function convertToHex(r,g,b)
{
    let red = rgbToHex(r)
    let green = rgbToHex(g);
    let blue = rgbToHex(b);

    return red + green + blue;
}
/**
 * 
 * @param {string} rgb 
 */
function devideAndconvertToHex(rgb)
{
    let indRgb = getIndColorsRGB(rgb);
    
    let r = indRgb[0];
    let g = indRgb[1];
    let b = indRgb[2];

    let hex = convertToHex(r,g,b);

    return hex;
}

/**
 * 
 * @param {string} rgb 
 */
function getIndColorsRGB(rgb)
{
    let rgbString = rgb;
    let deviders = [];

    for (let i = 0; i < rgbString.length; i++)
    {
        if (rgbString[i] == ",")
            deviders.push(i);
    }
    
    let r = Math.round(Number(rgbString.substring(4,deviders[0])));
    let g = Math.round(Number(rgbString.substring(deviders[0] + 1,deviders[1])));
    let b = Math.round(Number(rgbString.substring(deviders[1] + 1,rgbString.length - 1)));
    
    return [r,g,b];
}

/**
 * 
 * @param {string} rgb 
 */
function creLightColor(rgb)
{
    let ind = getIndColorsRGB(rgb);
    let r = ind[0];
    let g = ind[1];
    let b = ind[2];

    if (r + 90 <= 255) r += 90;
    else r = 255;

    if (g + 90 <= 255) g += 90;
    else g = 255;

    if (b + 90 <= 255) b += 90;
    else b = 255;

    return `rgb(${r},${g},${b})`;
}
/**
 * 
 * @param {string} rgb 
 */
function creDarkColor(rgb)
{
    let ind = getIndColorsRGB(rgb);
    let r = ind[0];
    let g = ind[1];
    let b = ind[2];

    r = Math.round(r - (8.5 * 7));
    g = Math.round(g - (8.5 * 7));
    b = Math.round(b - (8.5 * 7));

    if (r < 0)
        r = 0;
    if (g < 0)
        g = 0;
    if (b < 0)
        b = 0;

    return `rgb(${r},${g},${b})`;
}
