var root = document.querySelector(':root');

let nextButton = document.getElementById("nextButton")
let banner = document.getElementsByClassName("banner")[0]
let socials = document.getElementsByClassName("socials")[0]
let attractionName = document.getElementsByClassName("name")[0]
let description = document.getElementsByClassName("description")[0]

const instagramSrc = (url) => `<a class="fa fa-brands fa-instagram" href="${url}"></a>`
const twitterSrc = (url) => `<a class="fa fa-brands fa-twitter" href="${url}"></a>`

const circle = `<span class="material-symbols-outlined">
refresh
</span>`

const findAttraction = async () => {
    const attraction = await fetch("/api/randomAttraction").then((response) => response.json())
    return attraction
}

const changeContents = (attraction) => {
    banner.src = attraction.image
    attractionName.innerHTML = attraction.title
    description.innerHTML = attraction.description
    socials.innerHTML = Object.entries(attraction.socials).map(([social, url]) => {
        switch(social) {
            case "twitter": return twitterSrc(url)
            case "instagram": return instagramSrc(url)
        }
    }).join("")
}

let theme = "light"
const changeColors = async (image) => {
    const colors = await materialDynamicColors(image)
    console.log(image, colors)
    Object.entries(colors[theme]).forEach(([name, color]) => {
        root.style.setProperty(`--${name}`, color)
    })
}

const nextAttraction = async () => {
    const attraction = await findAttraction()
    changeContents(attraction)
    await changeColors(attraction.image)
}

nextButton.addEventListener("click", async () => {
    const oldInner = nextButton.innerHTML
    nextButton.innerHTML = circle
    await nextAttraction()
    nextButton.innerHTML = oldInner
})

nextAttraction()