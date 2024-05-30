import React, { useEffect, useState } from "react";
import CarsHeader from "../SearchPanel/SearchPanel";
import ListItem from "../ListItem/ListItem";
import { blockUser, deleteUser, getUsers, searchUser } from "../../api/users";
import UserDetails from "./UserDetails";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);
  const blockHandler = (id) => {
    blockUser(id).then(() => {
      getUsers().then((res) => {
        setUsers(res);
      });
    });
  };
  const deleteHandler = (id) => {
    deleteUser(id).then(() => {
      getUsers().then((res) => {
        setUsers(res);
      });
    });
  };
  const searchHandler = (value) => {
    searchUser(value).then((res) => {
      console.log({ res });
      setUsers(res);
    });
  };
  return (
    <div>
      <CarsHeader
        title={
          <span>
            Управління <span style={{ color: "orange" }}>користувачами</span>
          </span>
        }
        searchHandler={searchHandler}
      />
      {users?.length &&
        users?.map((user) => {
          return (
            <ListItem
              blockHandler={()=>blockHandler(user.id)}
              image={user.image}
              deleteHandler={() => deleteHandler(user.id)}
            >
              <UserDetails user={user} />;
            </ListItem>
          );
        })}
    </div>
  );
}
