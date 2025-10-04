import axiosClient from "./axiosClient";

export async function getProfileData(token) {
  const request = await axiosClient.get("/profile/view/", {
    headers: { Authorization: `Token ${token}` },
  });

  console.log(request.data);

  return request.data;
}
