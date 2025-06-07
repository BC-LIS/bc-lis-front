import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;

  return <div>Perfil de usuario: {username}</div>;
};

export default ProfilePage;
