const api_url = "https://api.quotable.io/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const Author = document.getElementById("Author");
async function getQuote(url) {
    if (Author.value === "") {
        const response = await fetch(url);
        var data = await response.json();
        console.log(data)
        quote.innerHTML = data.content;
        author.innerHTML = data.author;
    }
    else {
        console.log("Author", Author.value);
        const authorUrl = `https://api.quotable.io/quotes?author=${Author.value}`;
        await fetch(authorUrl).then((res) => {
            res.json().then((data) => {
                let size = data.results.length;
                if (size == 0) {
                    quote.innerHTML = "No quotes found for the entered author.!!!!";
                    quote.style.color = "orange";
                } else {
                    let index = Math.floor(Math.random() * size);
                    console.log(index);
                    quote.innerHTML = data.results[index].content;
                    author.innerHTML = data.results[index].author;
                }
            })
        })
    }
    Author.value = "";
}

getQuote(api_url);
function shareQuote() {
    window.open("https://twitter.com/intent/tweet?text=" +
        quote.innerHTML + "---- by " + author.innerHTML, "Tweet Window",
        "width=600,height=300")
}