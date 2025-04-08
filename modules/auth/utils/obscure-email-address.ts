export const obscureEmailAddress = (emailAddress: string) => {
  const [username, domain] = emailAddress.split("@");
  const obscuredUsername = `****${username.slice(username.length / 2, username.length)}`;
  return `${obscuredUsername}@${domain}`;
};
