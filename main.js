function makeBlock(repoTitle, repo, repoDate, repoAbout, lang, stars, url){
    let mainDiv = document.createElement("div")
    mainDiv.classList = 'flex flex-row flex-wrap px-3 mb-1'

    let childDiv1 = document.createElement("div")
    childDiv1.classList = 'flex bg-white rounded-lg px-4 py-4 w-[100%] flex-row-reverse justify-end items-center shadow-lg shadow-borders-900 sm:justify-between'
    mainDiv.appendChild(childDiv1)

    let photo = document.createElement("img")
    photo.classList = "hidden sm:block rounded-full w-20"
    photo.src = url
    childDiv1.appendChild(photo)

    let childDiv2 = document.createElement("div")
    childDiv2.classList = 'flex flex-col items-start'
    childDiv1.appendChild(childDiv2)

    let title = document.createElement("h1")
    title.classList = 'link text-lg text-borders mb-3 max-w-md'
    let urlInTitle = document.createElement("a")
    urlInTitle.href = repo
    urlInTitle.appendChild(document.createTextNode(repoTitle))
    title.appendChild(urlInTitle)
    childDiv2.appendChild(title)

    let date = document.createElement("h2")
    date.classList = 'tracking-widest mb-1 text-xs max-w-md text-superLightBlue'
    date.appendChild(document.createTextNode(repoDate))
    childDiv2.appendChild(date)

    let about = document.createElement("p")
    about.classList = 'leading-relaxed text-sm max-w-md mb-2'
    about.appendChild(document.createTextNode(repoAbout))
    childDiv2.appendChild(about)

    let childDiv3 = document.createElement("div")
    childDiv3.classList = 'flex items-center'
    childDiv2.appendChild(childDiv3)

    let repoLang = document.createElement("p")
    repoLang.classList = 'mr-2'
    repoLang.appendChild(document.createTextNode(lang))
    childDiv3.appendChild(repoLang)

    let starLogo = document.querySelector("#star")
    let starLogoClone = starLogo.cloneNode(true)
    starLogoClone.classList.remove("hidden")
    childDiv3.appendChild(starLogoClone)

    let starsCount = document.createElement("p")
    starsCount.classList = 'px-[3px]'
    starsCount.appendChild(document.createTextNode(stars))
    childDiv3.appendChild(starsCount)

    document.querySelector(".container").appendChild(mainDiv)
}

function userRepo(user){
    fetch(`https://api.github.com/users/${user}/repos`)
        .then((result) => {
            if (result.status == 200) {return result.json();}
            else{
                let notFound = document.querySelector("#error")
                notFound.classList.remove("hidden")
                return false
            }
        }).then((data) => {
            if (data){
                for(let i=0; i<data.length ; i++){
                    makeBlock(data[i]['full_name'], data[i]['html_url'], `Built by . ${data[i]['owner']['login']} . ${data[i]['created_at']}`, data[i]['description'], data[i]['language'], data[i]['stargazers_count'], data[i]['owner']['avatar_url'])
                }
            }
        }).catch((reson) => {
            console.log(reson)
        }).finally(console.log("sent"))
}

const queryString = (window.location.search).split("=")[1]
if (!(queryString)){userRepo('01270')}
else{userRepo(queryString)}


let search = document.querySelector("#search")
search.addEventListener("click", function(){
    let user = document.querySelector("#user").value
    location.replace(`?u=${user}`)})

let phoneBtn = document.querySelector("#phone-click")
phoneBtn.addEventListener("click", function(){
    let phoneDrop = document.querySelector("#phone-drop")
    if(phoneDrop.classList.contains('hidden')){
        phoneDrop.classList.remove("hidden")
    }else{
        phoneDrop.classList.add("hidden")
    }})
