import { colorStyle, useCustomFonts } from "../assets/componentStyleSheet";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { vw, vh, vmax, vmin } from "react-native-expo-viewport-units";
import componentStyle from "../assets/componentStyleSheet";
import styles from "../assets/stylesheet";
import { gradientRectangle, jobNews1, marginBottomForScrollView, mostCompany, navTopBar, searchNav, suitableJob } from "../assets/component";
import { bookmark, clock, deletefitler, editable, heartDouble, searchIcon2 } from "../assets/svgXml";
import DATA from "../assets/DATA";
import { SearchBar } from "react-native-screens";

function NewJob({ navigation }) {
    const { currentUser } = DATA();

    const [showResult, setShowResult] = React.useState(false);

    const [HoiHoa, setHoiHoa] = React.useState(false);
    const [ThuCong, setThuCong] = React.useState(false);
    const [IT, setIT] = React.useState(false);
    const [PhaChe, setPhaChe] = React.useState(false);
    const [PhuBep, setPhuBep] = React.useState(false);
    const [TapVu, setTapVu] = React.useState(false);

    const [luongThoathuan, setLuongThoathuan] = React.useState(false);
    const [luong8den10, setLuong8den10] = React.useState(false);
    const [luong6den8, setLuong6den8] = React.useState(false);
    const [luong10den15, setLuong10den15] = React.useState(false);
    const [luongTren15, setLuongTren15] = React.useState(false);

    const [knKhongyeucau, setKnKhongyeucau] = React.useState(false);
    const [kn1nam, setKn1nam] = React.useState(false);
    const [kn6thang, setKn6thang] = React.useState(false);
    const [kn2nam, setKn2nam] = React.useState(false);

    const [KLCVnhe, setKLCVnhe] = React.useState(false);
    const [KLCVvua, setKLCVvua] = React.useState(false);
    const [KLCVnang, setKLCVnang] = React.useState(false);

    const [isBookmarked, setIsBookmarked] = React.useState(false);

    async function filterData() {
        const { job } = DATA();

        const nameFilter = [];
        if (HoiHoa) { nameFilter.push('HoiHoa') }
        if (ThuCong) { nameFilter.push("ThuCong") }
        if (IT) { nameFilter.push("IT") }
        if (PhaChe) { nameFilter.push("PhaChe") }
        if (PhuBep) { nameFilter.push("PhuBep") }
        if (TapVu) { nameFilter.push("TapVu") }

        const minSalary = [];
        const maxSalary = [];
        // if (luongThoathuan) { minSalary.push(0); maxSalary.push(10e10) }
        // if (luong8den10) { minSalary.push(8); maxSalary.push(10) }
        // if (luong6den8) { minSalary.push(6); maxSalary.push(8) }
        // if (luong10den15) { minSalary.push(10); maxSalary.push(15) }
        // if (luongTren15) { minSalary.push(15); maxSalary.push(100) }

        const exp = [];
        if (knKhongyeucau) { exp.push(0) }
        if (kn1nam) { exp.push(12) }
        if (kn6thang) { exp.push(6) }
        if (kn2nam) { exp.push(24) }

        const disableFilter = [];
        if (KLCVnhe) { disableFilter.push("Nhe") }
        if (KLCVvua) { disableFilter.push("Vua") }
        if (KLCVnang) { disableFilter.push("Nang") }

        let jobAfterFilter = job;
        // Filter job listings based on selected filters
        if (nameFilter.length > 1) {
            jobAfterFilter = jobAfterFilter.filter(job => {
                return job.acceptDisable.some(r => nameFilter.includes(r));
            });
        } else if (nameFilter.length === 1) {
            // If there's only one value in nameFilter, use the existing logic
            jobAfterFilter = jobAfterFilter.filter(job => {
                return job.acceptDisable.some(r => nameFilter.includes(r));
            });
        } else {
            // If nameFilter is empty, no filtering is needed
            // You can optionally handle a different case here
        }

        if (minSalary.length > 0 && maxSalary.length > 0) {
            jobAfterFilter = jobAfterFilter.filter(job => {
                return job.salaryJob >= Math.min(...minSalary) && job.salaryJob <= Math.max(...maxSalary);
            });
        }

        if (exp.length > 0) {
            jobAfterFilter = jobAfterFilter.filter(job => {
                return exp.includes(parseInt(job.expJob));
            });
        }

        if (disableFilter.length > 0) {
            jobAfterFilter = jobAfterFilter.filter(job => {
                return disableFilter.includes(job.typeJob);
            });
        }

        return jobAfterFilter;
    }

    function filter() {
        return (
            <View style={[styles.positionRelative, styles.marginTop6vw, styles.flex1]}>
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.borderRadius16, styles.wfit, styles.positionAbsolute, { zIndex: 1, gap: vw(2.5), paddingVertical: vw(2.5), paddingHorizontal: vw(5), backgroundColor: colorStyle.blue1, marginLeft: vw(6.5) }]}>
                    <Text style={[componentStyle.Os20Bold, { color: colorStyle.tan1, }]}>Bộ lọc thông minh</Text>
                </View>
                <View style={[styles.w100, styles.flex1, { borderTopLeftRadius: vw(7.5), borderTopWidth: vw(0.5), borderColor: colorStyle.blue1, borderLeftWidth: 1, top: vw(8), paddingHorizontal: vw(7.5), }]}>
                    <View style={{ marginTop: vw(5), }}>
                        <View style={{ paddingHorizontal: vw(2.5) }}><Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4 }]}>Lĩnh vực công việc:</Text></View>
                        <View style={[styles.flexRow, styles.flexWrap, styles.flex1, styles.shadowW0H025Color, { paddingHorizontal: vw(1.5), paddingBottom: vw(4), marginBottom: vw(5), gap: vw(2.5), marginTop: vw(4), rowGap: vw(2.5), backgroundColor: colorStyle.white, borderBottomEndRadius: vw(4) }]}>
                            <TouchableOpacity
                                onPress={() => { setHoiHoa(!HoiHoa) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: HoiHoa ? colorStyle.blue1 : null }}><Text style={[!HoiHoa ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: HoiHoa ? colorStyle.tan1 : colorStyle.black }]}>Hội hoạ</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setThuCong(!ThuCong) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: ThuCong ? colorStyle.blue1 : null }}><Text style={[!ThuCong ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: ThuCong ? colorStyle.tan1 : colorStyle.black }]}>Thủ công</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setIT(!IT) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: IT ? colorStyle.blue1 : null }}><Text style={[!IT ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: IT ? colorStyle.tan1 : colorStyle.black }]}>IT</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setPhaChe(!PhaChe) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: PhaChe ? colorStyle.blue1 : null }}><Text style={[!PhaChe ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: PhaChe ? colorStyle.tan1 : colorStyle.black }]}>Pha chế</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setPhuBep(!PhuBep) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: PhuBep ? colorStyle.blue1 : null }}><Text style={[!PhuBep ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: PhuBep ? colorStyle.tan1 : colorStyle.black }]}>Phụ bếp</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setTapVu(!TapVu) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: TapVu ? colorStyle.blue1 : null }}><Text style={[!TapVu ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: TapVu ? colorStyle.tan1 : colorStyle.black }]}>Tạp vụ</Text></TouchableOpacity>
                        </View>

                        <View style={{ paddingHorizontal: vw(2.5) }}><Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4 }]}>Mức lương:</Text></View>
                        <View style={[styles.flexRow, styles.flexWrap, styles.flex1, styles.shadowW0H025Color, { paddingHorizontal: vw(1.5), paddingBottom: vw(4), marginBottom: vw(5), gap: vw(2.5), marginTop: vw(4), rowGap: vw(2.5), backgroundColor: colorStyle.white, borderBottomEndRadius: vw(4) }]}>
                            <TouchableOpacity
                                onPress={() => { setLuongThoathuan(!luongThoathuan) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luongThoathuan ? colorStyle.blue1 : null }}><Text style={[!luongThoathuan ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luongThoathuan ? colorStyle.tan1 : colorStyle.black }]}>Thoả thuận</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setLuong8den10(!luong8den10) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luong8den10 ? colorStyle.blue1 : null }}><Text style={[!luong8den10 ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luong8den10 ? colorStyle.tan1 : colorStyle.black }]}>Từ 8 - 10 triệu</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setLuong6den8(!luong6den8) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luong6den8 ? colorStyle.blue1 : null }}><Text style={[!luong6den8 ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luong6den8 ? colorStyle.tan1 : colorStyle.black }]}>Từ 6 - 8 triệu</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setLuong10den15(!luong10den15) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luong10den15 ? colorStyle.blue1 : null }}><Text style={[!luong10den15 ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luong10den15 ? colorStyle.tan1 : colorStyle.black }]}>Từ 10 - 15 triệu</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setLuongTren15(!luongTren15) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luongTren15 ? colorStyle.blue1 : null }}><Text style={[!luongTren15 ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luongTren15 ? colorStyle.tan1 : colorStyle.black }]}>Trên 15 triệu</Text></TouchableOpacity>
                        </View>

                        <View style={{ paddingHorizontal: vw(2.5) }}><Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4 }]}>Kinh nghiệm:</Text></View>
                        <View style={[styles.flexRow, styles.flexWrap, styles.flex1, styles.shadowW0H025Color, { paddingHorizontal: vw(1.5), paddingBottom: vw(4), marginBottom: vw(5), gap: vw(2.5), marginTop: vw(4), rowGap: vw(2.5), backgroundColor: colorStyle.white, borderBottomEndRadius: vw(4) }]}>
                            <TouchableOpacity
                                onPress={() => { setKnKhongyeucau(!knKhongyeucau) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: knKhongyeucau ? colorStyle.blue1 : null }}><Text style={[!knKhongyeucau ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: knKhongyeucau ? colorStyle.tan1 : colorStyle.black }]}>Không yêu cầu</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKn1nam(!kn1nam) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: kn1nam ? colorStyle.blue1 : null }}><Text style={[!kn1nam ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: kn1nam ? colorStyle.tan1 : colorStyle.black }]}>{`> 1 năm`}</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKn6thang(!kn6thang) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: kn6thang ? colorStyle.blue1 : null }}><Text style={[!kn6thang ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: kn6thang ? colorStyle.tan1 : colorStyle.black }]}>{`> 6 tháng`}</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKn2nam(!kn2nam) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: kn2nam ? colorStyle.blue1 : null }}><Text style={[!kn2nam ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: kn2nam ? colorStyle.tan1 : colorStyle.black }]}>{`> 2 năm`}</Text></TouchableOpacity>
                        </View>

                        <View style={{ paddingHorizontal: vw(2.5) }}><Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4 }]}>Khối lượng công việc:</Text></View>
                        <View style={[styles.flexRow, styles.flexWrap, styles.flex1, styles.shadowW0H025Color, { paddingHorizontal: vw(1.5), paddingBottom: vw(4), marginBottom: vw(5), gap: vw(2.5), marginTop: vw(4), rowGap: vw(2.5), backgroundColor: colorStyle.white, borderBottomEndRadius: vw(4) }]}>
                            <TouchableOpacity
                                onPress={() => { setKLCVnhe(!KLCVnhe) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: KLCVnhe ? colorStyle.blue1 : null }}><Text style={[!KLCVnhe ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: KLCVnhe ? colorStyle.tan1 : colorStyle.black }]}>Ít</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKLCVvua(!KLCVvua) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: KLCVvua ? colorStyle.blue1 : null }}><Text style={[!KLCVvua ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: KLCVvua ? colorStyle.tan1 : colorStyle.black }]}>Trung bình</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKLCVnang(!KLCVnang) }}
                                style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: KLCVnang ? colorStyle.blue1 : null }}><Text style={[!KLCVnang ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: KLCVnang ? colorStyle.tan1 : colorStyle.black }]}>Nhiều</Text></TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => { setShowResult(true); filterData(); }}
                            style={[styles.flex1, styles.borderRadius16, { backgroundColor: colorStyle.blue1, paddingVertical: vw(2.5), marginTop: vw(5), marginBottom: vw(10) }]}>
                            <Text style={[styles.textCenter, componentStyle.Os20Bold, { color: colorStyle.tan1, }]}>Tìm việc</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    function result(params) {
        let jobAfterFilter = filterData();
        const Item = ({ item }) => {
            const [isBookmarked, setIsBookmarked] = useState(false);

            return (
                <View id={item.id} style={[styles.borderRadius16, styles.shadowW0H025Color, styles.flex1, { shadowColor: colorStyle.blue1, paddingVertical: vw(2.5), paddingLeft: vw(2.5), paddingRight: vw(5), marginBottom: vw(5), backgroundColor: colorStyle.white }]}>
                    <View style={[styles.flexRow, styles.gap4vw, styles.justifyContentSpaceBetween, styles.flex1,]}>
                        <Image source={item.imageCompany} style={[{ width: vw(35), height: vw(25), borderRadius: vw(2.5) }]} />
                        <View style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.flex1, { gap: vw(2.5) }]}>
                            <View style={[styles.flex1, styles.flexCol, styles.justifyContentSpaceBetween]}>
                                <Text style={[componentStyle.Os16Bold, { color: colorStyle.blue4 }]}>{item.nameJob}</Text>
                                <Text numberOfLines={1} style={[componentStyle.Mon10Bold]}>{item.nameCompany}</Text>
                                <View style={[styles.flexRow, styles.flexWrap, { gap: vw(0.5) }]}>
                                    <View style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1) }}><Text style={[componentStyle.Mon10Reg, { color: colorStyle.blue4 }]}>{item.locationJob}</Text></View>
                                    {item.acceptDisable.slice(0, 3).map((item, index) => (
                                        <View key={index} style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1) }}><Text style={[componentStyle.Mon10Reg, { color: colorStyle.blue4 }]} key={index}>{item}</Text></View>
                                    ))}
                                </View>
                            </View>
                            <View style={[styles.flexCol, styles.justifyContentSpaceBetween]}>
                                <TouchableOpacity
                                    onPress={() => { setIsBookmarked(!isBookmarked); }}
                                >
                                    {bookmark(isBookmarked, vw(7.5), vw(7.5))}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentSpaceBetween, styles.marginTop2vw]}>
                        <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap4vw,]}>
                            {clock(vw(5), vw(5))}
                            <Text style={[componentStyle.Mon10Bold, { color: colorStyle.grey }]}>{item.endTime}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { setShowResult(true) }}
                            style={[styles.wfit, { backgroundColor: colorStyle.blue1, paddingVertical: vw(2), paddingHorizontal: vw(5), borderRadius: vw(2.5) }]}>
                            <Text style={[styles.textCenter, componentStyle.Mon12Bold, { color: colorStyle.tan1, }]}>Ứng tuyển</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={[styles.positionRelative, styles.flex1]}>
                <View style={[styles.w100, styles.flex1, { borderTopLeftRadius: vw(7.5), borderTopWidth: vw(0.5), borderColor: colorStyle.blue1, borderLeftWidth: 1, paddingHorizontal: vw(7.5), }]}>
                    <View style={{ marginTop: vw(5), }}>
                        <View style={[styles.flex1, styles.borderRadius16, { backgroundColor: colorStyle.white, paddingVertical: vw(2.5), marginTop: vw(5), borderWidth: vw(1), borderColor: colorStyle.blue1 }]}>
                            <Text style={[styles.textCenter, componentStyle.Os20Bold, { color: colorStyle.blue1, }]}>Việc làm phù hợp</Text></View>
                        <View style={[styles.flexRow, styles.flexWrap, styles.flex1, styles.shadowW0H025Color, { paddingHorizontal: vw(1.5), paddingBottom: vw(4), marginBottom: vw(5), gap: vw(2.5), marginTop: vw(4), rowGap: vw(2.5), backgroundColor: colorStyle.white, borderBottomEndRadius: vw(4) }]}>
                            <TouchableOpacity
                                onPress={() => { setHoiHoa(!HoiHoa) }}
                                style={[HoiHoa ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: HoiHoa ? colorStyle.blue1 : null, }]}><Text style={[!HoiHoa ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: HoiHoa ? colorStyle.tan1 : colorStyle.black }]}>KT nghe</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setThuCong(!ThuCong) }}
                                style={[ThuCong ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: ThuCong ? colorStyle.blue1 : null, }]}><Text style={[!ThuCong ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: ThuCong ? colorStyle.tan1 : colorStyle.black }]}>KT nhìn</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setIT(!IT) }}
                                style={[IT ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: IT ? colorStyle.blue1 : null, }]}><Text style={[!IT ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: IT ? colorStyle.tan1 : colorStyle.black }]}>KT vận động</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setPhaChe(!PhaChe) }}
                                style={[PhaChe ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: PhaChe ? colorStyle.blue1 : null, }]}><Text style={[!PhaChe ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: PhaChe ? colorStyle.tan1 : colorStyle.black }]}>KT trí tuệ</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setPhuBep(!PhuBep) }}
                                style={[PhuBep ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: PhuBep ? colorStyle.blue1 : null, }]}><Text style={[!PhuBep ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: PhuBep ? colorStyle.tan1 : colorStyle.black }]}>KT thần kinh</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setTapVu(!TapVu) }}
                                style={[TapVu ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: TapVu ? colorStyle.blue1 : null, }]}><Text style={[!TapVu ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: TapVu ? colorStyle.tan1 : colorStyle.black }]}>KT khác</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setLuongThoathuan(!luongThoathuan) }}
                                style={[luongThoathuan ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luongThoathuan ? colorStyle.blue1 : null, }]}><Text style={[!luongThoathuan ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luongThoathuan ? colorStyle.tan1 : colorStyle.black }]}>Thoả thuận</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setLuong8den10(!luong8den10) }}
                                style={[luong8den10 ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luong8den10 ? colorStyle.blue1 : null, }]}><Text style={[!luong8den10 ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luong8den10 ? colorStyle.tan1 : colorStyle.black }]}>Từ 8 - 10 triệu</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setLuong6den8(!luong6den8) }}
                                style={[luong6den8 ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luong6den8 ? colorStyle.blue1 : null, }]}><Text style={[!luong6den8 ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luong6den8 ? colorStyle.tan1 : colorStyle.black }]}>Từ 6 - 8 triệu</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setLuong10den15(!luong10den15) }}
                                style={[luong10den15 ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luong10den15 ? colorStyle.blue1 : null, }]}><Text style={[!luong10den15 ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luong10den15 ? colorStyle.tan1 : colorStyle.black }]}>Từ 10 - 15 triệu</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setLuongTren15(!luongTren15) }}
                                style={[luongTren15 ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: luongTren15 ? colorStyle.blue1 : null, }]}><Text style={[!luongTren15 ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: luongTren15 ? colorStyle.tan1 : colorStyle.black }]}>Trên 15 triệu</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKnKhongyeucau(!knKhongyeucau) }}
                                style={[knKhongyeucau ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: knKhongyeucau ? colorStyle.blue1 : null, }]}><Text style={[!knKhongyeucau ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: knKhongyeucau ? colorStyle.tan1 : colorStyle.black }]}>Không yêu cầu</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKn1nam(!kn1nam) }}
                                style={[kn1nam ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: kn1nam ? colorStyle.blue1 : null, }]}><Text style={[!kn1nam ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: kn1nam ? colorStyle.tan1 : colorStyle.black }]}>{`> 1 năm`}</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKn6thang(!kn6thang) }}
                                style={[kn6thang ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: kn6thang ? colorStyle.blue1 : null, }]}><Text style={[!kn6thang ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: kn6thang ? colorStyle.tan1 : colorStyle.black }]}>{`> 6 tháng`}</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKn2nam(!kn2nam) }}
                                style={[kn2nam ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: kn2nam ? colorStyle.blue1 : null, }]}><Text style={[!kn2nam ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: kn2nam ? colorStyle.tan1 : colorStyle.black }]}>{`> 2 năm`}</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKLCVnhe(!KLCVnhe) }}
                                style={[KLCVnhe ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: KLCVnhe ? colorStyle.blue1 : null, }]}><Text style={[!KLCVnhe ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: KLCVnhe ? colorStyle.tan1 : colorStyle.black }]}>Đồ thủ công</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKLCVvua(!KLCVvua) }}
                                style={[KLCVvua ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: KLCVvua ? colorStyle.blue1 : null, }]}><Text style={[!KLCVvua ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: KLCVvua ? colorStyle.tan1 : colorStyle.black }]}>Nhập liệu</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setKLCVnang(!KLCVnang) }}
                                style={[KLCVnang ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, { borderWidth: vw(0.25), borderRadius: vw(1), paddingHorizontal: vw(2.5), paddingVertical: vw(1), backgroundColor: KLCVnang ? colorStyle.blue1 : null, }]}><Text style={[!KLCVnang ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: KLCVnang ? colorStyle.tan1 : colorStyle.black }]}>Thiết kế</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            onPress={() => { setShowResult(!showResult) }}
                            style={[showResult ? styles.flexRow : styles.dNone, styles.gap1vw, styles.alignItemsCenter, styles.alignSelfCenter, { borderWidth: vw(0.5), paddingHorizontal: vw(2.5), paddingVertical: vw(1), marginBottom: vw(4), borderRadius: vw(4), backgroundColor: colorStyle.white }]}><Text style={[!showResult ? componentStyle.Mon12Reg : componentStyle.Mon12Bold, { color: colorStyle.black }]}>Chọn lại</Text><View>{deletefitler(vw(5), vw(5))}</View></TouchableOpacity>
                    </View>
                    <Text style={[componentStyle.Mon18Bold, { color: colorStyle.black }]}>Phù hợp với bạn:</Text>
                    {jobAfterFilter._j.length > 0 ?
                        <View>
                            {jobAfterFilter._j.map((item, index) => (
                                <Item key={index} item={item} />
                            ))
                            }
                        </View>
                        :
                        <View>
                            <Text style={[componentStyle.Mon14Bold, styles.textCenter, { color: colorStyle.black }]}>Không có kết quả phù hợp</Text>
                        </View>}
                </View>
                {marginBottomForScrollView()}
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.flex1, { backgroundColor: colorStyle.blue1 }]} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={colorStyle.blue1} barStyle="light-content" />
            {searchNav('Tìm kiếm nâng cao', searchIcon2(vw(9), vw(9)), colorStyle.white, null, colorStyle.blue1)}
            <ScrollView style={[styles.flex1, { backgroundColor: colorStyle.white }]}>
                {showResult ? result() : filter()}
                {marginBottomForScrollView()}
            </ScrollView>
        </SafeAreaView>
    )
}
export default NewJob;