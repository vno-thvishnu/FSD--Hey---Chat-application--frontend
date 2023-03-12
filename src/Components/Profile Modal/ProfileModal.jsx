import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { removeImage, UpdateUser } from "../../api/ChatRequest";
import { UserContext } from "../../UseContext";

function ProfileModal({ modalOpen, setModalOpen, loginUser }) {
  const aRefone = useRef(null);
  const aReftwo = useRef(null);

  const { setLoginUser } = useContext(UserContext);

  useEffect(() => {
    setProfileImage(null);
    setCoverImage(null);
  }, [modalOpen]);
  useEffect(() => {
    setFormData(loginUser);
  }, [loginUser]);

  const theme = useMantineTheme();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formData, setFormData] = useState(loginUser);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);

      event.target.name === "profileImage"
        ? setProfileImagePreview(URL.createObjectURL(img))
        : setCoverImagePreview(URL.createObjectURL(img));
    }
  };

  const preset_key = "hswixg5v";
  const cloud_name = "dor3vskgy";

  const handleSubmit = async (event) => {
    setButtonLoading(true);
    event.preventDefault();
    let UserData = formData;

    if (profileImage) {
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("upload_preset", preset_key);

      try {
        if (UserData.profileImage !== "") {
          const userId = UserData._id;
          const sendData = {
            profileImage_publicId: UserData.profileImage_publicId,
          };

          const remove = await removeImage(userId, sendData);
        }

        const server = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );

        const updatedata = {
          currentUserId: UserData._id,
          profileImage: server.data.secure_url,
          profileImage_publicId: server.data.public_id,
        };
        const update = await UpdateUser(UserData._id, updatedata);
        aRefone.current.value = null;
        setProfileImage(null);

        setLoginUser(update.data.otherDetails);
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const formData = new FormData();
      formData.append("file", coverImage);
      formData.append("upload_preset", preset_key);
      try {
        if (UserData.coverImage !== "") {
          const sendData = {
            coverImage_publicId: UserData.coverImage_publicId,
          };
          const remove = await removeImage(UserData._id, sendData);
        }

        const server = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        const updatedata = {
          currentUserId: UserData._id,
          coverImage: server.data.secure_url,
          coverImage_publicId: server.data.public_id,
        };
        const update = await UpdateUser(UserData._id, updatedata);
        aReftwo.current.value = null;
        setCoverImage(null);

        setLoginUser(update.data.otherDetails);
      } catch (error) {
        console.log(error);
      }
    }

    setButtonLoading(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <form className="inputform bpad">
        <h3>Your Info</h3>

        <h6>Profile Image</h6>
        {profileImage && <img className="pimg" src={profileImagePreview} />}
        <div className="Input nopad">
          <input
            type="file"
            className="choose_file"
            ref={aRefone}
            name="profileImage"
            onChange={onImageChange}
          />
        </div>
        <h6>Cover Image</h6>
        {coverImage && <img className="cimg" src={coverImagePreview} />}
        <div className="Input nopad">
          <input
            type="file"
            className="choose_file"
            ref={aReftwo}
            name="coverImage"
            onChange={onImageChange}
          />
        </div>

        {buttonLoading ? (
          <div class="loader">
            <i class="loader-el"></i>
            <i class="loader-el"></i>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            type="submit"
            className="button InputButton"
          >
            Update
          </button>
        )}
      </form>
    </Modal>
  );
}
export default ProfileModal;
