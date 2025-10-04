import { FaRegImage } from "react-icons/fa";

function ProfilePicture() {
  return (
    <div>
      <div className="w-full h-64 md:h-56 lg:h-64 flex items-center justify-center bg-gray-200 text-gray-600 rounded">
        <FaRegImage size={48} />
      </div>
    </div>
  );
}

export default ProfilePicture;
