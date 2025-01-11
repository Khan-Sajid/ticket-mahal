const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const path = {
  allCategories: "/api/v1/web/categories",
  allCities: "/api/v1/web/cities",
};

export async function getAllCategories() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Language", "en");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${path.allCategories}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}

export async function getAllCities() {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${path.allCities}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error("error", error);
      return error;
    });
}
