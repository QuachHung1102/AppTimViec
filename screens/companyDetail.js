import { colorStyle, useCustomFonts } from "../assets/componentStyleSheet";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { vw, vh, vmax, vmin } from "react-native-expo-viewport-units";
import componentStyle from "../assets/componentStyleSheet";
import styles from "../assets/stylesheet";
import { gradientRectangle, jobNews1, marginBottomForScrollView, mostCompany, navTopBar, searchNav, suitableJob } from "../assets/component";
import { editable, heartDouble, notiBell, shareIcon, bookmark, clock } from "../assets/svgXml";
import DATA from "../assets/DATA";

function CompanyDetail({ route, navigation }) {
    const { item } = route.params;
    const { job } = DATA()
    const [isBell, setIsBell] = React.useState(false);
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    return (
        <SafeAreaView style={[styles.flex1, { backgroundColor: colorStyle.blue3 }]} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={colorStyle.blue3} barStyle="dark-content" />


            {navTopBar([vw(7.5), vw(7.5)], null, shareIcon(vw(7.5), vw(7.5)),)}
            <ScrollView style={[styles.flex1, styles.flexCol, styles.w100, styles.alignSelfCenter, { paddingHorizontal: vw(5) }]}>
                <View style={[styles.flexRow, styles.flex1, styles.alignItemsCenter, styles.gap2vw, styles.justifyContentSpaceBetween, styles.marginBottom4vw, { backgroundColor: colorStyle.white, borderRadius: vw(5) }]}>
                    <View style={[styles.flexRow, styles.alignItemsCenter, styles.flex1, { padding: vw(2.5), gap: vw(2.5) }]}>
                        <Image source={item.logoCompany} style={[{ width: vw(25), height: vw(25), borderRadius: vw(4) }]} />
                        <View style={[styles.flexCol, styles.gap1vw, styles.flex1]}>
                            <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4 }]}>{item.nameCompany}</Text>
                            <Text style={[componentStyle.Mon12Bold, { color: colorStyle.black }]}>{item.majorCompany}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { setIsBell(!isBell) }}>
                            {notiBell(isBell, vw(9), vw(9))}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.flexCol, styles.gap2vw, styles.marginBottom4vw, { padding: vw(2.5) }]}>
                    <Text style={[componentStyle.Mon12Bold, styles.flex1, { color: colorStyle.black, textTransform: "uppercase" }]}>Tên đơn vị: {item.fullUnitCompany}</Text>
                    <Text style={[componentStyle.Mon12Bold, styles.flex1, { color: colorStyle.black }]}>Địa chỉ: {item.fullAddressCompany}</Text>
                    <Text style={[componentStyle.Mon12Bold, styles.flex1, { color: colorStyle.black }]}>Điện thoại liên hệ: {item.telCompany}</Text>
                    <Text style={[componentStyle.Mon12Bold, styles.flex1, { color: colorStyle.black }]}>Email: {item.emailCompany}</Text>
                    <Text style={[componentStyle.Mon12Bold, styles.flex1, { color: colorStyle.black }]}>Website: {item.websiteCompany}</Text>
                </View>

                <View style={[styles.flexCol, styles.gap2vw, styles.marginBottom4vw, { padding: vw(2.5) }]}>
                    <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4 }]}>Giới thiệu</Text>
                    <Text style={[componentStyle.Mon12Reg, styles.flex1, { color: colorStyle.black }]}>Website: {item.introCompany}</Text>
                </View>

                <View style={[styles.positionRelative]}>
                    <View style={[styles.flexRow, styles.alignItemsCenter, styles.borderRadius16, styles.wfit, styles.positionAbsolute, { zIndex: 1, gap: vw(2.5), paddingVertical: vw(2.5), paddingHorizontal: vw(5), backgroundColor: colorStyle.blue1 }]}>
                        <Text style={[componentStyle.Os20Bold, { color: colorStyle.tan1, }]}>Bài đăng của nhà tuyển dụng</Text>
                    </View>
                    <View style={[styles.flexCol, styles.gap2vw, { paddingVertical: vw(7), backgroundColor: colorStyle.white, top: vw(6), borderRadius: vw(5), borderTopLeftRadius: vw(0) }]}>
                        {job.filter(job => {
                            return job.companyID === item.id
                        }).map((job, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate('JobDetail', { item: job }) }}
                                    key={job.id} style={[styles.borderRadius16, styles.shadowW0H025Color, styles.flex1, { shadowColor: colorStyle.blue1, paddingVertical: vw(2.5), paddingLeft: vw(2.5), paddingRight: vw(5), marginBottom: vw(5), backgroundColor: colorStyle.white }]}>
                                    <View style={[styles.flexRow, styles.gap4vw, styles.justifyContentSpaceBetween, styles.flex1,]}>
                                        <Image source={job.imageCompany} style={[{ width: vw(35), height: vw(25), borderRadius: vw(2.5) }]} />
                                        <View style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.flex1, { gap: vw(2.5) }]}>
                                            <View style={[styles.flex1, styles.flexCol, styles.justifyContentSpaceBetween]}>
                                                <Text style={[componentStyle.Os16Bold, { color: colorStyle.blue4 }]}>{job.nameJob}</Text>
                                                <Text numberOfLines={1} style={[componentStyle.Mon10Bold]}>{job.nameCompany}</Text>
                                                <View style={[styles.flexRow, styles.flexWrap, { gap: vw(0.5) }]}>
                                                    <View style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1) }}><Text style={[componentStyle.Mon10Reg, { color: colorStyle.blue4 }]}>{job.locationJob}</Text></View>
                                                    {job.acceptDisable.slice(0, 3).map((item, index) => (
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
                                            <Text style={[componentStyle.Mon10Bold, { color: colorStyle.grey }]}>{job.endTime}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => { setShowResult(true) }}
                                            style={[styles.wfit, { backgroundColor: colorStyle.blue1, paddingVertical: vw(2), paddingHorizontal: vw(5), borderRadius: vw(2.5) }]}>
                                            <Text style={[styles.textCenter, componentStyle.Mon12Bold, { color: colorStyle.tan1, }]}>Ứng tuyển</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                        }
                    </View>
                </View>
                {marginBottomForScrollView()}
            </ScrollView>
        </SafeAreaView >
    )
}
export default CompanyDetail;