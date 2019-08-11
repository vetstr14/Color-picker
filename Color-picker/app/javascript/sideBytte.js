
let icon = document.getElementsByClassName("icon-box");
for (let i of icon)
{
    i.addEventListener("click",() => {
        let getSide = i.getAttribute("side");
        byttSide(Number(getSide));
    });
}

/**
 * 
 * @param {number} x 
 */
function byttSide(x)
{
    let aktive = document.getElementById("aktive-site");
    aktive.style.left = 25 + (100 * x)+ "px";

    let container = document.getElementById("container");
    container.style.transform = `translateX(${-100 * x}vw)`;

    if (x == 1 && settings.gradientFadeIn)
        displayColorGradient();
}

let eksWebSideTall = 0;
let eksWebSiteSideBytteKnapp = document.getElementsByClassName("eksWebSite-sideBytteKnapp");
for (let i of eksWebSiteSideBytteKnapp)
{
    i.addEventListener("click",() => {
        let bSide = i.getAttribute("go");
        byttEksempelWebsite(bSide);
    });
}

/**
 * 
 * @param {string} x 
 */
function byttEksempelWebsite(x)
{
    let site = document.getElementById("eksWebsite-slidingContainer");

    if (x == "right") eksWebSideTall++;
    else if (x == "left") eksWebSideTall--;

    if (eksWebSideTall == 6)
        eksWebSideTall = 0;
    if (eksWebSideTall == -1)
        eksWebSideTall = 5;

    site.style.transform = `translateX(${800 * eksWebSideTall}px)`;

    let nr = document.getElementById("eksWeb-sideNr");
    nr.innerHTML = eksWebSideTall + 1;
}