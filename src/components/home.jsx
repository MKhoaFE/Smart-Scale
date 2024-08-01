import React from "react";
import "./global.css";
import { Layout } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function HomeComponent() {
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
        <div className="content">
          <h3>Giới thiệu sản phẩm:</h3>
          <div className="">
            <div className="image d-flex">
              <img
                src="https://m.media-amazon.com/images/I/71PRvsYWhXL._AC_UF1000,1000_QL80_.jpg"
                alt="Smart Scale"
              />
            </div>
            <div className="text mt-3 mt-md-0">
              <p>
                Một thiết bị nhà bếp tiên tiến giúp bạn theo dõi lượng dinh
                dưỡng tiêu thụ một cách chính xác và dễ dàng. Công cụ hiện đại
                này kết hợp công nghệ tiên tiến để cung cấp phân tích chi tiết
                về thực phẩm, đảm bảo bạn duy trì được mục tiêu dinh dưỡng của
                mình. Đây là cách hoạt động của nó:
              </p>
              <h5>Tính Năng Chính:</h5>
              <ul>
                <li>
                  <strong>Camera Độ Phân Giải Cao:</strong>
                </li>
                <ul>
                  <li>
                    <strong>Nhận Diện Thực Phẩm:</strong> Camera tích hợp sử
                    dụng các thuật toán nhận dạng hình ảnh tiên tiến để nhận
                    diện loại thực phẩm đặt trên cân. Dù là trái cây, rau củ,
                    thịt hay đồ ăn nhẹ, camera có thể nhận diện và phân loại
                    chính xác các loại thực phẩm.
                  </li>
                  <li>
                    <strong>Phân Tích Thời Gian Thực:</strong> Ngay khi bạn đặt
                    thực phẩm lên cân, camera sẽ chụp và phân tích hình ảnh
                    trong thời gian thực, cung cấp phản hồi ngay lập tức.
                  </li>
                </ul>
                <li>
                  <strong>Cân Chính Xác:</strong>
                </li>
                <ul>
                  <li>
                    <strong>Đo Lường Chính Xác:</strong> Cân đo chính xác trọng
                    lượng của thực phẩm, cung cấp dữ liệu cần thiết để tính toán
                    lượng calo.
                  </li>
                  <li>
                    <strong>Giao Diện Thân Thiện Với Người Dùng:</strong> Màn
                    hình kỹ thuật số hiển thị trọng lượng theo gam hoặc ounce,
                    dễ đọc và hiểu.
                  </li>
                </ul>
                <li>
                  <strong>Cảm Biến Tích Hợp:</strong>
                </li>
                <ul>
                  <li>
                    <strong>Tính Toán Lượng Calo:</strong> Sử dụng dữ liệu từ cả
                    camera và cân, các cảm biến tích hợp tính toán tổng lượng
                    calo của thực phẩm. Bao gồm cả phân tích các chất dinh dưỡng
                    như carbohydrate, protein và chất béo.
                  </li>
                  <li>
                    <strong>Thông Tin Dinh Dưỡng:</strong> Nhận thông tin về giá
                    trị dinh dưỡng của bữa ăn, bao gồm vitamin và khoáng chất,
                    giúp bạn đưa ra lựa chọn ăn uống thông minh.
                  </li>
                </ul>
              </ul>
              <h5>Cách Hoạt Động:</h5>
              <ul>
                <li>
                  <strong>Đặt Thực Phẩm Lên Cân:</strong> Đơn giản chỉ cần đặt
                  thực phẩm của bạn lên cân thông minh. Camera độ phân giải cao
                  sẽ ngay lập tức chụp hình ảnh của thực phẩm.
                </li>
                <li>
                  <strong>Phân Tích Hình Ảnh:</strong> Camera phân tích hình
                  ảnh, nhận diện loại thực phẩm và đối chiếu với cơ sở dữ liệu
                  toàn diện về các loại thực phẩm và giá trị dinh dưỡng của
                  chúng.
                </li>
                <li>
                  <strong>Đo Trọng Lượng:</strong> Cân đo chính xác trọng lượng
                  của thực phẩm và gửi dữ liệu này đến các cảm biến tích hợp.
                </li>
                <li>
                  <strong>Tính Toán Lượng Calo:</strong> Sử dụng dữ liệu từ
                  camera và cân, các cảm biến tính toán tổng lượng calo và cung
                  cấp phân tích chi tiết về giá trị dinh dưỡng của thực phẩm.
                </li>
                <li>
                  <strong>Hiển Thị và Tích Hợp Ứng Dụng:</strong> Kết quả được
                  hiển thị trên màn hình kỹ thuật số và có thể đồng bộ với ứng
                  dụng di động để theo dõi và ghi lại lượng dinh dưỡng tiêu thụ
                  của bạn theo thời gian.
                </li>
              </ul>
              <h5>Lợi Ích:</h5>
              <ul>
                <li>
                  <strong>Chính Xác và Đáng Tin Cậy:</strong> Đo lường chính xác
                  và cung cấp thông tin dinh dưỡng chi tiết để quản lý chế độ ăn
                  tốt hơn.
                </li>
                <li>
                  <strong>Tiện Lợi:</strong> Đơn giản hóa quá trình theo dõi
                  lượng dinh dưỡng tiêu thụ, giúp dễ dàng duy trì chế độ ăn cân
                  bằng.
                </li>
                <li>
                  <strong>Quản Lý Sức Khỏe:</strong> Giúp quản lý cân nặng, theo
                  dõi các chất dinh dưỡng và đưa ra lựa chọn thực phẩm lành mạnh
                  hơn.
                </li>
                <li>
                  <strong>Thân Thiện Với Người Dùng:</strong> Dễ sử dụng với các
                  điều khiển trực quan và tích hợp ứng dụng mượt mà.
                </li>
              </ul>
              <p>
                Cân Thông Minh Với Camera là người bạn đồng hành hoàn hảo cho
                bất kỳ ai muốn cải thiện chế độ ăn uống và sức khỏe thông qua
                việc theo dõi thực phẩm chính xác và dễ dàng. Hãy đón nhận tương
                lai của quản lý dinh dưỡng với công cụ tiên tiến này.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default HomeComponent;
