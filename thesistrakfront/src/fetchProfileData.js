import axios from "axios";

export const fetchProfileData = async ({
  API_BASE_URL,
  LocalData,
  setisloading,
  setisActive,
  setUserid,
  setProfile,
  setname,
  setRole,
  setisLogged,
  setUserType,
  setEmail,
  setProfilePic,
  fetchCarrers,
}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/accounts/`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      LocalData(response.data);
      setisloading(false);
      setisActive(true);
      setUserid(response.data.ID);
      setProfile(response.data);
      setname(response.data.username);
      setRole(response.data.Role);
      setisLogged(true);
      setUserType(response.data.UserType);
      setEmail(response.data.email);
      fetchCarrers();

      let profilePicUrl = response.data.profile_picture;
      if (profilePicUrl) {
        const url = new URL(
          profilePicUrl.startsWith("http") ? profilePicUrl : "http://" + profilePicUrl
        );
        if (!url.port) url.port = "8000";
        profilePicUrl = url.href;
      }
      setProfilePic(profilePicUrl);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    setisLogged(false);
  } finally {
    setisloading(false);
  }
};
