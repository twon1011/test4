let createButton;
let mainContainer;
let cardsContainer;
let renderedMovie = [];



let progressMessage = document.createElement("p");
document.addEventListener("DOMContentLoaded", () => {
    createButton = document.getElementById("createButton");
    mainContainer = document.getElementById("mainContainer");
    cardContainer = document.getElementById("cardContainer");
    progressMessage.classList = "text-center progress-message";
    document.body.appendChild(progressMessage);
        
    progress(false);
        
    getPeople();
});



let peopleCollection;
let retries = 0;


function progress(show,message = "working. . .") {
    if (!show) {
        progressMessage.style.display = "none";
        progressMessage.innerText = "";
    } else {
        progressMessage.style.display = "block";
        progressMessage.innerText = message;
    }
}

function getPeople() {
    progress(true)

    api
        .all()
        .then((people) => {
            peopleCollection = people;
            createButton.addEventListener("click", createPerson);
            progress(true,"ready");
        })
        .catch((err) => {
            if (retries < 1) {
                retries++;
                getPeople() ; 
                    return;
            }
            let tick = 5;

            setInterval;(() => {
                progress(
                    true,
                    "something went wrong"
                );
            }, 1000);

            setTimeout(() => {
                location.reload(true);
            }, 5000);
        }); 
}
    
function createPerson() {
    if (renderedMovie.length === 0) {
        progress (false);
    }

    let rand = Math.floor(Math.random() * peopleCollection.length);
    let movie = peopleCollection[rand];

    let movieID = movie.title;
    

    let found = renderedMovie.find((movie) => {
        return movie.title === movieID;
    });
    

    if (found !== undefined) {
        createPerson();
        return;
    }



    renderedMovie.push(new Movie(movie));
}

  function removeCard() {

}
       
class Movie {
    constructor({ title, poster, director }) {
        this.title = title;
        this.poster = poster;
        this.director = director;
        var person = document.getElementById("person");
        this.render();
         mainContainer.addEventListener("click", () => {

            peopleCollection.push({

                title: this.title,
                poster: this.poster,
                director: this.director,
            })    

            let removeCard = this.ParentNode.
            peopleCollection.splice(removeCard,1)
        })        

}


    render() {
        let template = `
        <div class="card person-card" id="mainContainer" style="width: 18rem;">
  <div class="card-body">
  <img class="card-img-top" src="${this.poster}" alt="Card image cap">
  <p>${this.director}</p>
  <h1 class="card-text">Title: ${this.title}</h1>
  </div>
</div>`;




        cardContainer.innerHTML+= template;

        
    }
}
    