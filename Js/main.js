function getData(url, callback, error) {
  let req = new XMLHttpRequest();
  req.open("GET", url);
  req.responseType = "json";
  req.send();
  req.onload = function () {
    if (req.status >= 200 && req.status < 300) {
      callback(this.response);
    } else {
      error("error");
    }
  };
}

function getFilterData(id, el) {
  getData(
    "https://jsonplaceholder.typicode.com/posts?userId=" + id,
    (posts) => {
      document.getElementById("posts").innerHTML = "";
      for (let post of posts) {
        document.getElementById("posts").innerHTML += `
      <div id="post">
        <h3>${post.title}</h3>
        <h4>${post.body}</h4>
      </div>
      `;
      }
    },
    (error) => alert(error)
  );
  if (el) {
    let elements = document.getElementsByClassName("selected");
    for (let element of elements) {
      element.classList.remove("selected");
    }
    el.classList.add("selected");
  }
}

// Get All Users
getData(
  "https://jsonplaceholder.typicode.com/users",
  (users) => {
    document.getElementById("users").innerHTML = "";
    for (let user of users) {
      document.getElementById("users").innerHTML += `
      <div id="user" onclick="getFilterData(${user.id}, this)">
        <h3 id='username'>${user.name}</h3>
        <h3 id='email'>${user.email}</h3>
      </div>
      `;
      if ((user.id = 1)) {
        document.getElementById("user").classList.add("selected");
      }
    }
  },
  (error) => alert(error)
);

// Default: Get Posts To First User
getFilterData(1);
