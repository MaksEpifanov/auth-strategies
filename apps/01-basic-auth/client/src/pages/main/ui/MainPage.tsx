import { Button } from "@radix-ui/themes";
import { useEffect } from "react";

const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/admins");
    if (!response.ok) {
      console.log(response.text);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const MainPage = () => {
  useEffect(() => {
    fetchUsers().then((users) => {
      console.log(users);
    });
  }, []);

  return (
    <div>
      <Button>SS</Button>
    </div>
  );
};
