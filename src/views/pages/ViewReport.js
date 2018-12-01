import React from "react";
import { connect } from "react-redux";
import { saveAdrReport } from "../../redux/actions/adrReport.action.js";

import "static/styles/contentForm.css";
import Modal from 'react-bootstrap4-modal';
import TopActionsBar from 'views/components/core/TopActionsBar';
import { updateMessageStatus } from 'redux/actions/ui.action';

import Metamask from 'blockchain/libs/metamask';
import Database from 'blockchain/libs/database';
import config from 'config';

class ViewReport extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.metamask = new Metamask();
    this.database = new Database(config.eth.DATABASE.ADDRESS, this.metamask.web3);

    this.state = {
      phanUngCoHaiADR: {
        DateADR: "",
        DurationADR: "",
        DVTDuration: 0,
        DescriptionsADR: "",
        XetNghiemADR: "",
        TienSuADR: "",
        XuTriADR: "",
        DoNghiemTrongADR: "Không rõ",
        KetQuaXuTriADR: "",
      },
      thuocNghiNgoADR: [],
      thuocDungDongThoiADR: [],
      thamdinhADR: {
        DanhGiaMLQ: "",
        ThangADR: "",
        BinhLuan: "",
      },
      thongTinNguoiThamDinh: {
        HoTenNG: "",
        NgheNghiepNG: "",
        EmailNG: "",
        PhoneNumberNG: "",
        ReportType: "",
        ReportDate: "",
        TenDonVi: "",
        DiaChiDV: "",
      },
      thuocNghiNgoADRModalState: {
        TenThuocNN: '',
        DangBaoCheThuocNN: '',
        NhaSanXuatThuocNN: '',
        LieuDungMotLanThuocNN: '',
        DonViLieuDungMotLanThuocNN: '',
        DuongDungThuocNN: '',
        NgayBatDauThuocNN: '',
        NgayKetThucThuocNN: '',
        HamLuongThuocNN: '',
        DonViHamLuongThuocNN: '',
        SoLoThuocNN: '',
        SoLanDungThuocNN: '',
        DonViSoLanDungThuocNN: '',
        LyDoDungThuocNN: '',
        PhanUngSauDungThuocNN: '',
        PhanUngTaiSDThuocNN: '',
      },
      thuocDungDongThoiADRModalState:{
        TenThuocDDD: '',
        DangBaoCheThuocDDD: '',
        NhaSanXuatThuocDDD: '',
        LieuDungMotLanThuocDDD: '',
        DonViLieuDungMotLanThuocDDD: '',
        DuongDungThuocDDD: '',
        NgayBatDauThuocDDD: '',
        NgayKetThucThuocDDD: '',
        HamLuongThuocDDD: '',
        DonViHamLuongThuocDDD: '',
        SoLoThuocDDD: '',
        SoLanDungThuocDDD: '',
        DonViSoLanDungThuocDDD: '',
        LyDoDungThuocDDD: '',
      },
      visibleModal1:false,
      visibleModal2:false,
      visibleModalReviewersAndReferences:false,
      visibleModalDone: false,
      messageDone: '',
      hashData: '',
      reviewers:'',
      references:'',
      inputHashData: '',
    };
  }

  showBlinkMessage() {
    //this function to scroll top and make blik 3s
    var bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.style.height = null;
    window.scrollTo(0, 0);
    if (bodyElement.style.height === null) {
      bodyElement.style.height = '100%';
    }
    var blockchainAlert = document.getElementsByClassName('blockchain-alert');
    if (blockchainAlert.length) {
      blockchainAlert[0].classList.add('blink');
      window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(() => {
        blockchainAlert[0].classList.remove('blink');
      }, 3000);
    }
  }

  updateMessageStatus(code) {
    if (code && ![200, 201].includes(code)) {
      this.props.updateMessageStatus(true);
    }
  }

  componentDidMount() {
    this.updateMessageStatus(this.props.blockchain.code);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.blockchain.code !== nextProps.blockchain.code) {
      this.updateMessageStatus(nextProps.blockchain.code);
    }
  }

  render() {
    return (
      <div id="site_wrapper">
        <div className="site-upper">
          {this.props.header}
          <TopActionsBar />
        </div>
        <main className="main bg-white">
          <input name="inputHashData" style={{ width: "120px" }} type="text" onChange={this.handleInput} value={this.state.inputHashData} />
          <div id="wrap-form">
              <form id="form">
                  <div className="boxes-form" id="box2">
                      <h2 className="title-boxesForm">
                        I. THÔNG TIN VỀ PHẢN ỨNG CÓ HẠI (ADR)
                      </h2>
                      <table width="100%">
                          <tbody>
                              <tr>
                                  <td width="45%">
                                      <label style={{ width: "200px", float: "left" }}>
                                          1. Ngày xuất hiện phản ứng:
                                      </label>
                                      <input id="DateADR" name="DateADR" style={{ width: "120px" }} type="text" onChange={this.handleInput} className="datepicker hasDatepicker" value={this.state.phanUngCoHaiADR.DateADR} />
                                  </td>
                                  <td>
                                      <label style={{ width: "300px", float: "left" }}>
                                          2. Phản ứng xuất hiện sau bao lâu:
                                          <br />
                                          <em>
                                  (Tính từ lần dùng cuối cùng của thuốc nghi ngờ)
                                </em>
                                      </label>
                                      <input id="DurationADR" name="DurationADR" style={{ width: "40px" }} type="text" onChange={this.handleInput} value={this.state.phanUngCoHaiADR.DurationADR} />
                                      <label>Đơn vị tính</label>
                                      <select id="DVTDuration" name="DVTDuration" value={this.state.phanUngCoHaiADR.DVTDuration} onChange={this.handleSelected}>
                                          <option value="Giây" defaultValue>
                                              Giây
                                          </option>
                                          <option value="Phút">Phút</option>
                                          <option value="Giờ">Giờ</option>
                                      </select>
                                  </td>
                              </tr>
                              <tr>
                                  <td rowSpan="4">
                                      <label>3. Mô tả biểu hiện ADR</label>
                                      <span style={{ color: "Red" }}>*</span>
                                      <textarea onChange={this.handleInput} id="DescriptionsADR" name="DescriptionsADR" style={{ width: "98%", float: "left" }} rows="18" className="required" value={this.state.phanUngCoHaiADR.DescriptionsADR} />
                                  </td>
                                  <td valign="top">
                                      <label>4. Các xét nghiệm liên quan đến phản ứng</label>
                                      <textarea onChange={this.handleInput} id="XetNghiemADR" name="XetNghiemADR" style={{ width: "97%", float: "left" }} rows="4" value={this.state.phanUngCoHaiADR.XetNghiemADR} />
                                  </td>
                              </tr>
                              <tr>
                                  <td valign="top">
                                      <label>5. Tiền sử:</label>
                                      <textarea onChange={this.handleInput} id="TienSuADR" name="TienSuADR" style={{ width: "97%", float: "left" }} rows="2" value={this.state.phanUngCoHaiADR.TienSuADR} />
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <label>6. Cách xử trí phản ứng</label>
                                      <textarea onChange={this.handleInput} id="XuTriADR" name="XuTriADR" style={{ width: "97%", float: "left" }} rows="4" value={this.state.phanUngCoHaiADR.XuTriADR} />
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <p>
                          <label style={{ width: "25%", float: "left" }}>
                              7. Mức độ nghiêm trọng của phản ứng:
                          </label>
                      </p>
                      <table>
                          <tbody>
                              <tr>
                                  <td>
                                      <input id="opt11.1" name="DoNghiemTrongADR" type="radio" value="vong" defaultChecked={ this.state.phanUngCoHaiADR.DoNghiemTrongADR==="Tử vong" } onChange={this.handleChangeRadio} />{" "}
                                      <span lang="en-us">Tử vong</span>
                                  </td>
                                  <td>
                                      <input id="opt11.2" name="DoNghiemTrongADR" type="radio" value="Nhập viện/Kéo dài thời gian nằm viện" defaultChecked={ this.state.phanUngCoHaiADR.DoNghiemTrongADR==="Nhập viện/Kéo dài thời gian nằm viện" } onChange={this.handleChangeRadio} />
                                      <span>Nhập viện/Kéo dài thời gian nằm viện</span>
                                  </td>
                                  <td>
                                      <input id="opt11.3" name="DoNghiemTrongADR" type="radio" value="Dị tật thai nhi" defaultChecked={ this.state.phanUngCoHaiADR.DoNghiemTrongADR==="Dị tật thai nhi" } onChange={this.handleChangeRadio} />{" "}
                                      <span>Dị tật thai nhi</span>
                                  </td>
                                  <td rowSpan="2" style={{ width: "150px", verticalAlign: "top" }}>
                                      <input id="opt11.4" name="DoNghiemTrongADR" type="radio" value="Không rõ" defaultChecked={ this.state.phanUngCoHaiADR.DoNghiemTrongADR==="Không rõ" } onChange={this.handleChangeRadio} />{" "}
                                      <span>Không rõ</span>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <input id="opt11.5" name="DoNghiemTrongADR" type="radio" value="Đe dọa tính mạng" defaultChecked={ this.state.phanUngCoHaiADR.DoNghiemTrongADR==="Đe dọa tính mạng" } onChange={this.handleChangeRadio} />{" "}
                                      <span>Đe dọa tính mạng</span>
                                  </td>
                                  <td>
                                      <input id="opt11.6" name="DoNghiemTrongADR" type="radio" value="Tàn tật vĩnh viễn/nặng nề" defaultChecked={ this.state.phanUngCoHaiADR.DoNghiemTrongADR==="Tàn tật vĩnh viễn/nặng nề" } onChange={this.handleChangeRadio} />
                                      <span>Tàn tật vĩnh viễn/nặng nề</span>
                                  </td>
                                  <td>
                                      <input id="opt11.7" name="DoNghiemTrongADR" type="radio" value="Không nghiêm trọng" defaultChecked={ this.state.phanUngCoHaiADR.DoNghiemTrongADR==="Không nghiêm trọng" } onChange={this.handleChangeRadio} />{" "}
                                      <span>Không nghiêm trọng</span>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <hr />
                      <p>
                          <label style={{ width: "250px", float: "left" }}>
                              8. Kết quả sau khi xử trí phản ứng:
                          </label>
                      </p>

                      <table>
                          <tbody>
                              <tr>
                                  <td>
                                      <input id="opt12.1" name="KetQuaXuTriADR" type="radio" value="Tử vong do ADR" defaultChecked={ this.state.phanUngCoHaiADR.KetQuaXuTriADR==="Tử vong do ADR" } onChange={this.handleChangeRadio} />{" "}
                                      <span lang="en-us">Tử vong do ADR</span>
                                  </td>
                                  <td>
                                      <input id="opt12.2" name="KetQuaXuTriADR" type="radio" value="Chưa hồi phục" defaultChecked={ this.state.phanUngCoHaiADR.KetQuaXuTriADR==="Chưa hồi phục" } onChange={this.handleChangeRadio} />
                                      <span>Chưa hồi phục </span>
                                  </td>
                                  <td>
                                      <input id="opt12.3" name="KetQuaXuTriADR" type="radio" value="Hồi phục có di chứng" defaultChecked={ this.state.phanUngCoHaiADR.KetQuaXuTriADR==="Hồi phục có di chứng" } onChange={this.handleChangeRadio} />{" "}
                                      <span>Hồi phục có di chứng</span>
                                  </td>
                                  <td rowSpan="2" style={{ width: "150px", verticalAlign: "top" }}>
                                      <input id="opt12.7" name="KetQuaXuTriADR" type="radio" value="Không rõ" defaultChecked={ this.state.phanUngCoHaiADR.KetQuaXuTriADR==="Không rõ" } onChange={this.handleChangeRadio} />{" "}
                                      <span>Không rõ</span>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <input id="opt12.4" name="KetQuaXuTriADR" type="radio" value="Tử vong không liên quan đến thuốc" defaultChecked={ this.state.phanUngCoHaiADR.KetQuaXuTriADR==="Tử vong không liên quan đến thuốc" } onChange={this.handleChangeRadio} />{" "}
                                      <span>Tử vong không liên quan đến thuốc</span>
                                  </td>
                                  <td>
                                      <input id="opt12.5" name="KetQuaXuTriADR" type="radio" value="Đang hồi phục" defaultChecked={ this.state.phanUngCoHaiADR.KetQuaXuTriADR==="Đang hồi phục" } onChange={this.handleChangeRadio} />
                                      <span>Đang hồi phục</span>
                                  </td>
                                  <td>
                                      <input id="opt12.6" name="KetQuaXuTriADR" type="radio" value="Hồi phục không có di chứng" defaultChecked={ this.state.phanUngCoHaiADR.KetQuaXuTriADR==="Hồi phục không có di chứng" } onChange={this.handleChangeRadio} />{" "}
                                      <span>Hồi phục không có di chứng</span>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>

                  <div className="boxes-form" id="Div1">
                      <h2 className="title-boxesForm">
                        II. THÔNG TIN VỀ THUỐC NGHI NGỜ GÂY ADR
                      </h2>
                      <div>
                          <h3>9. Thuốc nghi ngờ gây phản ứng</h3>

                          <table width="100%" border="1" className="grid" id="tblIII">
                              <thead>
                                  <tr className="row-top">
                                      {/*
                                      <th style="display:none">id</th> */}
                                      <th width="150">Thuốc nghi ngờ</th>
                                      <th width="150">Dạng bào chế/hàm lượng</th>
                                      <th width="120">Liều dùng</th>
                                      <th width="70">Đường dùng</th>
                                      <th width="70">Ngày bắt đầu</th>
                                      <th width="70">Ngày kết thúc</th>
                                      <th width="150">Lý do dùng thuốc</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody13" >
                              {
                                this.state.thuocNghiNgoADR.map((item,index) => {
                                  return (
                                    <tr className="" key={index}>
                                      <td>{item.TenThuocNN}</td>
                                      <td>{item.DangBaoCheThuocNN}</td>
                                      <td>{item.LieuDungMotLanThuocNN}</td>
                                      <td>{item.DuongDungThuocNN}</td>
                                      <td>{item.NgayBatDauThuocNN}</td>
                                      <td>{item.NgayKetThucThuocNN}</td>
                                      <td>{item.LyDoDungThuocNN}</td>
                                    </tr>
                                  )
                                })
                              }
                              </tbody>
                          </table>
                          <p className="bt">
                              {/* <Button type="primary" customStyle={{ "display": "block", "margin": "0 auto 20px"}} onClick={e=> (e.preventDefault(), this.openModal1())} >Thêm mới</Button> */}
                              <input type="button" className="button" value="Thêm mới" onClick={this.openModal1}/>
                          </p>
                      </div>
                      <div style={{ marginTop: "65px" }}>
                          <h3>
                          12. Các thuốc dùng đồng thời (Ngoại trừ các thuốc dùng điều
                          trị/ khắc phục hậu quả của ADR)
                        </h3>
                          <table width="100%" border="1" className="grid" id="tblIV">
                              <thead>
                                  <tr className="row-top">
                                      <th width="150">Thuốc đồng thời</th>
                                      <th width="150">Dạng bào chế/hàm lượng</th>
                                      <th width="120">Liều dùng</th>
                                      <th width="70">Đường dùng</th>
                                      <th width="70">Ngày bắt đầu</th>
                                      <th width="70">Ngày kết thúc</th>
                                      <th width="150">Lý do dùng thuốc</th>
                                  </tr>
                              </thead>
                              <tbody >
                              {
                                this.state.thuocDungDongThoiADR.map((item,index) => {
                                  return (
                                    <tr className="" key={index}>
                                      <td>{item.TenThuocDDD}</td>
                                      <td>{item.DangBaoCheThuocDDD}</td>
                                      <td>{item.LieuDungMotLanThuocDDD}</td>
                                      <td>{item.DuongDungThuocDDD}</td>
                                      <td>{item.NgayBatDauThuocDDD}</td>
                                      <td>{item.NgayKetThucThuocDDD}</td>
                                      <td>{item.LyDoDungThuocDDD}</td>
                                    </tr>
                                  )
                                })
                              }
                              </tbody>
                          </table>
                          <p className="bt">
                            {/* <Button type="primary" customStyle={{ "display": "block", "margin": "0 auto 20px"}} onClick={e=> (e.preventDefault(), this.openModal1())} >Thêm mới</Button> */}
                              <input type="button" className="button" value="Thêm mới" onClick={this.openModal2}/>
                          </p>
                      </div>
                  </div>
                  <div className="boxes-form">
                      <h2 className="title-boxesForm">
                        III. PHẦN THẨM ĐỊNH ADR CỦA ĐƠN VỊ
                      </h2>
                      <table>
                          <tbody>
                              <tr>
                                  <td colSpan="3">
                                      13. Đánh giá mối liên quan giữa thuốc và ADR
                                  </td>
                              </tr>
                              <tr>
                                  <td style={{ width: "200px" }}>
                                      <input id="opt17_1" name="DanhGiaMLQ" type="radio" value="Chắc chắn" defaultChecked={ this.state.thamdinhADR.DanhGiaMLQ==="Chắc chắn" } onChange={this.handleChangeRadio} /> Chắc chắn
                                  </td>
                                  <td style={{ width: "200px" }}>
                                      <input id="opt17_2" name="DanhGiaMLQ" type="radio" value="Không chắc chắn" defaultChecked={ this.state.thamdinhADR.DanhGiaMLQ==="Không chắc chắn" } onChange={this.handleChangeRadio} /> Không chắc chắn
                                  </td>
                                  <td rowSpan="2" style={{ verticalAlign: "top" }}>
                                      <input id="opt17_3" name="DanhGiaMLQ" type="radio" value="Khác" defaultChecked={ this.state.thamdinhADR.DanhGiaMLQ==="Khác" } onChange={this.handleChangeRadio} /> Khác
                                      <br />
                                      <textarea onChange={this.handleInput} id="txtDanhGiaMLQ" name="txtDanhGiaMLQ" cols="50" rows="3" />
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <input id="opt17_4" name="DanhGiaMLQ" type="radio" value="Có khả năng" defaultChecked={ this.state.thamdinhADR.DanhGiaMLQ==="Có khả năng" } onChange={this.handleChangeRadio} /> Có khả năng
                                  </td>
                                  <td>
                                      <input id="opt17_5" name="DanhGiaMLQ" type="radio" value="Chưa phân loại" defaultChecked={ this.state.thamdinhADR.DanhGiaMLQ==="Chưa phân loại" } onChange={this.handleChangeRadio} /> Chưa phân loại
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <input id="opt17_6" name="DanhGiaMLQ" type="radio" value="Có thể" defaultChecked={ this.state.thamdinhADR.DanhGiaMLQ==="Có thể" } onChange={this.handleChangeRadio} /> Có thể
                                  </td>
                                  <td>
                                      <input id="opt17_7" name="DanhGiaMLQ" type="radio" value="Không thể phân loại" defaultChecked={ this.state.thamdinhADR.DanhGiaMLQ==="Không thể phân loại" } onChange={this.handleChangeRadio} /> Không thể phân loại
                                  </td>
                                  <td>
                                      <input id="opt17_8" name="DanhGiaMLQ" type="radio" value="Chưa đánh giá" defaultChecked={ this.state.thamdinhADR.DanhGiaMLQ==="Chưa đánh giá" } onChange={this.handleChangeRadio} /> Chưa đánh giá
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table>
                          <tbody>
                              <tr>
                                  <td colSpan="4">
                                      14. Đơn vị thẩm định ADR theo thang nào?
                                  </td>
                              </tr>
                              <tr>
                                  <td style={{ width: "200px" }}>
                                      <input id="opt18.1" name="ThangADR" type="radio" value="Thang WHO" defaultChecked={ this.state.thamdinhADR.ThangADR==="Thang WHO" } onChange={this.handleChangeRadio} /> Thang WHO
                                  </td>
                                  <td style={{ width: "200px" }}>
                                      <input id="opt18.2" name="ThangADR" type="radio" value="Thang Naranjo" defaultChecked={ this.state.thamdinhADR.ThangADR==="Thang Naranjo" } onChange={this.handleChangeRadio} /> Thang Naranjo
                                  </td>
                                  <td style={{ verticalAlign: "top" }}>
                                      <input id="opt18.3" name="ThangADR" type="radio" value="Thang khác" defaultChecked={ this.state.phanUngCoHaiADR.DoNghiemTrongADR !=="Thang WHO" && this.state.thamdinhADR.ThangADR !=="Thang Naranjo" } onChange={this.handleChangeRadio} /> Thang khác
                                      <input id="txtThangADR" name="ThangADR" type="text" onChange={this.handleInput} value={this.state.thamdinhADR.ThangADR} style={{ width: "150px" }} />
                                  </td>
                                  <td style={{ width: "150px" }}>
                                      <input id="opt18.4" name="ThangADR" type="radio" value="Chưa thẩm định" defaultChecked={ this.state.thamdinhADR.ThangADR==="Chưa thẩm định" } onChange={this.handleChangeRadio} /> Chưa thẩm định
                                  </td>
                              </tr>
                              <tr>
                                  <td colSpan="4">
                                      15. Phần bình luận của cán bộ y tế (nếu có)
                                  </td>
                              </tr>
                              <tr>
                                  <td colSpan="4">
                                      <textarea onChange={this.handleInput} id="txt19" name="BinhLuan" value={this.state.thamdinhADR.BinhLuan} style={{ width: "97%" }} rows="4" />
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>

                  <div className="boxes-form">
                      <h2 className="title-boxesForm">
                        IV. THÔNG TIN VỀ NGƯỜI/ĐƠN VỊ GỬI BÁO CÁO
                      </h2>
                      <table>
                          <tbody>
                              <tr>
                                  <td style={{ textAlign: "left", width: "100px" }}>
                                      16. Họ và Tên:<span style={{ color: "Red" }}>*</span>
                                  </td>
                                  <td>
                                      <input id="HoTenNG" name="HoTenNG" type="text" onChange={this.handleInput} style={{ width: "160px" }} className="required" value={this.state.thongTinNguoiThamDinh.HoTenNG} />
                                  </td>
                                  <td style={{ textAlign: "right" }}>Nghề nghiệp:</td>
                                  <td>
                                      <select id="NgheNghiepNG" name="NgheNghiepNG" value={this.state.thongTinNguoiThamDinh.NgheNghiepNG} onChange={this.handleSelected}>
                                          <option>Bác sỹ</option>
                                          <option>Nha sĩ</option>
                                          <option>Dược sĩ</option>
                                          <option>Công ty Dược phẩm</option>
                                          <option>Y tá</option>
                                          <option>Điều dưỡng</option>
                                          <option>Nữ hộ sinh</option>
                                          <option>Khác</option>
                                      </select>
                                  </td>
                                  <td style={{ textAlign: "right" }}>Email: </td>
                                  <td>
                                      <input type="text" onChange={this.handleInput} id="EmailNG" name="EmailNG" style={{ width: "160px" }} value={this.state.thongTinNguoiThamDinh.EmailNG} />
                                  </td>
                              </tr>
                              <tr>
                                  <td style={{ textAlign: "left" }}>Điện thoại:</td>
                                  <td>
                                      <input id="PhoneNumberNG" name="PhoneNumberNG" type="text" onChange={this.handleInput} value={this.state.thongTinNguoiThamDinh.PhoneNumberNG} />
                                  </td>

                                  <td style={{ textAlign: "right" }}>17.Dạng báo cáo:</td>
                                  <td>
                                      <input id="Radio23" name="ReportType" type="radio" value="Báo cáo lần đầu" defaultChecked={ this.state.thongTinNguoiThamDinh.ReportType==="Báo cáo lần đầu" } onChange={this.handleChangeRadio} /> Báo cáo lần đầu
                                      <input id="Radio24" name="ReportType" type="radio" value="Báo cáo bổ sung" defaultChecked={ this.state.thongTinNguoiThamDinh.ReportType==="Báo cáo bổ sung" } onChange={this.handleChangeRadio} /> Báo cáo bổ sung
                                  </td>
                                  <td style={{ textAlign: "right" }}>18.Ngày báo cáo: </td>
                                  <td>
                                      <input id="ReportDate" name="ReportDate" style={{ width: "70px" }} type="text" onChange={this.handleInput} className="datepicker hasDatepicker" value={this.state.thongTinNguoiThamDinh.ReportDate} />
                                      <img className="ui-datepicker-trigger" src="/Content/images/calendar.gif" alt="..." title="..." />
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      19. Tên đơn vị báo cáo:
                                      <span style={{ color: "Red" }}>*</span>
                                  </td>
                                  <td colSpan="2">
                                      <input type="text" onChange={this.handleInput} id="TenDonVi" name="TenDonVi" style={{ width: "250px" }} value={this.state.thongTinNguoiThamDinh.TenDonVi} className="required" />
                                  </td>
                                  <td align="right">Địa chỉ đơn vị báo cáo:</td>
                                  <td colSpan="2">
                                      <input type="text" onChange={this.handleInput} id="DiaChiDV" name="DiaChiDV" style={{ width: "250px" }} value={this.state.thongTinNguoiThamDinh.DiaChiDV} />
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <p className="bt-end-form">
                      <input type="button" className="button" value="Nộp báo cáo" onClick={this.submitForm}/>

                  </p>
                  <input type="hidden" name="ThuocNghiNgoJson" id="ThuocNghiNgoJson" />
                  <input type="hidden" name="ThuocDongThoiJson" id="ThuocDongThoiJson" />
              </form>
          </div>
        </main>
        {this.props.footer}

        <Modal id="thuoc-nn-modal" visible={this.state.visibleModal1} dialogClassName="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close-button" onClick={this.closeModal1}/>
              <span className="title">Nhập Thuốc nghi ngờ gây phản ứng</span>
              {/* <div className="text-warning">Nhập Thuốc nghi ngờ gây phản ứng</div> */}
              <div className="content">
                <input type="text" name="TenThuocNN" placeholder="Tên thuốc nghi ngờ" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.TenThuocNN}/>
                <input type="text" name="DangBaoCheThuocNN" placeholder="Dạng bào chế" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.DangBaoCheThuocNN}/>
                <input type="text" name="NhaSanXuatThuocNN" placeholder="Nhà Sản Xuất Thuốc" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.NhaSanXuatThuocNN}/>
                <input type="text" name="LieuDungMotLanThuocNN" placeholder="Liều Dùng Một Lần" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.LieuDungMotLanThuocNN}/>
                <select name="DonViLieuDungMotLanThuocNN" onChange={this.handleSelected} value={this.state.thuocNghiNgoADRModalState.DonViLieuDungMotLanThuocNN}>
                  <option value="G">G</option>
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="ng">ng</option>
                  <option value="UI">UI</option>
                  <option value="g/l">g/l</option>
                  <option value="mg/ml">mg/ml</option>
                  <option value="mcg/ml">mcg/ml</option>
                  <option value="UI/ml">UI/ml</option>
                </select>
                <input type="text" name="DuongDungThuocNN" placeholder="Đường Dùng" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.DuongDungThuocNN}/>
                <input type="text" name="NgayBatDauThuocNN" placeholder="Ngày Bắt đầu" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.NgayBatDauThuocNN}/>
                <input type="text" name="NgayKetThucThuocNN" placeholder="Ngày Kết thúc" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.NgayKetThucThuocNN}/>
                <input type="text" name="HamLuongThuocNN" placeholder="Hàm lượng thuốc" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.HamLuongThuocNN}/>
                <select name="DonViHamLuongThuocNN" onChange={this.handleSelected} value={this.state.thuocNghiNgoADRModalState.DonViHamLuongThuocNN}>
                  <option value="G">G</option>
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="ng">ng</option>
                  <option value="UI">UI</option>
                  <option value="g/l">g/l</option>
                  <option value="mg/ml">mg/ml</option>
                  <option value="mcg/ml">mcg/ml</option>
                  <option value="UI/ml">UI/ml</option>
                </select>
                <input type="text" name="SoLoThuocNN" placeholder="Số Lô" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.SoLoThuocNN}/>
                <input type="text" name="SoLanDungThuocNN" placeholder="Số lần sử dụng thuốc" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.SoLanDungThuocNN}/>Lần/
                <select name="DonViSoLanDungThuocNN" onChange={this.handleSelected} value={this.state.thuocNghiNgoADRModalState.DonViSoLanDungThuocNN}>
                  <option value="Ngày">Ngày</option>
                  <option value="Tuần">Tuần</option>
                  <option value="Tháng">Tháng</option>
                </select>
                <input type="text" name="LyDoDungThuocNN" placeholder="Lý do sử dụng thuốc" onChange={this.handleInput} value={this.state.thuocNghiNgoADRModalState.LyDoDungThuocNN}/>
                <label >
                  10. Sau khi ngừng/giảm liều thuốc nghi ngờ, phản ứng có được cải thiện không?
                </label>
                <input id="opt14.1" name="PhanUngSauDungThuocNN" type="radio" value="Có" defaultChecked={ this.state.thuocNghiNgoADRModalState.PhanUngSauDungThuocNN==="Có" } onChange={this.handleChangeRadio}/><span lang="en-us"> Có</span>
                <input id="opt14.2" name="PhanUngSauDungThuocNN" type="radio" value="Không" defaultChecked={ this.state.thuocNghiNgoADRModalState.PhanUngSauDungThuocNN==="Không" } onChange={this.handleChangeRadio}/><span lang="en-us"> Không</span>
                <input id="opt14.3" name="PhanUngSauDungThuocNN" type="radio" value="Không ngừng/Giảm liều" defaultChecked={ this.state.thuocNghiNgoADRModalState.PhanUngSauDungThuocNN==="Không ngừng/Giảm liều" } onChange={this.handleChangeRadio}/><span lang="en-us"> Không ngừng/Giảm liều</span>
                <input id="opt14.4" name="PhanUngSauDungThuocNN" type="radio" value="Không có thông tin" defaultChecked={ this.state.thuocNghiNgoADRModalState.PhanUngSauDungThuocNN==="Không có thông tin" } onChange={this.handleChangeRadio}/><span lang="en-us"> Không có thông tin</span>
                <label >
                <br/>
                <br/>
                <br/>
                  11. Tái sử dụng thuốc bị nghi ngờ có xuất hiên lại phản ứng không?
                </label>
                <input id="opt15.1" name="PhanUngTaiSDThuocNN" type="radio" defaultChecked={ this.state.thuocNghiNgoADRModalState.PhanUngTaiSDThuocNN==="Có" } onChange={this.handleChangeRadio} value="Có"/><span lang="en-us"> Có</span>
                <input id="opt15.2" name="PhanUngTaiSDThuocNN" type="radio" defaultChecked={ this.state.thuocNghiNgoADRModalState.PhanUngTaiSDThuocNN==="Không" } onChange={this.handleChangeRadio} value="Không"/><span lang="en-us"> Không</span>
                <input id="opt15.3" name="PhanUngTaiSDThuocNN" type="radio" defaultChecked={ this.state.thuocNghiNgoADRModalState.PhanUngTaiSDThuocNN==="Không tái sử dụng" } onChange={this.handleChangeRadio} value="Không tái sử dụng"/><span lang="en-us"> Không tái sử dụng</span>
                <input id="opt15.4" name="PhanUngTaiSDThuocNN" type="radio" defaultChecked={ this.state.thuocNghiNgoADRModalState.PhanUngTaiSDThuocNN==="Không có thông tin" } onChange={this.handleChangeRadio} value="Không có thông tin" /><span lang="en-us"> Không có thông tin</span>
              </div>
              <input type="button" className="button" value="Thêm mới" onClick={this.updateModal1}/>
              {/* <Button type="primary" customStyle={{"display": "block", "margin": "0 auto 20px"}} onClick={this.updateModal1}>Cập nhật</Button> */}
            </div>
          </div>
        </Modal>
        <Modal id="thuoc-dung-chung-modal" visible={this.state.visibleModal2} dialogClassName="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close-button" onClick={this.closeModal2}/>
              <span className="title">Nhập Thuốc dùng đồng thời</span>
              <div className="content">
                <input type="text" name="TenThuocDDD" placeholder="Tên thuốc dùng đồng thời" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.TenThuocDDD}/>
                <input type="text" name="DangBaoCheThuocDDD" placeholder="Dạng bào chế" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.DangBaoCheThuocDDD}/>
                <input type="text" name="NhaSanXuatThuocDDD" placeholder="Nhà Sản Xuất Thuốc" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.NhaSanXuatThuocDDD}/>
                <input type="text" name="LieuDungMotLanThuocDDD" placeholder="Liều Dùng Một Lần" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.LieuDungMotLanThuocDDD}/>
                <select name="DonViLieuDungMotLanThuocDDD" onChange={this.handleSelected} value={this.state.thuocDungDongThoiADRModalState.DonViLieuDungMotLanThuocDDD}>
                  <option value="G">G</option>
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="ng">ng</option>
                  <option value="UI">UI</option>
                  <option value="g/l">g/l</option>
                  <option value="mg/ml">mg/ml</option>
                  <option value="mcg/ml">mcg/ml</option>
                  <option value="UI/ml">UI/ml</option>
                </select>
                <input type="text" name="DuongDungThuocDDD" placeholder="Đường Dùng" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.DuongDungThuocDDD}/>
                <input type="text" name="NgayBatDauThuocDDD" placeholder="Ngày Bắt đầu" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.NgayBatDauThuocDDD}/>
                <input type="text" name="NgayKetThucThuocDDD" placeholder="Ngày Kết thúc" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.NgayKetThucThuocDDD}/>
                <input type="text" name="HamLuongThuocDDD" placeholder="Hàm lượng thuốc" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.HamLuongThuocDDD}/>
                <select name="DonViHamLuongThuocDDD" onChange={this.handleSelected} value={this.state.thuocDungDongThoiADRModalState.DonViHamLuongThuocDDD}>
                  <option value="G">G</option>
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="ng">ng</option>
                  <option value="UI">UI</option>
                  <option value="g/l">g/l</option>
                  <option value="mg/ml">mg/ml</option>
                  <option value="mcg/ml">mcg/ml</option>
                  <option value="UI/ml">UI/ml</option>
                </select>
                <input type="text" name="SoLoThuocDDD" placeholder="Số Lô" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.SoLoThuocDDD}/>
                <input type="text" name="SoLanDungThuocDDD" placeholder="Số lần sử dụng thuốc" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.SoLanDungThuocDDD}/>Lần/
                <select name="DonViSoLanDungThuocDDD" onChange={this.handleSelected} value={this.state.thuocDungDongThoiADRModalState.DonViSoLanDungThuocDDD}>
                  <option value="Ngày">Ngày</option>
                  <option value="Tuần">Tuần</option>
                  <option value="Tháng">Tháng</option>
                </select>
                <input type="text" name="LyDoDungThuocDDD" placeholder="Lý do sử dụng thuốc" onChange={this.handleInput} value={this.state.thuocDungDongThoiADRModalState.LyDoDungThuocDDD}/>
              </div>
              <input type="button" className="button" value="Thêm mới" onClick={this.updateModal2}/>
              {/* <Button type="primary" customStyle={{"display": "block", "margin": "0 auto 20px"}} onClick={this.updateModal1}>Cập nhật</Button> */}
            </div>
          </div>
        </Modal>
        <Modal id="add-database-blockchain-modal" visible={this.state.visibleModalReviewersAndReferences} dialogClassName="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close-button" onClick={this.closeModalReviewersAndReferences}/>
              <div className="content">
                <textarea onChange={this.handleInput} placeholder="Danh sách địa chỉ người đánh giá" name="reviewers" style={{ width: "98%", float: "left" }} rows="8" value={this.state.reviewers} />
                <textarea onChange={this.handleInput} placeholder="Danh sách tài liệu tham khảo" name="references" style={{ width: "98%", float: "left" }} rows="8" value={this.state.references} />
              </div>
              <input type="button" className="button" value="Thêm mới" onClick={this.updateModalReviewersAndReferences}/>
              {/* <Button type="primary" customStyle={{"display": "block", "margin": "0 auto 20px"}} onClick={this.updateModal1}>Cập nhật</Button> */}
            </div>
          </div>
        </Modal>
        <Modal visible={this.state.visibleModalDone} dialogClassName="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close-button" onClick={this.closeModalDone}/>
              <div className="content">
              <span className="title">{this.state.messageDone}</span>
              </div>
              <input type="button" className="button" value="Đóng" onClick={this.closeModalDone}/>
              {/* <Button type="primary" customStyle={{"display": "block", "margin": "0 auto 20px"}} onClick={this.updateModal1}>Cập nhật</Button> */}
            </div>
          </div>
        </Modal>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  blockchain: state.blockchain,
});

const mapDispatchToProps = dispatch => ({
  saveAdrReport: (options, callback) => dispatch(saveAdrReport(options, callback)),
  updateMessageStatus: (options, callback) => dispatch(updateMessageStatus(options, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewReport);