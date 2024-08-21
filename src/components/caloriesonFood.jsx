import React, { useEffect, useState } from "react";
import "./global.css";
import { Layout } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { child, get, getDatabase, ref } from "firebase/database";

function CaloriesonFood({ data }) {
  const [open, setOpen] = useState(false);
  const [weightToday, setWeightToday] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const foodItems = [
    {
      name: "Thịt bò",
      image: "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/an_thit_bo_nhieu_co_tot_khong_benh_gi_can_han_che_an_thit_bo_1_5f471ad835.jpg",
      calories: 260,
      protein: 27,
    },
    {
      name: "Gà",
      image: "https://meatdeli.com.vn/upload/iblock/277/27706f19b4ba94f6f2a9a9a18dc02033.jpg",
      calories: 165,
      protein: 31,
    },
    {
      name: "Cơm trắng",
      image: "https://drinkocany.com/wp-content/uploads/2022/12/100g-com-trang-bao-nhieu-calo-0.png",
      calories: 130,
      protein: 2.7,
    },
    {
      name: "Thịt ba chỉ",
      image: "https://cdn.tgdd.vn/2021/01/CookProduct/thum-1200x676-9.jpg",
      calories: 295,
      protein: 15,
    },
    {
      name: "Cá",
      image: "https://cdn.tgdd.vn/Files/2017/11/18/1042600/cach-chon-ca-thu-tuoi-ngon-dinh-duong-cho-chi-em-noi-tro-202206111324556578.jpg",
      calories: 202,
      protein: 19.5,
    },
    {
      name: "Bơ",
      image: "https://tiki.vn/blog/wp-content/uploads/2023/08/an-bo-co-tac-dung-gi-1.jpg",
      calories: 165,
      protein: 2,
    },
  ];

  const handleAddFood = (food) => {
    setSelectedFoods((prevSelectedFoods) => [...prevSelectedFoods, food]);
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    // Format ngày theo định dạng trong Firebase: YYYY-MM-DD
    const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
    setCurrentDate(formattedDate); // Cập nhật ngày hiện tại

    get(child(dbRef, `day/${formattedDate}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setWeightToday(snapshot.val().kg);
        } else {
          setWeightToday(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedFoods.length > 0) {
      const totalCalories = selectedFoods.reduce(
        (total, food) => total + (food.calories * weightToday) / 100,
        0
      );
      setTotalCalories(totalCalories);
    }
  }, [selectedFoods, weightToday]);

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
          <div className="content d-flex align-items-center justify-content-between ">
            <h2>Ngày: {currentDate}</h2>

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
          <div className="content">
            <h5>
              Trọng lượng đồ ăn vừa cân:{" "}
              {weightToday ? weightToday : "Không có dữ liệu"} gram
            </h5>
            <h5>Thực phẩm ngày hôm nay:</h5>
            <div className="list d-flex flex-wrap justify-content-between align-items-center">
              {foodItems.map((food, index) => (
                <Card key={index} style={{ marginTop: "1rem" }} sx={{ minWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={food.image}
                    title={food.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {food.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Calories: {food.calories} kcal <br />
                      Protein: {food.protein}g
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleAddFood(food)}>
                      Add
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
            <br />
            <h5>Thông tin bữa ăn:</h5>
            <div>
              {selectedFoods.length > 0 ? (
                <>
                  <ul>
                    {selectedFoods.map((food, index) => (
                      <li key={index}>{food.name}</li>
                    ))}
                  </ul>
                  <h6>
                    Tổng Calories: {totalCalories.toFixed(2)} kcal
                  </h6>
                </>
              ) : (
                <p>Chưa có món ăn nào được thêm vào.</p>
              )}
            </div> 
          </div>
        </Layout>
      </div>
    </>
  );
}

export default CaloriesonFood;
