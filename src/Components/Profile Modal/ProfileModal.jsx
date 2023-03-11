import { Modal, useMantineTheme } from '@mantine/core';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { removeImage, UpdateUser } from '../../api/ChatRequest';
import { UserContext } from '../../UseContext';

function ProfileModal({modalOpen, setModalOpen,loginUser}) {
  const aRefone = useRef(null);
  const aReftwo = useRef(null);

   const { 
    setLoginUser

  } =
    useContext(UserContext);

    useEffect(()=>{
      setProfileImage(null)
      setCoverImage(null)
    console.log("www")
    },[modalOpen])
useEffect(()=>{
  setFormData(loginUser)
  // setProfileImage(null)
  // setCoverImage(null)

},[loginUser])

  const theme = useMantineTheme();
  const [buttonLoading, setButtonLoading] = useState(false);
const[formData,setFormData]=useState(loginUser)
const [profileImage,setProfileImage]=useState(null)
const [coverImage,setCoverImage]=useState(null)
// const [profileImgLink,setProfileImgLink]=useState("")
// const [coverImgLink,setCoverImgLink]=useState("")

const [profileImagePreview,setProfileImagePreview]=useState(null)
const [coverImagePreview,setCoverImagePreview]=useState(null)



// const handleChange=(e)=>{
// setFormData({...formData,[e.target.name]:e.target.value})
// }

const onImageChange=(event)=>{
    if(event.target.files && event.target.files[0]){
    let img=event.target.files[0];
    event.target.name ==="profileImage"
    ? setProfileImage(img)  
    :setCoverImage(img);

    event.target.name==="profileImage"?
    setProfileImagePreview(URL.createObjectURL(img)):    setCoverImagePreview(URL.createObjectURL(img))
    }
}
// console.log(profileImgLink)

// const handleSubmit=(e)=>{
//     e.preventDefault();
//     let UserData=formData
//     if(profileImage){
//         const data = new FormData();
//         const fileName = Date.now() + profileImage.name;
//         data.append("name", fileName);
//         data.append("file", profileImage);
//         UserData.profilePicture = fileName;
//         try {
//         //   dispatch(uploadImage(data));
//         } catch (err) {
//           console.log(err);
//         }
//     }
// }
// CLOUDINARY_URL=cloudinary://968286853185925:0iL6Gi9yiDJwGNyk5u7JntzRBkk@dor3vskgy
const preset_key="hswixg5v";
const cloud_name="dor3vskgy";

const handleSubmit =async(event)=>{
setButtonLoading(true)
    event.preventDefault();
    let UserData=formData
    console.log(UserData)

    // if(UserData.profileImage!==""){
// try {
  // const dlt= await cloudinary.v2.uploader.destroy(UserData.profileImage_publicId)
  // console.log(dlt)
// } catch (error) {
  
// }
    // }
if(profileImage){
  console.log("1")

  const formData = new FormData();
  formData.append('file',profileImage);
  formData.append("upload_preset", preset_key)



  try {
    console.log(UserData.profileImage)

    if(UserData.profileImage !== ""){
      // console.log("eee")
  const userId=UserData._id
        const sendData={
          "profileImage_publicId":UserData.profileImage_publicId
        }
  console.log(userId,sendData)
  
  const remove=await removeImage(userId,sendData)
  console.log(remove)
  
      }


    const server=await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
console.log(server)


const updatedata={
  "currentUserId":UserData._id,
  "profileImage":server.data.secure_url,
  "profileImage_publicId":server.data.public_id,
  // "coverImage":coverImgLink===""?UserData.coverImage:coverImgLink
}
const update=await UpdateUser(UserData._id,updatedata)
aRefone.current.value = null;
setProfileImage(null)

setLoginUser(update.data.otherDetails)
// setProfileImgLink(server.data.secure_url)
// console.log(profileImgLink)

console.log("3")

  } catch (error) {
    console.log(error)
  }
}
if(coverImage){
  console.log("a")

  // const file=event.target.files[0];
  const formData = new FormData();
  formData.append('file',coverImage);
  formData.append("upload_preset", preset_key)
  try {
    console.log("b")
    if(UserData.coverImage!==""){
      const sendData={
        // "currentUserId":UserData._id,
        "coverImage_publicId":UserData.coverImage_publicId,
        // "profileImage_publicId":server.data.public_id,
        // "coverImage":coverImgLink===""?UserData.coverImage:coverImgLink
      }
const remove=await removeImage(UserData._id,sendData)

    }


    const server=await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
    // console.log(server)
    const updatedata={
      "currentUserId":UserData._id,
      // "profileImage":server.data.secure_url,
      "coverImage":server.data.secure_url,
  "coverImage_publicId":server.data.public_id,

    }
    const update=await UpdateUser(UserData._id,updatedata)
aReftwo.current.value = null;
setCoverImage(null)

    setLoginUser(update.data.otherDetails)
    // setCoverImgLink(server.data.secure_url)
// console.log(coverImgLink)
console.log("c")

  } catch (error) {
    console.log(error)
  }
} 

// upd()
   
// console.log(coverImgLink)
// console.log(profileImgLink)
setButtonLoading(false)



}


// const upd=async()=>{
//   let UserData=formData

//   if(profileImgLink !=="" || coverImgLink !=="" ){
//     const updatedata={
//       "currentUserId":UserData._id,
//       "profileImage":profileImgLink===""?UserData.profileImage:profileImgLink,
//       "coverImage":coverImgLink===""?UserData.coverImage:coverImgLink
//     }
//     console.log(updatedata)
   
//     try {
//        const update=await UpdateUser(UserData._id,updatedata)
//     setLoginUser(update.data.otherDetails)
//     setButtonLoading(false)
//     } catch (error) {
      
//     }
  
//   }
// }
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      // size='60%'
      opened={modalOpen}
      onClose={()=>setModalOpen(false)}
    >

<form  className='inputform bpad'>
    <h3>Your Info</h3>

{/* <div className="doubleInput">
<div className="Inputpair" >

<input
  className='Input'
  type="text"
  placeholder="First Name"
name="firstname"
onChange={handleChange}
value={formData.firstname}

/>

</div>
          <div className="Inputpair" >

          <input
            className='Input'
            type="text"
            placeholder="Last Name"
            name="lastname"
onChange={handleChange}
value={formData.lastname}


         />
         
</div>
</div> */}
<h6>
Profile Image

</h6>
{profileImage &&
  <img  className='pimg' src={profileImagePreview}/>

}
<div className='Input nopad'>
    <input type="file" className='choose_file' ref={aRefone}  name="profileImage" onChange={onImageChange}/>
   
</div>
<h6>
Cover Image

</h6>
{coverImage &&
  <img  className='cimg' src={coverImagePreview}/>

}
<div className='Input nopad'>
    <input type="file" className='choose_file' ref={aReftwo} name="coverImage" onChange={onImageChange}/>


</div>
{/* <img className='cimg' src={coverImage}/> */}


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
export default ProfileModal



// const handleSubmit =async(event)=>{

//   e.preventDefault();
//   let UserData=formData


// const file=event.target.files[0];
// const formData = new FormData();
// formData.append('file',file);
// formData.append("upload_preset", preset_key)
// try {

//   const server=await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
// console.log(server)
// console.log(server.data.secure_url)

// } catch (error) {
//   console.log(error)
// }
// }