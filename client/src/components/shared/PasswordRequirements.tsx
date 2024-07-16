export const PasswordRequirements = () => {
  return (
    <ul className="list-disc list-inside text-xs opacity-75 p-2">
      <li>Passwords must contain at least 1 upper case letter</li>
      <li>Passwords must contain at least 1 lower case letter</li>
      <li>Passwords must contain at least 1 number</li>
      <li>Passwords must contain at least 1 special character</li>
      <li>Passwords must contain at least 8 characters in length</li>
    </ul>
  );
};
