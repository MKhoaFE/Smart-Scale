import React from "react";
import "./global.css";
import { Layout } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Person2Icon from "@mui/icons-material/Person2";
import Person4Icon from "@mui/icons-material/Person4";
function MemberListComponent() {
  return (
    <div className="container mt-2">
      <Layout
        className="home"
        style={{
          background: "FFF",
          width: "100%",
          height: "auto",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Nguyễn Đình Kiên" secondary="22127216" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person2Icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Nguyễn Đức Thiện" secondary="22127397" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person4Icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Nguyễn Hoàng Minh Khoa" secondary="20127535" />
          </ListItem>
        </List>
      </Layout>
    </div>
  );
}

export default MemberListComponent;
