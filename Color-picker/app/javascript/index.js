let settings = {
    primary: [""],
    secundary: [""],
    gradientFadeIn: false
};



let input = document.getElementById("color-input");
input.addEventListener("input",() => {
    let pix = document.getElementsByClassName("pixel");
    let rgb = "";
    let hex = "";

    for (let p of pix)
    {
        hex = p.getAttribute("Hex");
        if (hex == input.value)
        {
            rgb = p.getAttribute("RGB");

            let oldActive = document.querySelector(".colorPicked");
            oldActive.classList.remove("colorPicked");
            p.classList.add("colorPicked");

            gradientPicker(rgb,rgb);

            break;
        }
    }

    setColorBox(rgb,hex);
});

/**
 * 
 * @param {HTMLDivElement} elm
 */
function velgFarge(elm)
{
    let oldActive = document.querySelector(".colorPicked");
    oldActive.classList.remove("colorPicked");
    elm.classList.add("colorPicked");

    let hex = elm.getAttribute("Hex");
    let rgb = elm.getAttribute("RGB");

    let inp = document.getElementById("color-input");
    inp.value = hex;

    settings.gradientFadeIn = true;

    setColorBox(rgb,hex);
    gradientPicker(rgb,rgb);
}
/**
 * 
 * @param {HTMLDivElement} elm 
 */
function velgFargeGradering(elm)
{
    let oldActive = document.querySelector(".activFarge");
    oldActive.classList.remove("activFarge");
    elm.classList.add("activFarge");

    let hex = elm.getAttribute("Hex");
    let rgb = elm.getAttribute("RGB");

    let inp = document.getElementById("color-input");
    inp.value = hex;

    settings.gradientFadeIn = true;

    setColorBox(rgb,hex);
}
/**
 * 
 * @param {string} color 
 * @param {string} hex 
 */
function setColorBox(color,hex)
{
    let colorBox = document.querySelector(".active-color-valg_box");
    colorBox.style.background = color;

    let indColor = getIndColorsRGB(color);
    let r = Math.round(indColor[0]);
    let g = Math.round(indColor[1]);
    let b = Math.round(indColor[2]);

    let nColor = `rgb(${r},${g},${b})`;

    if (colorBox.id == "primary")
        settings.primary[0] = nColor;
    else
        settings.secundary[0] = nColor;

    let notActive = document.querySelector(".notActive-color-valg_box");
    if (notActive)
    {
        notActive.classList.remove("notActive-color-valg_box");
        let colorValgBox = document.getElementsByClassName("color-valg_boxer");

        for (let b of colorValgBox)
        {
            b.addEventListener("click",() => {
                document.querySelector(".active-color-valg_box").classList.remove("active-color-valg_box");
                b.classList.add("active-color-valg_box");
            });
        }

        settings.gradientFadeIn = true;
    }

    let disp = colorBox.querySelector(".color-disp");
    disp.innerHTML = "#" + hex;
}

function displayColorGradient() 
{
    let gradientDisplay = document.getElementsByClassName("gradient-display");
    
    if (settings.primary[0] != "")
    {
        gradientDisplay[0].innerHTML = "";

        let val = ["Primary","P-Light","P-Dark"];
        settings.primary[1] = creLightColor(settings.primary[0]);
        settings.primary[2] = creDarkColor(settings.primary[0]);
 
        for (let v = 0; v < 3; v++)
        {
            let hex = devideAndconvertToHex(settings.primary[v]);
            let box = creGradientBoxer(settings.primary[v],hex,val[v],v);

            gradientDisplay[0].appendChild(box);
        }
    }

    if (settings.secundary[0] != "")
    {
        gradientDisplay[1].innerHTML = "";

        let val = ["Secundary","S-Light","P-Dark"];
        settings.secundary[1] = creLightColor(settings.secundary[0]);
        settings.secundary[2] = creDarkColor(settings.secundary[0]);
 
        for (let v = 0; v < 3; v++)
        {
            let hex = devideAndconvertToHex(settings.secundary[v]);
            let box = creGradientBoxer(settings.secundary[v],hex,val[v],v);

            gradientDisplay[1].appendChild(box);
        }
    }

    settings.gradientFadeIn = false;
}

/**
 * 
 * @param {string} rgb 
 * @param {string} hex 
 * @param {string} text
 * @param {number} v
 */
function creGradientBoxer(rgb,hex,text,v) 
{
    let b = document.createElement("div");
    b.style.background = rgb;
    b.className = "gradient-display_box";
    b.style.animation = `fadeInGradientBox ${0.5 + (0.4 * v)}s .6s`;
    b.style.animationFillMode = "forwards";

    let h1 = document.createElement("h1");
    h1.innerHTML = text;

    let p = document.createElement("p");
    p.innerHTML = "#" + hex;

    b.appendChild(h1);
    b.appendChild(p);

    return b;
}