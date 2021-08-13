const postForm = document.querySelector("#PostCreateForm");


function handleSubmit(postForm) {
    postForm.addEventListener("submit", e => {
        e.preventDefault();
        formData = new FormData(postForm);
        fetch('/create/', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                postForm.reset();
                // const alertInfo = "alert-info";
                // const alertInfo = "alert-danger";
                // console.log(data)
                document.querySelector("#notify").innerHTML = `<div class="alert alert-info alert-dismissible fade show" role="alert">
                                                                  <strong>Success!</strong> ${data.title} <strong>saved</strong>.
                                                                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div> `
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        console.log("form submission halted!")
    })
}

handleSubmit(postForm)