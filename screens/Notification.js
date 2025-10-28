import { colorStyle, useCustomFonts } from "../assets/componentStyleSheet";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, StatusBar, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { vw, vh, vmax, vmin } from "react-native-expo-viewport-units";
import componentStyle from "../assets/componentStyleSheet";
import styles from "../assets/stylesheet";
import { gradientRectangle, jobNews1, marginBottomForScrollView, mostCompany, navTopBar, searchNav, suitableJob } from "../assets/component";
import { editable, heartDouble, shareIcon } from "../assets/svgXml";
import DATA from "../assets/DATA";

function Notification({ }) {
    const { currentUser, notiData, company } = DATA();
    const [allowNoti, setAllowNoti] = React.useState(false);
    let now = new Date();
    function getTimeDiff(notiTime) {
        const now = new Date();
        const notiDate = new Date(notiTime);
        const diff = now - notiDate;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    }

    return (
                <SafeAreaView style={[styles.flex1, { backgroundColor: colorStyle.blue3 }]} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={colorStyle.blue3} barStyle='dark-content' />
            {searchNav('Thông báo', notiBell(vw(9), vw(9)), colorStyle.blue3, null, colorStyle.blue3)}
            <StatusBar backgroundColor={colorStyle.white} barStyle="dark-content" />
            {navTopBar([vw(7.5), vw(7.5)], null,
                <View style={[styles.flexRow, styles.gap2vw, styles.alignItemsCenter, { alignSelf: 'flex-end' }]}>
                    <Text style={[componentStyle.Mon14Bold, { color: colorStyle.black }]}>Thông báo</Text>
                    <Switch
                        trackColor={{ false: colorStyle.grey, true: '#81b0ff' }}
                        thumbColor={allowNoti ? colorStyle.blue1 : colorStyle.darkGray}
                        ios_backgroundColor={colorStyle.blue3}
                        onValueChange={() => { setAllowNoti(!allowNoti) }}
                        value={allowNoti}
                    />
                </View>, () => { })}
            <ScrollView>
                {notiData.filter(notiItem => notiItem.forUser === currentUser.id).map((notiItem, index) => {
                    return (
                        <View key={index} style={[styles.flexRow, styles.w90, styles.justifyContentSpaceBetween, styles.shadowW0H025Color, styles.alignSelfCenter, { borderRadius: vw(4), paddingVertical: vw(4), paddingHorizontal: vw(2.5), marginVertical: vw(4), gap: vw(2.5), backgroundColor: index % 2 != 1 ? colorStyle.white : colorStyle.blue3, shadowColor: colorStyle.blue4 }]}>
                            {company.filter(companyItem => companyItem.id === notiItem.companyID).map((companyItem, index) => {
                                return (
                                    <Image key={index} source={companyItem.logoCompany} style={[{ width: vw(12.5), height: vw(12.5), borderRadius: vw(2.5) }]} />
                                )
                            })}
                            <View style={[styles.flex1, styles.flexCol, styles.justifyContentSpaceBetween, { gap: vw(1.5) }]}>
                                <Text style={[componentStyle.Mon14Bold, { color: colorStyle.black }]}>Nhà tuyển dụng vừa {notiItem.notiType == 'viewed' ? 'xem' : 'đánh giá'} cv của bạn</Text>
                                <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black }]}>
                                    Phòng tuyển dụng, {company.find(companyItem => companyItem.id === notiItem.companyID)?.nameCompany} vừa {notiItem.notiType == 'viewed' ? 'xem' : 'đánh giá'} cv của bạn
                                </Text>
                                <Text style={[componentStyle.Mon12Reg, { color: colorStyle.grey }]}>
                                    {getTimeDiff(notiItem.notiTime)}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}
export default Notification;