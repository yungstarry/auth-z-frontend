import React, { useState, useEffect } from "react";
import "./profile.scss";
import Card from "../../components/card/Card";
import profileImg from "../../assets/avatarr.png";
import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  selectUser,
  updateUser,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import Notification from "../../components/notification/Notification";

// const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  } else {
    return text;
  }
};

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoggedIn, isError, isSuccess, isLoading, message, user } =
    useSelector((state) => state.auth);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo || "",
    bio: user?.bio || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImg, setProfileImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        photo: user.photo,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImg(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      if (
        profileImg !== null &&
        (profileImg.type === "image/jpeg" ||
          profileImg.type === "image/jpg" ||
          profileImg.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImg);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        //save img to cloudninary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/adordev/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url.toString();
      }
      //save profile to MongoDB
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImg ? imageURL : profile.photo,
      };
      dispatch(updateUser(userData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>{!profile.isVerified && <Notification />}
      <section>
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {isLoading && <Loader />}
              {!isLoading && user && (
                <>
                  <div>
                    <div className="profile-photo">
                      <div>
                        <img
                          src={
                            imagePreview === null ? user?.photo : imagePreview
                          }
                          alt=""
                        />
                        <h3>Role: {profile?.role}</h3>
                      </div>
                    </div>
                    <form onSubmit={saveProfile}>
                      <p>
                        <label>Change Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          name="photo"
                          onChange={handleImageChange}
                        />
                      </p>
                      <p>
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={profile?.name}
                          onChange={handleInputChange}
                        />
                      </p>
                      <p>
                        <label>Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={profile?.email}
                          onChange={handleInputChange}
                          disabled
                        />
                      </p>
                      <p>
                        <label>Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={profile?.phone}
                          onChange={handleInputChange}
                        />
                      </p>
                      <p>
                        <label>Bio</label>
                        <textarea
                          name="bio"
                          id=""
                          cols="30"
                          rows="10"
                          value={profile?.bio}
                          onChange={handleInputChange}
                        ></textarea>
                      </p>
                      <button className="--btn --btn-block --btn-primary">
                        Update Profile
                      </button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const user = useSelector(selectUser);

  const username = user?.name || "...";

  return <p className="--color-white">Hi, {shortenText(username, 11)} |</p>;
};

export default Profile;
