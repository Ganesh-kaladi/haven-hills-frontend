import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMe } from "../slice/authSlice";

function AddProfilePic() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const inputRef = useRef();
  const [file, setFile] = useState({
    image: null,
  });

  function handleIconClick() {
    inputRef.current.click();
  }

  function handleChange(e) {
    setFile((cur) => ({ ...cur, image: e.target.files[0] }));
  }

  useEffect(
    function () {
      if (!file.image) {
        return;
      }
      const formData = new FormData();
      formData.append("profile__pic", file.image);
      dispatch(updateMe({ token, formData }))
        .then((res) => {
          setFile((cur) => ({ ...cur, image: null }));
        })
        .catch((err) => {});
    },
    [file, dispatch, token]
  );

  return (
    <div
      className=" absolute bottom-[-1px] left-[39%] translate-[-50%,-50%] bg-gray-400 rounded-full p-1 cursor-pointer"
      onClick={handleIconClick}
    >
      <Plus className="text-white font-semibold" />
      <input
        type="file"
        ref={inputRef}
        name="image"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
}

export default AddProfilePic;
