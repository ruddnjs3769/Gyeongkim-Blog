import supabase from "./index";

const logIn = async (email, password) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    alert(error.message);
    throw error;
  }
  return data;
};
export default logIn;

export const logOut = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) {
    alert("로그아웃 실패", error.message);
    throw error;
  }
  return;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) return false;
  if (data && data.session === null) return false;
  if (data && data.session) return true;
};
