import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MatchProfile = () => {
  const param = useParams();
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
  return <div>This is match profile page {param.matchId} </div>;
};
export default MatchProfile;
