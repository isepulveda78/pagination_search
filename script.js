// DOM Elements
const list = document.querySelector('.list')
const currPage = document.querySelector('#current-page')
const totalPages = document.querySelector('#total-pages')
const buttonPrev = document.querySelector('#prev-page')
const buttonNext = document.querySelector('#next-page')

buttonPrev.classList.add('is-invisible')

async function itemsList(){
    //await response of the fetch call
    const response = await fetch('tracktechtools.json')
    const data = await response.json()

    // Only proceed once it's resolved
    //only process once second promise is rved
    return data
}

try {
    itemsList().then(res => {
 
        let currentPage = 1
        let currentIndex = 0
        const itemsPerPage = 12
        let items = res
        
        const numPages = Math.ceil(items.length / itemsPerPage)
    
        const createListItem = (data) => 
        `
                        <div class="column is-2">
                        <div class="card" >
                        <div class="card-image">
                        <figure class="image">
                            <img src="${data.Logo}" alt="${data.Tool_Name}" style="padding: 25px; margin: 25px auto; ">
                        </figure>
                        </div>
                        <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                            <p class="title is-5">${data.Tool_Name}</p>
                            
                            </div>
                        </div>
                    
                        <div class="content">
                            <p class="subtitle is-7 mt-2 is-uppercase"><b>Brief Description</b></p>
                            <span class="mt-1">
                            ${data.Description}
                            </span>
                        </div>
    
                        <div class="content">
                            <p class="subtitle is-7 mt-2 is-uppercase"><b>Link to tool</b></p>
                            <span class="mt-1">
                           <a href="${data.Link_to_Tool}" target="_blank"> ${data.Link_to_Tool}</a>
                            </span>
                        </div>
    
                        <div class="content">
                            <p class="subtitle is-7 mt-2 is-uppercase"><b>Grade Level</b></p>
                            <span class="mt-1">
                                ${data.Grade === '' ? '' : '<span class="tag is-link is-light">' + data.Grade + '</span>'}
                            </span>
                        </div>
                        </div>
                    </div>
                    </div>`
    
        const nextPage = () => {
            if (currentPage === numPages) return
    
            currentPage++
            currentIndex = (currentPage - 1) * itemsPerPage
            let newIndex = currentIndex + itemsPerPage
            
            list.innerHTML = items
                .slice(currentIndex, newIndex)
                .map((item) => createListItem(item))
                .join('')
            currPage.innerHTML = currentPage

            if(currentPage > 1){
                buttonPrev.classList.remove('is-invisible')
            }
            if(currentPage === numPages){
                buttonNext.classList.add('is-invisible')
            }
        }
    
        const prevPage = () => {
            if (currentPage === 1) return 
    
            currentPage--
            currentIndex = (currentPage - 1) * itemsPerPage
            let newIndex = currentIndex + itemsPerPage
            
            list.innerHTML = items
            .slice(currentIndex, newIndex)
            .map((item) => createListItem(item))
            .join('')
            currPage.innerHTML = currentPage

            if(currentPage < 2){
                buttonPrev.classList.add('is-invisible')
            }
            if(currentPage < numPages){
                buttonNext.classList.remove('is-invisible')
            }
        }

        const init = () => {
            currPage.innerHTML = currentPage
            totalPages.innerHTML = numPages
    
            list.innerHTML = items
                .slice(0, itemsPerPage)
                .map((item) => createListItem(item))
                .join('')
           
        }
            buttonPrev.addEventListener('click', prevPage)
            buttonNext.addEventListener('click', nextPage)
    
        init()
    
        // lets filters it
        // lets filters it
        const input = document.getElementById("search")
    
        const filterItems = () => {
        
        filtered_items = _.filter(items, (listItem) => {
            return listItem.Tool_Name.toLowerCase().match(input.value.toLowerCase()) 
                || listItem.Grade.toLowerCase().match(input.value.toLowerCase())
        });
        list.innerHTML = filtered_items
            .slice(0, itemsPerPage)
            .map((item) => createListItem(item))
            .join('')
        };
        input.addEventListener("keyup", filterItems);
    })
} catch (error) {
    alert('Oops. Something went wrong!')
}
