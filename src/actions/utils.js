export const getUserDetails = () => {
    return JSON.parse(window.localStorage.getItem("user"));
}