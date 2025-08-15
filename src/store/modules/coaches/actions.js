export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      id: userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      areas: payload.areas,
      description: payload.description,
      hourlyRate: payload.hourlyRate,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coachData),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to register coach."
      );
      throw error;
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context) {
    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_DATABASE_URL}/coaches.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch coaches."
      );
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }

    context.commit("setCoaches", coaches);
  },
};
