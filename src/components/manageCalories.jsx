import React, { useState } from "react";
import "./global.css";
import { Layout } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ManageCalories({ data }) {
  const [open, setOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBarClick = (event) => {
    const chartElement = event.currentTarget;
    const rect = chartElement.getBoundingClientRect();
    const x = event.clientX - rect.left;

    const barWidth = rect.width / Object.keys(data).length;
    const barIndex = Math.floor(x / barWidth);
    const date = Object.keys(data)[barIndex];
    const calories = data[date].calories;  // Correctly accessing the calories value

    setSelectedBar({ date, calories });
  };

  const dates = Object.keys(data);
  const caloriesData = dates.map((date) => data[date].calories); // Extracting calories for the chart

  return (
    <>
      <div className="container">
        <Layout
          className="home"
          style={{
            marginTop: "1rem",
            background: "#FFF",
            width: "100%",
            height: "auto",
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <div className="content d-flex align-items-center justify-content-between">
            <h2>Quản Lý Cân Nặng</h2>

            <React.Fragment>
              <Button className="btn" variant="outlined" onClick={handleClickOpen}>
                <SettingsIcon />
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                  },
                }}
              >
                <DialogTitle>Set cảnh báo Calories được nạp vào cơ thể</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Calories:"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Set</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </div>
        </Layout>
      </div>
      <div className="container mt-2 d-flex gap-2">
        <Layout
          className="home"
          style={{
            background: "#FFF",
            width: "50%",
            height: "auto",
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <div onClick={handleBarClick}>
            <BarChart
              series={[
                {
                  data: caloriesData,
                },
              ]}
              height={290}
              xAxis={[
                {
                  data: dates,
                  scaleType: "band",
                },
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </Layout>
        <Layout
          className="home"
          style={{
            background: "#FFF",
            width: "50%",
            height: "auto",
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <LineChart
            xAxis={[{ data: dates.map((_, index) => index + 1) }]}
            series={[
              {
                data: caloriesData,
              },
            ]}
            width={500}
            height={300}
          />
        </Layout>
      </div>
      <div className="container mt-2 weight-infor">
        <Layout
          className="home"
          style={{
            background: "#FFF",
            width: "100%",
            height: "auto",
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          {selectedBar && (
            <p>Ngày {selectedBar.date} bạn đã ăn {selectedBar.calories} calories</p>
          )}
        </Layout>
      </div>
    </>
  );
}

export default ManageCalories;
