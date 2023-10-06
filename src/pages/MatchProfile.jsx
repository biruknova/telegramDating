import { useParams } from "react-router-dom";

const MatchProfile = () => {
  const param = useParams();
  window.Telegram.WebApp.BackButton.show();
  return <div>This is match profile page {param.matchId} </div>;
};
export default MatchProfile;
