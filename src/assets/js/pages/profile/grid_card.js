const gridContainer = document.querySelector("#grid-container");

const developers = [1,2,3,4,5,6,7,8,9,10];

function createCard(){

    return `
        <div class="card">
            <div class="img">
                
            </div>
            <div class="body">
                <h2 class="name">Pierre MAPANGOU</h2>
                <h4 class="title">Frontend developpeur</h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, iure.
                </p>
                <button class="btn">
                    voir le profile  <i class="fa-solid fa-arrow-right-long"></i>
                </button>
            </div>
        </div>

    `
}


gridContainer.innerHTML = developers.map(createCard).join('');