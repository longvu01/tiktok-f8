import { useParams } from 'react-router-dom';

function Profile() {
  const { nickname } = useParams();

  return <h2>Profile page of {nickname}</h2>;
}

export default Profile;
