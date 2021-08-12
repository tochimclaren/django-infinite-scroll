console.log("it's alive!")


content = document.querySelector("#content");
let page = 1

window.onscroll = function() {
    url = `/?page=${page}`
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        fetch(url).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            console.dir(data)
            page += 1
            content.innerHTML += data.map(
            	obj=>`<div>
            	<h1>${obj.title}</h1> 
            	<p>${obj.content}</p> 
            	</div>`
            	).join("\n")
        }).catch(err => {

        })
    }
}