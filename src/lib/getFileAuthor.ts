export function getFileAuthor() {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");
    const { username } = userInfo ? JSON.parse(userInfo) : { username: "" };

    return `${username}`;
  }
  return "";
}
