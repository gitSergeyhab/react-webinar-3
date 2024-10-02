export const getUserProfileFromUser = (user) => {
  const { email, profile } = user;
  const {name, phone} = profile
  return {email, name, phone}
}
