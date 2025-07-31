import { useAppStore } from "../../../../../../../store";
import { AvatarImage, Avatar } from "../../../../../../components/ui/avatar";
import { getColor } from "../../../../../../lib/utils";
import { HOST, LOGOUT_ROUTE } from "../../../../../../utils/constants";
import { apiClient } from "../../../../../../lib/api-client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../../../components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex itc justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 itc justify-center">
        <div className="w-12 h-12 relative top-2">
          <Avatar className="h-12 w-12  rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div className="flex justify-center items-center">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <Tooltip>
          <TooltipTrigger>
            <FiEdit2
              className="text-purple-500 text-xl font-medium"
              onClick={() => navigate("/profile")}
            />
          </TooltipTrigger>
          <TooltipContent className="border-none text-white">
            <p>Edit Profile</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <IoLogOut
              className="text-red-500 text-xl font-medium"
              onClick={logOut}
            />
          </TooltipTrigger>
          <TooltipContent className="border-none text-white">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProfileInfo;
