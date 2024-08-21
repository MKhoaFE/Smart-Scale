import { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import HeaderComponent from "./components/header";
import HomeComponent from "./components/home";
import MemberListComponent from "./components/listMember";
import ManageCalories from "./components/manageCalories";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { database } from "./firebase"; 
import "./App.css";
import CaloriesonFood from "./components/caloriesonFood";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodRef = ref(database, "day");
        const snapshot = await get(foodRef);
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          throw new Error("No data available");
        }
      } catch (err) {
        setError("Error connecting to Firebase. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="main-container">
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <BrowserRouter>
          <Layout style={{ background: "none" }}>
            <HeaderComponent />
            <Content>
              <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/member" element={<MemberListComponent />} />
                <Route path="/manageCalories" element={<ManageCalories data={data} />} />
                <Route path="/CaloriesonFood" element={<CaloriesonFood data={data} />} />
              </Routes>
            </Content>
          </Layout>
        </BrowserRouter>
      )}
    </main>
  );
}
