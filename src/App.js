import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/header';
import HomeComponent from './components/home';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import MemberListComponent from './components/listMember';
import ManageCalories from './components/manageCalories';

function App() {
  return (
    <BrowserRouter>
      <Layout style={{background:"none"}}>
        <HeaderComponent></HeaderComponent>
        <Content>
          <Routes>
            <Route path="/" element={<HomeComponent />}></Route>
            <Route path="/member" element={<MemberListComponent/>}></Route>
            <Route path="/manageCalories" element={<ManageCalories/>}></Route>
          </Routes>
        </Content>

        
      </Layout>
    </BrowserRouter>
  );
}

export default App;
