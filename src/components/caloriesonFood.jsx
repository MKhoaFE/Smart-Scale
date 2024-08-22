import React, { useEffect, useState } from "react";
import "./global.css";
import { Layout } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { child, get, getDatabase, ref, update, set } from "firebase/database";

function CaloriesonFood({ data }) {
  const [weightToday, setWeightToday] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [measurements, setMeasurements] = useState([]);
  const [currentMeasurement, setCurrentMeasurement] = useState(null);

  const token = "7466908078:AAHJm7ZsIN1pZw81s1Y--4n4_w7PIbNx6ME";
  const chat_id = -4580422151;

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
    if (!currentMeasurement) return;

    const caloriesFromFood = (food.calories * currentMeasurement) / 100;
    setTotalCalories((prevTotal) => prevTotal + caloriesFromFood);

    setSelectedFoods((prevSelectedFoods) => [
      ...prevSelectedFoods,
      { ...food, calculatedCalories: caloriesFromFood },
    ]);

    const nextMeasurements = measurements.slice(1);
    setMeasurements(nextMeasurements);
    setCurrentMeasurement(nextMeasurements[0]);

    const dbRef = ref(getDatabase());

    if (nextMeasurements.length > 0) {
      const updatedMeasurements = Object.fromEntries(
        nextMeasurements.map((val, index) => [`Lần đo ${index + 1}`, val])
      );

      update(dbRef, { [`day/${currentDate}`]: updatedMeasurements })
        .then(() => {
          return update(dbRef, { [`day/${currentDate}/Lần đo 1`]: null });
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      update(dbRef, { [`day/${currentDate}/Lần đo 1`]: null }).catch((error) =>
        console.error("Error updating data:", error)
      );
    }
  };

  const handleSubmitCalories = () => {
    const dbRef = ref(getDatabase(), `day/${currentDate}/TotalCalories`);

    // Đẩy tổng số calories lên Firebase
    set(dbRef, totalCalories)
      .then(() => {
        console.log("Total calories saved to Firebase.");
      })
      .catch((error) => {
        console.error("Error saving calories to Firebase:", error);
      });

    // Gửi thông báo qua Telegram
    const my_text = `Total Calories consumed on ${currentDate}: ${totalCalories.toFixed(2)} kcal`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(my_text)}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          console.log("Notification sent to Telegram.");
        } else {
          console.error("Error sending notification to Telegram.");
        }
      })
      .catch((error) => {
        console.error("Error sending notification to Telegram:", error);
      });
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
  
    const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
    setCurrentDate(formattedDate);
  
    get(child(dbRef, `day/${formattedDate}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          // Lọc ra những keys có chứa "Lần đo" và chỉ lấy giá trị kg
          const measurementsArray = Object.keys(data)
            .filter(key => key.startsWith("Lần đo"))
            .map(key => Number(data[key]));
          
          setMeasurements(measurementsArray);
          setCurrentMeasurement(measurementsArray[0]);
        } else {
          setWeightToday(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

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
              {currentMeasurement ? currentMeasurement : "Không có dữ liệu"} gram
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
                      <li key={index}>
                        {food.name}: {food.calculatedCalories.toFixed(2)} kcal
                      </li>
                    ))}
                  </ul>
                  <h6>Tổng Calories: {totalCalories.toFixed(2)} kcal</h6>
                </>
              ) : (
                <p>Chưa có món ăn nào được thêm vào.</p>
              )}
            </div>
            <Button variant="contained" color="primary" onClick={handleSubmitCalories}>
              Submit
            </Button>
          </div>
        </Layout>
      </div>
    </>
  );
}

export default CaloriesonFood;
