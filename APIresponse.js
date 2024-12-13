//APIresponse.js

// Parameters required for API
let Token = "";
let Url = "";
let UserId = 0;
let ApiKey = "";

export function initializeApiParameters(token, url, userId, apiKey) {
  Token = token;
  Url = url;
  UserId = userId;
  ApiKey = apiKey;

  console.log(`Token =${Token}
    Url = ${Url}
    UserId = ${UserId}
    ApiKey = ${ApiKey}`);
}

export const getAPIResponse = async function getData() {
  console.log("getData");

  //Send the required token
  const token = Token;

  const url = Url;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Userid: UserId,
        Apikey: ApiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
};
