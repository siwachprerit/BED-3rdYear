//function to get comment data

console.log(axios);
async function getComment(URL) {
    //how to send a GET request using axios

    // axios.get(URL)
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });

    //convert to async await
    try {
        let comments = await axios.get(URL);
        console.log(comments);
    } catch (err) {
        console.error(err);
    }

}

getComment('https://jsonplaceholder.typicode.com/comments');

//function to add a new blog
addBlog('http://localhost:3300/blog', 'My First Blog', 'This is the description of my first blog');
async function addBlog(URL, title, description) {
    try{
        let newBlog = {
        title: title,
        description: description
    };
    let response = await axios.post(URL, newBlog)
    console.log(response.data);
    }
    catch (err) {
        console.log(err);
    }
}