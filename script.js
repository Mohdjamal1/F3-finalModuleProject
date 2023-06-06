const api_key = '5CyLIhfnFgWiwTQPIg6rM1BUDmoor1117BG5bbFMs';
const date = new Date().toISOString().slice(0, 10);
//for maximum date limit
document.getElementById('search-input').max = new Date().toISOString().split("T")[0];


//Function to fetch and display the image of the current date;
function getCurrentImageOfTheDay(){
    
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`;

    fetch(url)
    .then((response) => response.json())
    .then(data=>{
        // console.log(data.url);
        let image = document.getElementById('image');
        let title = document.getElementById('img-title');
        let para = document.getElementById('para');
        image.setAttribute('src',data.url);
        title.innerText = data.title;
        para.innerText = data.explanation;
        saveSearch(date);
        addSearchHistory(date);
    })
    .catch((error) => console.log(error));
}

// Function to fetch and display the image for the selected date
function getImageOfTheDay(selectedDate) {
    const url = `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${api_key}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Display data in the UI
            let h1 = document.querySelector('h1');
            let image = document.getElementById('image');
            let title = document.getElementById('img-title');
            let para = document.getElementById('para');
            h1.innerText = `Picture on ${selectedDate}`;
            image.setAttribute('src',data.url);
            title.innerText = data.title;
            para.innerText = data.explanation;
        // Save the date to local storage and add it to the search history
            saveSearch(selectedDate);
            addSearchHistory(selectedDate);
        })
        .catch((error) => console.log(error));
}

function getPreviousImage(selectedDate) {
    const url = `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${api_key}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Display data in the UI
            let h1 = document.querySelector('h1');
            let image = document.getElementById('image');
            let title = document.getElementById('img-title');
            let para = document.getElementById('para');
            h1.innerText = `Picture on ${selectedDate}`;
            image.setAttribute('src',data.url);
            title.innerText = data.title;
            para.innerText = data.explanation;
        })
        .catch((error) => console.log(error));
}

//Function add Search History into Dom.
function addSearchHistory(date) {
    const ul = document.getElementById('search-history');
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "javascript:void(0)";
    a.textContent = date;
    li.appendChild(a);
    ul.appendChild(li);
    a.addEventListener("click", function() {
        // Fetch and display the image for the clicked date
        getPreviousImage(date);
    });
}
//Save data into Local storage
function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
}

// Event listener for form submission
document.getElementById("search-btn").addEventListener("click", function nextSearch(event) {
    event.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    const currentDate = new Date().toISOString().split("T")[0];
    const limitDate = '1995-06-20';
    

    if (selectedDate > currentDate || selectedDate < limitDate) {
        // Display an error message or take appropriate action
        alert(`Invalid date selection. Please choose a date between (1995-06-20 to the ${currentDate}).`);
        return;
    }

    getImageOfTheDay(selectedDate);
});
//Display the image of the current date when the page loads
getCurrentImageOfTheDay();
