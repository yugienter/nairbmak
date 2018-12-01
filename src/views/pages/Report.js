
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sampleAction } from 'redux/actions/sample.action.js';
import 'static/styles/contentForm.css';

class Report extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoaded: true
    };
    console.log(props);
  }

  componentDidMount() {

  }

  render() {
    return <div id="site_wrapper">
      <div className="site-upper">
        {this.props.header}
      </div>
      <main className='main bg-white'>
        <div id="wrap-form">
          <form id="myform" action="/Programs/ADRReport/ADRReport/Update/0" enctype="multipart/form-data">
              <div className="boxes-form" id="box2">
                  <h2 className="title-boxesForm">II. THÔNG TIN VỀ PHẢN ỨNG CÓ HẠI (ADR)</h2>
                  <table width="100%">
                  <tbody>
                    <tr>
                      <td width="45%">
                          <label style={{width:"200px", float:"left"}}>5. Ngày xuất hiện phản ứng:</label>
                          <input id="DateADR" name="DateADR" style={{width:"80px"}} type="text" className="datepicker hasDatepicker" value=""/>
                      </td>
                      <td>
                          <label style={{width: "300px", float: "left"}}>6. Phản ứng xuất hiện sau bao lâu:<br/><em>(Tính từ lần dùng cuối cùng của thuốc nghi ngờ)</em>
                          </label>
                          <input id="DurationADR" name="DurationADR" style={{width: "40px"}} type="text" value="0"/>
                          <label>Đơn vị tính</label>
                          <select id="DVTDuration" name="DVTDuration">
                              <option value="Giây" selected="selected">Giây</option>
                              <option value="Phút">Phút</option>
                              <option value="Giờ">Giờ</option>
                          </select>
                      </td>
                  </tr>
                  <tr>
                      <td rowspan="4">
                        <label>7. Mô tả biểu hiện ADR</label><span style={{color:"Red"}}>*</span><textarea id="DescriptionsADR" name="DescriptionsADR" style={{width:"98%", float:"left"}} rows="18" className="required"></textarea>
                      </td>
                      <td valign="top">
                        <label>8. Các xét nghiệm liên quan đến phản ứng</label><textarea id="XetNghiemADR" name="XetNghiemADR" style={{width:"97%", float:"left"}} rows="4"></textarea>
                      </td>
                  </tr>
                  <tr>
                      <td valign="top">
                        <label>Đính kèm file xét nghiệm(nếu có)</label>
                        <input type="file" name="XetNghiemADRFile"/>
                      </td>
                  </tr>
                  <tr>
                      <td valign="top">
                          <label>9. Tiền sử:</label>
                          <textarea id="TienSuADR" name="TienSuADR" style={{width:"97%", float:"left"}} rows="2"></textarea>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <label>10. Cách xử trí phản ứng</label><textarea id="XuTriADR" name="XuTriADR" style={{width:"97%", float:"left"}} rows="4"></textarea>
                      </td>
                  </tr>
                  </tbody></table>

                      <p>
                          <label style={{width:"25%", float:"left"}}>11. Mức độ nghiêm trọng của phản ứng:</label>
                      </p>
                      <table>
                          <tbody><tr>
                              <td><input id="opt11.1" name="DoNghiemTrongADR" type="radio" value="Tử vong"/> <span lang="en-us">Tử vong</span></td>
                              <td><input id="opt11.2" name="DoNghiemTrongADR" type="radio" value="Nhập viện/Kéo dài thời gian nằm viện"/><span>Nhập viện/Kéo dài thời gian nằm viện</span></td>
                              <td><input id="opt11.3" name="DoNghiemTrongADR" type="radio" value="Dị tật thai nhi"/> <span>Dị tật thai nhi</span></td>
                              <td rowspan="2" style={{width:"150px", verticalAlign:"top"}}><input id="opt11.4" name="DoNghiemTrongADR" type="radio" value="Không rõ" checked="checked"/> <span>Không rõ</span></td>
                          </tr>
                          <tr>
                              <td><input id="opt11.5" name="DoNghiemTrongADR" type="radio" value="Đe dọa tính mạng"/> <span>Đe dọa tính mạng</span></td>
                              <td><input id="opt11.6" name="DoNghiemTrongADR" type="radio" value="Tàn tật vĩnh viễn/nặng nề"/><span>Tàn tật vĩnh viễn/nặng nề</span></td>
                              <td><input id="opt11.7" name="DoNghiemTrongADR" type="radio" value="Không nghiêm trọng"/> <span>Không nghiêm trọng</span></td>
                          </tr>
                      </tbody></table>
                      <hr/>
                      <p>
                          <label style={{width:"250px", float:"left"}}>12. Kết quả sau khi xử trí phản ứng:</label>
                      </p>

                      <table>
                        <tbody>
                          <tr>
                            <td><input id="opt12.1" name="KetQuaXuTriADR" type="radio" value="Tử vong do ADR"/> <span lang="en-us">Tử vong do ADR</span></td>
                            <td><input id="opt12.2" name="KetQuaXuTriADR" type="radio" value="Chưa hồi phục"/><span>Chưa hồi phục </span></td>
                            <td><input id="opt12.3" name="KetQuaXuTriADR" type="radio" value="Hồi phục có di chứng"/> <span>Hồi phục có di chứng</span></td>
                            <td rowspan="2" style={{width:"150px", verticalAlign:"top"}}><input id="opt12.7" name="KetQuaXuTriADR" type="radio" value="Không rõ" checked="checked"/> <span>Không rõ</span></td>
                          </tr>
                          <tr>
                            <td><input id="opt12.4" name="KetQuaXuTriADR" type="radio" value="Tử vong không liên quan đến thuốc"/> <span>Tử vong không liên quan đến thuốc</span></td>
                            <td><input id="opt12.5" name="KetQuaXuTriADR" type="radio" value="Đang hồi phục"/><span>Đang hồi phục</span></td>
                            <td><input id="opt12.6" name="KetQuaXuTriADR" type="radio" value="Hồi phục không có di chứng"/> <span>Hồi phục không có di chứng</span></td>
                          </tr>
                        </tbody>
                      </table>
              </div>

              <div className="boxes-form" id="Div1">
                <h2 className="title-boxesForm">III. THÔNG TIN VỀ THUỐC NGHI NGỜ GÂY ADR</h2>
                <h3>13. Thuốc nghi ngờ gây phản ứng</h3>

                <table width="100%" border="1" className="grid" id="tblIII">
                <thead>
                <tr className="row-top">
                {/* <th style ="display:none">id</th> */}
                <th width="150">Thuốc nghi ngờ</th>
                <th width="150">Dạng bào chế/hàm lượng</th>
                <th width="120">Liều dùng</th>
                <th width="70">Đường dùng</th>
                <th width="70">Ngày bắt đầu</th>
                <th width="70">Ngày kết thúc</th>
                <th width="150">Lý do dùng thuốc</th>
                <th width="30">sửa</th>
                <th width="30">Xóa</th>
                </tr>
                </thead>
                  <tbody id="tbody13">

                  </tbody>
                </table>
                <p className="bt">
                  <input id="btnAdd13" className="button" type="button" onclick="btnAdd13_click()" value="Thêm mới"/>
                </p>
                <div>
                  <h3>16. Các thuốc dùng đồng thời (Ngoại trừ các thuốc dùng điều trị/ khắc phục hậu quả của ADR)</h3>
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
                      <th width="30">sửa</th>
                      <th width="30">Xóa</th>
                  </tr>
                  </thead>
                  <tbody>
                  </tbody>
                  </table>
                  <p className="bt">
                    <input id="btnAdd16" className="button" type="button" onclick="btnAdd16_click()" value="Thêm mới"/>
                  </p>
                </div>
              </div>
              <div className="boxes-form">
                <h2 className="title-boxesForm">IV. PHẦN THẨM ĐỊNH ADR CỦA ĐƠN VỊ</h2>
                <table>
                  <tbody>
                    <tr>
                      <td colspan="3">17. Đánh giá mối liên quan giữa thuốc và ADR</td>
                    </tr>
                    <tr>
                      <td style={{width : "200px"}}>
                        <input id="opt17_1" name="DanhGiaMLQ" type="radio" value="Chắc chắn"/>Chắc chắn
                      </td>
                      <td style={{width : "200px"}}>
                        <input id="opt17_2" name="DanhGiaMLQ" type="radio" value="Không chắc chắn"/>Không chắc chắn
                      </td>
                      <td rowspan="2" style={{verticalAlign:"top"}}>
                        <input id="opt17_3" name="DanhGiaMLQ" type="radio" value="Khác"/>Khác
                        <br/>
                        <textarea id="txtDanhGiaMLQ" name="txtDanhGiaMLQ" cols="50" rows="3"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input id="opt17_4" name="DanhGiaMLQ" type="radio" value="Có khả năng"/>Có khả năng
                      </td>
                      <td>
                        <input id="opt17_5" name="DanhGiaMLQ" type="radio" value="Chưa phân loại"/>Chưa phân loại
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input id="opt17_6" name="DanhGiaMLQ" type="radio" value="Có thể"/>Có thể
                      </td>
                      <td>
                        <input id="opt17_7" name="DanhGiaMLQ" type="radio" value="Không thể phân loại"/>Không thể phân loại
                      </td>
                      <td>
                          <input id="opt17_8" name="DanhGiaMLQ" type="radio" value="Chưa đánh giá" checked="checked"/>Chưa đánh giá
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td colspan="4">18. Đơn vị thẩm định ADR theo thang nào?</td>
                    </tr>
                    <tr>
                      <td style={{width : "200px"}}>
                          <input id="opt18.1" name="ThangADR" type="radio" value="Thang WHO"/>Thang WHO</td>
                      <td style={{width : "200px"}}>
                          <input id="opt18.2" name="ThangADR" type="radio" value="Thang Naranjo"/>Thang Naranjo
                      </td>
                      <td style={{verticalAlign:"top"}}>
                      <input id="opt18.3" name="ThangADR" type="radio" value="Thang khác"/>Thang khác
                      <input id="txtThangADR" name="txtThangADR" type="text" style={{width:"150px"}}/>
                      </td>
                      <td style={{width : "150px"}}>
                          <input id="opt18.4" name="ThangADR" type="radio" value="Chưa thẩm định" checked="checked"/>Chưa thẩm định
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">19. Phần bình luận của cán bộ y tế (nếu có)</td>
                      </tr>
                      <tr>
                      <td colspan="4">
                      <textarea id="txt19" name="BinhLuan" style={{width : "97%"}} rows="4"></textarea>
                    </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="boxes-form">
                <h2 className="title-boxesForm">V. THÔNG TIN VỀ NGƯỜI/ĐƠN VỊ GỬI BÁO CÁO</h2>
                <table>
                    <tbody>
                      <tr>
                        <td style={{textAlign:"left",width:"100px"}}>20. Họ và Tên:<span style={{color:"Red"}}>*</span></td>
                        <td>
                          <input id="HoTenNG" name="HoTenNG" type="text" style={{width : "160px"}} className="required" value=""/>
                        </td>
                        <td style={{textAlign:"right"}}>Nghề nghiệp:</td>
                        <td>
                          <select id="NgheNghiepNG" name="NgheNghiepNG">
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
                        <td style={{textAlign:"right"}}>Email: </td>
                        <td>
                          <input type="text" id="EmailNG" name="EmailNG" style={{width : "160px"}} value=""/>
                        </td>
                      </tr>
                      <tr>
                        <td style={{textAlign:"left"}}>Điện thoại:</td>
                        <td>
                          <input id="PhoneNumberNG" name="PhoneNumberNG" type="text" value=""/>
                        </td>

                        <td style={{textAlign:"right"}}>21.Dạng báo cáo:</td>
                        <td>
                          <input id="Radio23" name="ReportType" type="radio" checked="checked" value="Báo cáo lần đầu"/>Báo cáo lần đầu
                          <input id="Radio24" name="ReportType" type="radio" value="Báo cáo bổ sung"/>Báo cáo bổ sung
                        </td>
                        <td style={{textAlign:"right"}}>22.Ngày báo cáo: </td>
                        <td>
                          <input id="ReportDate" name="ReportDate" style={{width : "70px"}} type="text" className="datepicker hasDatepicker" value="01/12/2018"/><img className="ui-datepicker-trigger" src="/Content/images/calendar.gif" alt="..." title="..."/>
                        </td>
                      </tr>
                    <tr>
                      <td>23. Tên đơn vị báo cáo:<span style={{color:"Red"}}>*</span></td>
                      <td colspan="2">
                        <input type="text" id="TenDonVi" name="TenDonVi" style={{width : "250px"}} value="" className="required"/>
                        </td>
                        <td align="right">Địa chỉ đơn vị báo cáo:</td>
                      <td colspan="2">
                        <input type="text" id="DiaChiDV" name="DiaChiDV" style={{width : "250px"}} value=""/>
                      </td>
                    </tr>
                </tbody></table>
              </div>
          <p className="bt-end-form">
            <input id="btnReview" className="button" type="button" value="Xem trước"/>
            <input id="SubmitForm" className="button" type="button" value="Nộp báo cáo"/>
            <input id="btnClearForm" className="button" type="reset" value="Nhập lại từ đầu" onclick="btnClearForm_click()"/>
          </p>
            <input type="hidden" name="ThuocNghiNgoJson" id="ThuocNghiNgoJson"/>
            <input type="hidden" name="ThuocDongThoiJson" id="ThuocDongThoiJson"/>
          </form>
        </div>
      </main>
      {this.props.footer}
    </div>;
  }
}

const mapStateToProps = state => ({
  sample: state.sample
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sampleAction
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Report));
