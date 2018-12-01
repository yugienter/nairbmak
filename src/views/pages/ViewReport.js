import React from "react";
import { connect } from "react-redux";
import { getAdrReport } from "../../redux/actions/adrReport.action.js";

import "static/styles/contentForm.css";
import TopActionsBar from 'views/components/core/TopActionsBar';
import { updateMessageStatus } from 'redux/actions/ui.action';

import Metamask from 'blockchain/libs/metamask';
import Database from 'blockchain/libs/database';
import Modal from 'react-bootstrap4-modal';
import config from 'config';

class ViewReport extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.metamask = new Metamask();
    this.database = new Database(config.eth.DATABASE.ADDRESS, this.metamask.web3);

    this.state = {
      inputHashData: '',
      visibleModalScore:false,
      visibleModalClose:false,
      messageModalClose:'',
      inputNumberClose:'',
      selectNumber:10,
      inputNumber:0
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

  handleInputHashData = e => {
    let { value } = e.target;
    this.setState({inputHashData: value});
  };

  showData = () => {
    console.log(this.state.inputHashData);
    this.props.getAdrReport({
      hash: this.state.inputHashData
    })
  }

  handleClickBtnScore = (e) => {
    e.preventDefault();
    this.setState({visibleModalScore : true});
  };

  closeModalScore = () => {
    this.setState({visibleModalScore : false});
  }

  handleNumber = e => {
    let { name, value } = e.target;
    this.setState({ [name] : value});
  };

  handleClickBtnClose = (e) => {
    e.preventDefault();
    this.setState({visibleModalClose : true});
  };

  closeModalClose = () => {
    this.setState({visibleModalClose : false});
  }

  handleModalClose = () => {
    this.database.closeReport(this.state.inputNumberClose)
      .then(re => {
        console.log(re);
        this.setState({messageModalClose : "Thành công."});
      })
      .catch(err => {
        console.log(err);
        this.setState({messageModalClose : "Đã có lỗi xảy ra."});
      })
  }

  render() {
    return (
      <div id="site_wrapper">
        <div className="site-upper">
          {this.props.header}
          <TopActionsBar />
        </div>
        <main className="main bg-white">
          <a className="fab-buy" href="#">
            Buy
          </a>
          <a className="fab-score" href="#" onClick={this.handleClickBtnScore}>
            Score
          </a>
          <a className="fab-close" href="#" onClick={this.handleClickBtnClose}>
            Close
          </a>
          <div id="wrap-form">
              <input name="inputHashData" style={{ width: "40%" }} type="text" onChange={this.handleInputHashData} value={this.state.inputHashData} />
              <input type="button" className="button" value="Load data" onClick={this.showData}/>
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
                                      <input id="DateADR" name="DateADR" style={{ width: "120px" }} type="text" onChange={this.handleInput} className="datepicker hasDatepicker" value={this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DateADR : ''} />
                                  </td>
                                  <td>
                                      <label style={{ width: "300px", float: "left" }}>
                                          2. Phản ứng xuất hiện sau bao lâu:
                                          <br />
                                          <em>
                                  (Tính từ lần dùng cuối cùng của thuốc nghi ngờ)
                                </em>
                                      </label>
                                      <input id="DurationADR" name="DurationADR" style={{ width: "40px" }} type="text" onChange={this.handleInput} value={this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DurationADR : ''} />
                                      <label>Đơn vị tính</label>
                                      <select id="DVTDuration" name="DVTDuration" value={this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DVTDuration:''} onChange={this.handleSelected}>
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
                                      <textarea onChange={this.handleInput} id="DescriptionsADR" name="DescriptionsADR" style={{ width: "98%", float: "left" }} rows="18" className="required" value={this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DescriptionsADR : ''} />
                                  </td>
                                  <td valign="top">
                                      <label>4. Các xét nghiệm liên quan đến phản ứng</label>
                                      <textarea onChange={this.handleInput} id="XetNghiemADR" name="XetNghiemADR" style={{ width: "97%", float: "left" }} rows="4" value={this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.XetNghiemADR : ''} />
                                  </td>
                              </tr>
                              <tr>
                                  <td valign="top">
                                      <label>5. Tiền sử:</label>
                                      <textarea onChange={this.handleInput} id="TienSuADR" name="TienSuADR" style={{ width: "97%", float: "left" }} rows="2" value={this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.TienSuADR : ''} />
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <label>6. Cách xử trí phản ứng</label>
                                      <textarea onChange={this.handleInput} id="XuTriADR" name="XuTriADR" style={{ width: "97%", float: "left" }} rows="4" value={this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.XuTriADR : ''} />
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
                                      <input id="opt11.1" name="DoNghiemTrongADR" type="radio" value="vong" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DoNghiemTrongADR==="Tử vong" : false} onChange={this.handleChangeRadio} />{" "}
                                      <span lang="en-us">Tử vong</span>
                                  </td>
                                  <td>
                                      <input id="opt11.2" name="DoNghiemTrongADR" type="radio" value="Nhập viện/Kéo dài thời gian nằm viện" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DoNghiemTrongADR==="Nhập viện/Kéo dài thời gian nằm viện" : false } onChange={this.handleChangeRadio} />
                                      <span>Nhập viện/Kéo dài thời gian nằm viện</span>
                                  </td>
                                  <td>
                                      <input id="opt11.3" name="DoNghiemTrongADR" type="radio" value="Dị tật thai nhi" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DoNghiemTrongADR==="Dị tật thai nhi" : false } onChange={this.handleChangeRadio} />{" "}
                                      <span>Dị tật thai nhi</span>
                                  </td>
                                  <td rowSpan="2" style={{ width: "150px", verticalAlign: "top" }}>
                                      <input id="opt11.4" name="DoNghiemTrongADR" type="radio" value="Không rõ" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DoNghiemTrongADR==="Không rõ"  : false} onChange={this.handleChangeRadio} />{" "}
                                      <span>Không rõ</span>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <input id="opt11.5" name="DoNghiemTrongADR" type="radio" value="Đe dọa tính mạng" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DoNghiemTrongADR==="Đe dọa tính mạng"  : false} onChange={this.handleChangeRadio} />{" "}
                                      <span>Đe dọa tính mạng</span>
                                  </td>
                                  <td>
                                      <input id="opt11.6" name="DoNghiemTrongADR" type="radio" value="Tàn tật vĩnh viễn/nặng nề" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DoNghiemTrongADR==="Tàn tật vĩnh viễn/nặng nề" : false } onChange={this.handleChangeRadio} />
                                      <span>Tàn tật vĩnh viễn/nặng nề</span>
                                  </td>
                                  <td>
                                      <input id="opt11.7" name="DoNghiemTrongADR" type="radio" value="Không nghiêm trọng" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.DoNghiemTrongADR==="Không nghiêm trọng" : false} onChange={this.handleChangeRadio} />{" "}
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
                                      <input id="opt12.1" name="KetQuaXuTriADR" type="radio" value="Tử vong do ADR" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.KetQuaXuTriADR==="Tử vong do ADR"  : false} onChange={this.handleChangeRadio} />{" "}
                                      <span lang="en-us">Tử vong do ADR</span>
                                  </td>
                                  <td>
                                      <input id="opt12.2" name="KetQuaXuTriADR" type="radio" value="Chưa hồi phục" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.KetQuaXuTriADR==="Chưa hồi phục"  : false} onChange={this.handleChangeRadio} />
                                      <span>Chưa hồi phục </span>
                                  </td>
                                  <td>
                                      <input id="opt12.3" name="KetQuaXuTriADR" type="radio" value="Hồi phục có di chứng" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.KetQuaXuTriADR==="Hồi phục có di chứng" : false} onChange={this.handleChangeRadio} />{" "}
                                      <span>Hồi phục có di chứng</span>
                                  </td>
                                  <td rowSpan="2" style={{ width: "150px", verticalAlign: "top" }}>
                                      <input id="opt12.7" name="KetQuaXuTriADR" type="radio" value="Không rõ" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.KetQuaXuTriADR==="Không rõ"  : false} onChange={this.handleChangeRadio} />{" "}
                                      <span>Không rõ</span>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <input id="opt12.4" name="KetQuaXuTriADR" type="radio" value="Tử vong không liên quan đến thuốc" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.KetQuaXuTriADR==="Tử vong không liên quan đến thuốc"  : false} onChange={this.handleChangeRadio} />{" "}
                                      <span>Tử vong không liên quan đến thuốc</span>
                                  </td>
                                  <td>
                                      <input id="opt12.5" name="KetQuaXuTriADR" type="radio" value="Đang hồi phục" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.KetQuaXuTriADR==="Đang hồi phục"  : false} onChange={this.handleChangeRadio} />
                                      <span>Đang hồi phục</span>
                                  </td>
                                  <td>
                                      <input id="opt12.6" name="KetQuaXuTriADR" type="radio" value="Hồi phục không có di chứng" defaultChecked={ this.props.phanUngCoHaiADR ? this.props.phanUngCoHaiADR.KetQuaXuTriADR==="Hồi phục không có di chứng" : false } onChange={this.handleChangeRadio} />{" "}
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
                                this.props.thuocNghiNgoADR ?
                                this.props.thuocNghiNgoADR.map((item,index) => {
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
                                : null
                              }
                              </tbody>
                          </table>
                          <p className="bt">
                              {/* <Button type="primary" customStyle={{ "display": "block", "margin": "0 auto 20px"}} onClick={e=> (e.preventDefault(), this.openModal1())} >Thêm mới</Button> */}
                              {/* <input type="button" className="button" value="Thêm mới" onClick={this.openModal1}/> */}
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
                                this.props.thuocDungDongThoiADR ?
                                this.props.thuocDungDongThoiADR.map((item,index) => {
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
                                :null
                              }
                              </tbody>
                          </table>
                          <p className="bt">
                            {/* <Button type="primary" customStyle={{ "display": "block", "margin": "0 auto 20px"}} onClick={e=> (e.preventDefault(), this.openModal1())} >Thêm mới</Button> */}
                              {/* <input type="button" className="button" value="Thêm mới" onClick={this.openModal2}/> */}
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
                                      <input id="opt17_1" name="DanhGiaMLQ" type="radio" value="Chắc chắn" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.DanhGiaMLQ==="Chắc chắn" :false} onChange={this.handleChangeRadio} /> Chắc chắn
                                  </td>
                                  <td style={{ width: "200px" }}>
                                      <input id="opt17_2" name="DanhGiaMLQ" type="radio" value="Không chắc chắn" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.DanhGiaMLQ==="Không chắc chắn" :false} onChange={this.handleChangeRadio} /> Không chắc chắn
                                  </td>
                                  <td rowSpan="2" style={{ verticalAlign: "top" }}>
                                      <input id="opt17_3" name="DanhGiaMLQ" type="radio" value="Khác" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.DanhGiaMLQ==="Khác":false } onChange={this.handleChangeRadio} /> Khác
                                      <br />
                                      <textarea onChange={this.handleInput} id="txtDanhGiaMLQ" name="txtDanhGiaMLQ" cols="50" rows="3" />
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <input id="opt17_4" name="DanhGiaMLQ" type="radio" value="Có khả năng" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.DanhGiaMLQ==="Có khả năng":false } onChange={this.handleChangeRadio} /> Có khả năng
                                  </td>
                                  <td>
                                      <input id="opt17_5" name="DanhGiaMLQ" type="radio" value="Chưa phân loại" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.DanhGiaMLQ==="Chưa phân loại":false } onChange={this.handleChangeRadio} /> Chưa phân loại
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <input id="opt17_6" name="DanhGiaMLQ" type="radio" value="Có thể" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.DanhGiaMLQ==="Có thể":false } onChange={this.handleChangeRadio} /> Có thể
                                  </td>
                                  <td>
                                      <input id="opt17_7" name="DanhGiaMLQ" type="radio" value="Không thể phân loại" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.DanhGiaMLQ==="Không thể phân loại":false } onChange={this.handleChangeRadio} /> Không thể phân loại
                                  </td>
                                  <td>
                                      <input id="opt17_8" name="DanhGiaMLQ" type="radio" value="Chưa đánh giá" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.DanhGiaMLQ==="Chưa đánh giá":false } onChange={this.handleChangeRadio} /> Chưa đánh giá
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
                                      <input id="opt18.1" name="ThangADR" type="radio" value="Thang WHO" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.ThangADR==="Thang WHO":false } onChange={this.handleChangeRadio} /> Thang WHO
                                  </td>
                                  <td style={{ width: "200px" }}>
                                      <input id="opt18.2" name="ThangADR" type="radio" value="Thang Naranjo" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.ThangADR==="Thang Naranjo":false } onChange={this.handleChangeRadio} /> Thang Naranjo
                                  </td>
                                  <td style={{ verticalAlign: "top" }}>
                                      <input id="opt18.3" name="ThangADR" type="radio" value="Thang khác" defaultChecked={ this.props.thamdinhADR ? this.props.thamdinhADR.ThangADR !=="Thang WHO" && this.props.thamdinhADR.ThangADR !=="Thang Naranjo"  : false} onChange={this.handleChangeRadio} /> Thang khác
                                      <input id="txtThangADR" name="ThangADR" type="text" onChange={this.handleInput} value={this.props.thamdinhADR ? this.props.thamdinhADR.ThangADR : ''}  style={{ width: "150px" }} />
                                  </td>
                                  <td style={{ width: "150px" }}>
                                      <input id="opt18.4" name="ThangADR" type="radio" value="Chưa thẩm định" defaultChecked={ this.props.thamdinhADR?this.props.thamdinhADR.ThangADR==="Chưa thẩm định":false } onChange={this.handleChangeRadio} /> Chưa thẩm định
                                  </td>
                              </tr>
                              <tr>
                                  <td colSpan="4">
                                      15. Phần bình luận của cán bộ y tế (nếu có)
                                  </td>
                              </tr>
                              <tr>
                                  <td colSpan="4">
                                      <textarea onChange={this.handleInput} id="txt19" name="BinhLuan" value={this.props.thamdinhADR ? this.props.thamdinhADR.BinhLuan:""} style={{ width: "97%" }} rows="4" />
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
                                      <input id="HoTenNG" name="HoTenNG" type="text" onChange={this.handleInput} style={{ width: "160px" }} className="required" value={this.props.thongTinNguoiThamDinh ? this.props.thongTinNguoiThamDinh.HoTenNG : ''} />
                                  </td>
                                  <td style={{ textAlign: "right" }}>Nghề nghiệp:</td>
                                  <td>
                                      <select id="NgheNghiepNG" name="NgheNghiepNG" value={this.props.thongTinNguoiThamDinh ? this.props.thongTinNguoiThamDinh.NgheNghiepNG : ''} onChange={this.handleSelected}>
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
                                      <input type="text" onChange={this.handleInput} id="EmailNG" name="EmailNG" style={{ width: "160px" }} value={this.props.thongTinNguoiThamDinh ? this.props.thongTinNguoiThamDinh.EmailNG : ''} />
                                  </td>
                              </tr>
                              <tr>
                                  <td style={{ textAlign: "left" }}>Điện thoại:</td>
                                  <td>
                                      <input id="PhoneNumberNG" name="PhoneNumberNG" type="text" onChange={this.handleInput} value={this.props.thongTinNguoiThamDinh ? this.props.thongTinNguoiThamDinh.PhoneNumberNG : ''} />
                                  </td>

                                  <td style={{ textAlign: "right" }}>17.Dạng báo cáo:</td>
                                  <td>
                                      <input id="Radio23" name="ReportType" type="radio" value="Báo cáo lần đầu" defaultChecked={ this.props.thongTinNguoiThamDinh ? this.props.thongTinNguoiThamDinh.ReportType : ''==="Báo cáo lần đầu" } onChange={this.handleChangeRadio} /> Báo cáo lần đầu
                                      <input id="Radio24" name="ReportType" type="radio" value="Báo cáo bổ sung" defaultChecked={ this.props.thongTinNguoiThamDinh ? this.props.thongTinNguoiThamDinh.ReportType : ''==="Báo cáo bổ sung" } onChange={this.handleChangeRadio} /> Báo cáo bổ sung
                                  </td>
                                  <td style={{ textAlign: "right" }}>18.Ngày báo cáo: </td>
                                  <td>
                                      <input id="ReportDate" name="ReportDate" style={{ width: "70px" }} type="text" onChange={this.handleInput} className="datepicker hasDatepicker" value={this.props.thongTinNguoiThamDinh ? this.props.thongTinNguoiThamDinh.ReportDate : ''} />
                                      <img className="ui-datepicker-trigger" src="/Content/images/calendar.gif" alt="..." title="..." />
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      19. Tên đơn vị báo cáo:
                                      <span style={{ color: "Red" }}>*</span>
                                  </td>
                                  <td colSpan="2">
                                      <input type="text" onChange={this.handleInput} id="TenDonVi" name="TenDonVi" style={{ width: "250px" }} value={this.props.thongTinNguoiThamDinh ? this.props.thongTinNguoiThamDinh.TenDonVi : ''} className="required" />
                                  </td>
                                  <td align="right">Địa chỉ đơn vị báo cáo:</td>
                                  <td colSpan="2">
                                      <input type="text" onChange={this.handleInput} id="DiaChiDV" name="DiaChiDV" style={{ width: "250px" }} value={this.props.thongTinNguoiThamDinh ? this.props.thongTinNguoiThamDinh.DiaChiDV : ''} />
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  {/* <p className="bt-end-form">
                      <input type="button" className="button" value="Nộp báo cáo" onClick={this.submitForm}/>

                  </p> */}
                  <input type="hidden" name="ThuocNghiNgoJson" id="ThuocNghiNgoJson" />
                  <input type="hidden" name="ThuocDongThoiJson" id="ThuocDongThoiJson" />
              </form>
          </div>
          <Modal visible={this.state.visibleModalScore} dialogClassName="modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="close-button" onClick={this.closeModalScore}/>
                <div className="content">
                {/* <span className="title">{this.state.messageDone}</span> */}
                <select name="selectNumber" onChange={this.handleNumber} value={this.state.selectNumber}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
                <input type="text" name="inputNumber" style={{ width: "98%", float: "left" }} placeholder="Just input from 0 to 60" value={this.state.inputNumber} onChange={this.handleNumber} />

                </div>
                <input type="button" className="button" value="Score" onClick={this.closeModalScore}/>
                {/* <Button type="primary" customStyle={{"display": "block", "margin": "0 auto 20px"}} onClick={this.updateModal1}>Cập nhật</Button> */}
              </div>
            </div>
          </Modal>
          <Modal visible={this.state.visibleModalClose} dialogClassName="modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="close-button" onClick={this.closeModalClose}/>
                <div className="content">
                {this.state.messageModalClose
                ?
                <span className="title">{this.state.messageModalClose}</span>
                :
                <input type="text" name="inputNumberClose" style={{ width: "98%", float: "left" }} placeholder="Just input number" value={this.state.inputNumberClose} onChange={this.handleNumber} />
              }
                </div>
                <input type="button" className="button" value="Close" onClick={this.handleModalClose}/>
                {/* <Button type="primary" customStyle={{"display": "block", "margin": "0 auto 20px"}} onClick={this.updateModal1}>Cập nhật</Button> */}
              </div>
            </div>
          </Modal>
        </main>
        {this.props.footer}
      </div>

    );
  }
}

const mapStateToProps = state => ({
  blockchain: state.blockchain,
  ...state.adrReport.report.publicInfo
});

const mapDispatchToProps = dispatch => ({
  getAdrReport: (options, callback) => dispatch(getAdrReport(options, callback)),
  updateMessageStatus: (options, callback) => dispatch(updateMessageStatus(options, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewReport);