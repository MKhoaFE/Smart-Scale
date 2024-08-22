import React, { useState } from "react";
import "../components/global.css";
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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
    const calories = data[date].calories; // Correctly accessing the calories value

    setSelectedBar({ date, calories });
  };

  const dates = Object.keys(data);
  const caloriesData = dates.map((date) => data[date].calories); // Extracting calories for the chart

  // Logic tính BMI
  const calculateBMI = () => {
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
  
    if (height && weight && age) {
      const bmiValue = (weight / (height / 100) ** 2).toFixed(2);
      setBmi(bmiValue);
  
      const calories =
        gender === "female"
          ? (6.25 * height + 10 * weight - 5 * age - 161).toFixed(2)
          : (6.25 * height + 10 * weight - 5 * age + 5).toFixed(2);
      setCaloriesNeeded(calories);
  
      // Nội dung tin nhắn
      const my_text = ` Số liệu đo mới nhất:
      Height: ${height} cm
      Weight: ${weight} kg
      Age: ${age} years
      BMI: ${bmiValue}
      Calories Needed: ${calories} cal`;
  
      // Gửi yêu cầu đến API Telegram
      const token = "7466908078:AAHJm7ZsIN1pZw81s1Y--4n4_w7PIbNx6ME";
      const chat_id = -4580422151;
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(my_text)}`;
  
      fetch(url)
        .then(response => {
          if (response.ok) {
            console.log("Message sent to bot:", my_text);
          } else {
            console.log("Failed to send message to bot");
          }
        })
        .catch(error => {
          console.log("Error sending message to bot:", error);
        });
  
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };
  
  const [bmi, setBmi] = useState(null);
  const [caloriesNeeded, setCaloriesNeeded] = useState(null);

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
              <Button
                className="btn"
                variant="outlined"
                onClick={handleClickOpen}
              >
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
                <DialogTitle>
                  Set cảnh báo Calories được nạp vào cơ thể
                </DialogTitle>
                <DialogContent>
                  <DialogContentText></DialogContentText>
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
            <p>
              Ngày {selectedBar.date} bạn đã ăn {selectedBar.calories} calories
            </p>
          )}

          <div className="bmi-calculator d-flex gap-2">
            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label">Giới tính</InputLabel>
              <Select labelId="gender-label" id="gender" label="Giới tính">
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="height"
              label="Chiều cao (cm)"
              type="number"
              fullWidth
              margin="normal"
            />

            <TextField
              id="weight"
              label="Cân nặng (kg)"
              type="number"
              fullWidth
              margin="normal"
            />

            <TextField
              id="age"
              label="Tuổi"
              type="number"
              fullWidth
              margin="normal"
            />
          </div>

          <div className="container">
            <Button
              variant="contained"
              style={{
                background: "rgb(52, 183, 216)",
                color: "white",
                margin: "1rem 40%",
                width: "100%",
                maxWidth: "300px",
              }}
              onClick={calculateBMI}
            >
              Tính BMI & Calories
            </Button>
          </div>

          {bmi && (
            <div className="bmi-result d-flex">
              <div
                className="result"
                style={{
                  backgroundColor:
                    bmi < 18.5
                      ? "#3FC6FB"
                      : bmi >= 18.5 && bmi < 25
                      ? "#0CC656"
                      : "#FFD63A",
                  padding: "10px",
                  borderRadius: "5px",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {bmi}
              </div>
              <div className="description">
                {bmi < 16 && (
                  <p>Chỉ số BMI của bạn cho thấy bạn bị gầy độ III</p>
                )}
                {bmi >= 16 && bmi < 17 && (
                  <p>Chỉ số BMI của bạn cho thấy bạn bị gầy độ II</p>
                )}
                {bmi >= 17 && bmi < 18.5 && (
                  <p>Chỉ số BMI của bạn cho thấy bạn gầy độ I</p>
                )}
                {bmi >= 18.5 && bmi < 25 && (
                  <p>Chỉ số BMI của bạn cho thấy bạn Bình thường</p>
                )}
                {bmi >= 25 && bmi < 30 && (
                  <p>Chỉ số BMI của bạn cho thấy bạn bị thừa cân</p>
                )}
                {bmi >= 30 && bmi < 35 && (
                  <p>Chỉ số BMI của bạn cho thấy bạn bị béo phì độ I</p>
                )}
                {bmi >= 35 && bmi < 40 && (
                  <p>Chỉ số BMI của bạn cho thấy bạn bị béo phì độ II</p>
                )}
                {bmi >= 40 && (
                  <p>Chỉ số BMI của bạn cho thấy bạn bị béo phì độ III</p>
                )}
              </div>
            </div>
          )}

          {caloriesNeeded && (
            <div className="calories-needed mt-3">
              <p>
                Lượng calories cần nạp vào cơ thể hàng ngày của bạn là:{" "}
                <span style={{ fontWeight: "700", fontSize: "20px" }}>
                  {caloriesNeeded}
                </span>{" "}
                calo
              </p>
            </div>
          )}
        </Layout>
      </div>
    </>
  );
}

export default ManageCalories;
