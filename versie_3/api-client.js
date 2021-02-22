let baseUrl = "http://localhost:3000";

// ----------------------------------------------------------------------------
async function getTodoList() {
  try {

    const response = await fetch(baseUrl, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {

      let result = await response.json();
      return result;
    } else {

        console.log(`Er is een fout opgetreden: ${error}`);
    }

  } catch (err) {
      console.log(err);
  }
}

// ----------------------------------------------------------------------------
async function putOnTodoList(todoItem) {
  try {
  
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(todoItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await response.json();
    return result;

  } catch (err) {
      console.log(err);
  }

};

// ----------------------------------------------------------------------------
async function deleteFromTodoList(itemId) {
  try {
    const deleteUrl = baseUrl + "/" + itemId;
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
      console.log(err);
  }
};

// ----------------------------------------------------------------------------
async function updateAsDone(todoItemId) {
  try {
    const updateUrl = baseUrl + "/" + todoItemId;
    const bodyData = { done: true };
    const response = await fetch(updateUrl, {
      method: "PUT",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
      console.log(err);
  }
}



// post:
//  {
//         "description": "cursus 2 afmaken",
//         "done": false
     
//     }
// Header: "Content-Type": "application/json", method: "POST"


// async function getJoke() {
//   try {
    
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: { "Accept": "application/json" },
//     });

//     if (response.ok) {

//       let result = await response.json();
//       return result;

//     }
//   } catch(err) {
//       console.log(err);
//   }
// }

// let apiUrl = "https://api.themoviedb.org/3/genre/movie/list";
// let API_KEY = "24aeec0dd801e7429403450d657860b2";

// async function getData() {
//   try {
//     apiUrl = apiUrl + "?api_key=" + API_KEY;

//     const result = await fetch(apiUrl);
//     console.log("Response received");
//     // console.log('wat is result: ' + typeof(result)) // object

//     const resultJson = await result.json();
//     console.log("Result to JSON");
//     // console.log("wat is resultJson: " + typeof resultJson); // object
//     return resultJson;
//   } catch (err) {
//     console.log(err);
//   }
// }
