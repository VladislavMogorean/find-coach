let timer;

export default {
  async login(context, payload) {
    context.dispatch("auth", { ...payload, mode: "login" });
  },
  async signup(context, payload) {
    context.dispatch("auth", { ...payload, mode: "signup" });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = "";
    if (mode === "login") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Failed to authenticate.");
      throw error;
    }

    const expiresIn = +data.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: data.idToken,
      userId: data.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
        tokenExpiration,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("didAutoLogout");
  },
};
