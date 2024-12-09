//response.js

export const getAPIResponse = async function getData() {
  //Send the required token
  const token = "22aa99d8c8aba6fd3866766f33b6d8146e3892ec";

  // Send the required API Parameters
  const requestData = {
    userIdentifier: "abc123",
    promoId: 613,
    fixtureId: 14486,
  };

  const url = `https://mp-staging.co.uk/master/api/rewards/api/rewards/${requestData.userIdentifier}/${requestData.promoId}/${requestData.fixtureId}/${token}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Userid: 1,
        Apikey: "EUvvT*7_9J!VS4-99mE%$K6x$Qk",
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
