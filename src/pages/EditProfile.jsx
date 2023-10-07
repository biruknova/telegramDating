import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const BackButton = window.Telegram.WebApp.BackButton;

  BackButton.show();

  useEffect(() => {
    const handleBack = () => {
      navigate("/matches");
    };

    BackButton.onClick(handleBack);

    // Clean up the event listener when the component unmounts
    return () => {
      BackButton.offClick(handleBack);
      BackButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>this is edit profile page</div>;
};
export default EditProfile;
