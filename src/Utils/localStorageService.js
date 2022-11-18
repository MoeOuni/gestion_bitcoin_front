const localStorageService = function () {
  const _setToken = (accessToken) => {
    localStorage.setItem("access_token", accessToken);
  };

  const _getToken = (accessToken) => {
    return localStorage.getItem("access_token");
  };

  return {
    getToken: _getToken,
    setToken: _setToken,
  };
};

export default localStorageService;
