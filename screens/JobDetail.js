import { colorStyle, useCustomFonts } from "../assets/componentStyleSheet";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { vw, vh, vmax, vmin } from "react-native-expo-viewport-units";
import componentStyle from "../assets/componentStyleSheet";
import styles from "../assets/stylesheet";
import { gradientRectangle, jobNews1, jobRelative, marginBottomForScrollView, mostCompany, navTopBar, notiModal, searchNav, suitableJob } from "../assets/component";
import { bookmark, editable, heartDouble, shareIcon } from "../assets/svgXml";
import { BlurView } from 'expo-blur';
import { Svg, SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

function JobDetail({ route, navigation }) {
    const { item } = route.params;
    const { bookmarkStatus } = route.params;
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const [isDone, setIsDone] = React.useState(false);
    return (
        <View style={[styles.flex1, styles.h100vh]}>
            <SafeAreaView style={[styles.flex1, { backgroundColor: colorStyle.blue3 }]} edges={['top', 'left', 'right']}>
                <StatusBar backgroundColor={colorStyle.white} barStyle="dark-content" />
                <LinearGradient
                    colors={['#E2EAFF', '#FFE7AB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1, height: vh(100), position: 'absolute', left: 0, right: 0, top: 0, zIndex: -1 }}
                >

                </LinearGradient>

                {navTopBar([vw(7.5), vw(7.5)], null, shareIcon(vw(7.5), vw(7.5)), () => { })}

                <ScrollView>
                    <BlurView intensity={40} style={[styles.w90, styles.flexCol, styles.justifyContentCenter, styles.alignSelfCenter, styles.alignItemsCenter, { padding: vw(2.5), borderRadius: vw(4), overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.8)', gap: vw(2.5) }]}>
                        <View style={[{ padding: vw(5) }]}>
                            <Image source={item.imageJob[0]} style={[, { width: vw(75), height: vw(75), borderRadius: vw(4) }]} />
                        </View>
                        <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4 }]}>{item.nameJob}</Text>
                        <Text numberOfLines={1} style={[componentStyle.Mon10Bold]}>{item.nameCompany}</Text>
                        <View style={[styles.flexRow, styles.justifyContentCenter, styles.gap5vw, styles.alignItemsStart]}>
                            <View style={[styles.flexCol, styles.alignItemsCenter, { gap: vw(1.5), borderRadius: vw(2.5), padding: vw(2.5), backgroundColor: colorStyle.blue1, maxWidth: '30%' }]}>
                                <SvgXml xml={`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_38_5843)"><path d="M8.5 10.341V12.535C7.304 13.227 6.5 14.52 6.5 16C6.5 18.21 8.29 20 10.5 20C11.98 20 13.273 19.196 13.965 18H16.158C15.335 20.33 13.112 22 10.5 22C7.186 22 4.5 19.314 4.5 16C4.5 13.387 6.17 11.165 8.5 10.341ZM12.5 17C10.843 17 9.5 15.657 9.5 14V10C9.5 8.956 10.034 8.036 10.843 7.499C10.033 6.964 9.5 6.044 9.5 5C9.5 3.343 10.843 2 12.5 2C14.157 2 15.5 3.343 15.5 5C15.5 6.044 14.966 6.964 14.157 7.501C14.967 8.036 15.5 8.956 15.5 10V14.999L16.934 15C17.582 15 18.187 15.314 18.56 15.836L18.649 15.971L21.357 20.486L19.643 21.514L16.933 17L15.5 16.999L12.5 17ZM12.5 9C11.948 9 11.5 9.448 11.5 10V14C11.5 14.552 11.948 15 12.5 15H13.499L13.5 10C13.5 9.448 13.052 9 12.5 9ZM12.5 4C11.948 4 11.5 4.448 11.5 5C11.5 5.552 11.948 6 12.5 6C13.052 6 13.5 5.552 13.5 5C13.5 4.448 13.052 4 12.5 4Z" fill="#FAFAFA"/></g><defs><clipPath id="clip0_38_5843"><rect width="24" height="24" fill="white" transform="translate(0.5)"/></clipPath></defs></svg>`} />
                                <Text style={[componentStyle.Mon12Bold, { color: colorStyle.white }]}>Dạng tật</Text>
                                {item.acceptDisable.map((item, index) => {
                                    return (
                                        <Text key={index} style={[componentStyle.Mon14Bold, { color: colorStyle.tan1 }]}>{item}</Text>
                                    )
                                })}
                            </View>
                            <View style={[styles.flexCol, styles.alignItemsCenter, { gap: vw(1.5), borderRadius: vw(2.5), padding: vw(2.5), backgroundColor: colorStyle.blue1, maxWidth: '30%' }]}>
                                <SvgXml xml={`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_17_4609)"><path d="M12.5 20.9L17.45 15.95C18.4289 14.971 19.0955 13.7237 19.3656 12.3659C19.6356 11.008 19.4969 9.60061 18.9671 8.32157C18.4373 7.04253 17.54 5.94932 16.3889 5.18018C15.2378 4.41104 13.8844 4.00052 12.5 4.00052C11.1156 4.00052 9.76222 4.41104 8.61109 5.18018C7.45996 5.94932 6.56275 7.04253 6.03292 8.32157C5.50308 9.60061 5.36442 11.008 5.63445 12.3659C5.90449 13.7237 6.57111 14.971 7.55 15.95L12.5 20.9ZM12.5 23.728L6.136 17.364C4.87734 16.1053 4.02019 14.5017 3.67293 12.7559C3.32567 11.01 3.50391 9.20044 4.1851 7.55591C4.86629 5.91139 6.01984 4.50579 7.49988 3.51686C8.97992 2.52793 10.72 2.00009 12.5 2.00009C14.28 2.00009 16.0201 2.52793 17.5001 3.51686C18.9802 4.50579 20.1337 5.91139 20.8149 7.55591C21.4961 9.20044 21.6743 11.01 21.3271 12.7559C20.9798 14.5017 20.1227 16.1053 18.864 17.364L12.5 23.728ZM12.5 13C13.0304 13 13.5391 12.7893 13.9142 12.4142C14.2893 12.0392 14.5 11.5304 14.5 11C14.5 10.4696 14.2893 9.96087 13.9142 9.5858C13.5391 9.21073 13.0304 9.00001 12.5 9.00001C11.9696 9.00001 11.4609 9.21073 11.0858 9.5858C10.7107 9.96087 10.5 10.4696 10.5 11C10.5 11.5304 10.7107 12.0392 11.0858 12.4142C11.4609 12.7893 11.9696 13 12.5 13ZM12.5 15C11.4391 15 10.4217 14.5786 9.67158 13.8284C8.92143 13.0783 8.5 12.0609 8.5 11C8.5 9.93915 8.92143 8.92173 9.67158 8.17159C10.4217 7.42144 11.4391 7.00001 12.5 7.00001C13.5609 7.00001 14.5783 7.42144 15.3284 8.17159C16.0786 8.92173 16.5 9.93915 16.5 11C16.5 12.0609 16.0786 13.0783 15.3284 13.8284C14.5783 14.5786 13.5609 15 12.5 15Z" fill="#FAFAFA"/></g><defs><clipPath id="clip0_17_4609"><rect width="24" height="24" fill="white" transform="translate(0.5)"/></clipPath></defs></svg>`} />
                                <Text style={[componentStyle.Mon12Bold, { color: colorStyle.white }]}>Địa điểm</Text>
                                <Text style={[componentStyle.Mon14Bold, { color: colorStyle.tan1 }]}>{item.locationJob}</Text>
                            </View>
                            <View style={[styles.flexCol, styles.alignItemsCenter, { gap: vw(1.5), borderRadius: vw(2.5), padding: vw(2.5), backgroundColor: colorStyle.blue1, maxWidth: '30%' }]}>
                                <SvgXml xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_17_4610)"><path d="M12 18.26L4.94701 22.208L6.52201 14.28L0.587006 8.792L8.61401 7.84L12 0.5L15.386 7.84L23.413 8.792L17.478 14.28L19.053 22.208L12 18.26ZM12 15.968L16.247 18.345L15.298 13.572L18.871 10.267L14.038 9.694L12 5.275L9.96201 9.695L5.12901 10.267L8.70201 13.572L7.75301 18.345L12 15.968Z" fill="#FAFAFA"/></g><defs><clipPath id="clip0_17_4610"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`} />
                                <Text style={[componentStyle.Mon12Bold, { color: colorStyle.white }]}>Cường độ công việc</Text>
                                <Text style={[componentStyle.Mon14Bold, { color: colorStyle.tan1 }]}>{item.expJob}</Text>
                            </View>
                        </View>

                        <View style={[styles.flexRow, styles.flexWrap, styles.justifyContentCenter, styles.gap5vw, styles.alignItemsStart]}>
                            {item.extraBenefitJob.true ?
                                item.extraBenefitJob.true.map((item, index) => {
                                    return (
                                        <View key={index} style={[styles.flexRow, styles.gap1vw, styles.padding1vw, { backgroundColor: '#DEFFDD', borderRadius: vw(1.5) }]}>
                                            <SvgXml xml={`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_125_25)"><path d="M3.33333 2.5H16.6667C16.8877 2.5 17.0996 2.5878 17.2559 2.74408C17.4122 2.90036 17.5 3.11232 17.5 3.33333V16.6667C17.5 16.8877 17.4122 17.0996 17.2559 17.2559C17.0996 17.4122 16.8877 17.5 16.6667 17.5H3.33333C3.11232 17.5 2.90036 17.4122 2.74408 17.2559C2.5878 17.0996 2.5 16.8877 2.5 16.6667V3.33333C2.5 3.11232 2.5878 2.90036 2.74408 2.74408C2.90036 2.5878 3.11232 2.5 3.33333 2.5ZM9.16917 13.3333L15.0608 7.44083L13.8825 6.2625L9.16917 10.9767L6.81167 8.61917L5.63333 9.7975L9.16917 13.3333Z" fill="#64CD53"/></g><defs><clipPath id="clip0_125_25"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`} />
                                            <Text style={[componentStyle.Mon12Bold, { color: '#64CD53' }]}>{item}</Text>
                                        </View>
                                    )
                                })
                                : null}
                            {item.extraBenefitJob.false ?
                                item.extraBenefitJob.false.map((item, index) => {
                                    return (
                                        <View key={index} style={[styles.flexRow, styles.gap1vw, styles.padding1vw, { backgroundColor: '#FFD4D4', borderRadius: vw(1.5) }]}>
                                            <SvgXml xml={`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_125_893)"><path d="M10 18.3333C5.39752 18.3333 1.66669 14.6025 1.66669 9.99996C1.66669 5.39746 5.39752 1.66663 10 1.66663C14.6025 1.66663 18.3334 5.39746 18.3334 9.99996C18.3334 14.6025 14.6025 18.3333 10 18.3333ZM10 8.82163L7.64335 6.46413L6.46419 7.64329L8.82169 9.99996L6.46419 12.3566L7.64335 13.5358L10 11.1783L12.3567 13.5358L13.5359 12.3566L11.1784 9.99996L13.5359 7.64329L12.3567 6.46413L10 8.82163Z" fill="#DA5D5D"/></g><defs><clipPath id="clip0_125_893"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`} />
                                            <Text style={[componentStyle.Mon12Bold, { color: '#DA5D5D' }]}>{item}</Text>
                                        </View>
                                    )
                                })
                                : null}
                        </View>

                        <Text style={[styles.w90, componentStyle.Os16Bold, { color: colorStyle.blue4 }]}>Mô tả công việc</Text>
                        {item.discripJob.map((item, index) => {
                            return (
                                <View key={index} style={[styles.flexRow, styles.alignItemsStart, styles.flex1, styles.paddingH4vw, styles.w100, styles.gap2vw]}>
                                    <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black }]}>-</Text>
                                    <Text style={[componentStyle.Mon12Reg, styles.textJustify, { color: colorStyle.black }]}>{item}</Text>
                                </View>
                            )
                        })}
                        <Text style={[styles.w90, componentStyle.Os16Bold, { color: colorStyle.blue4 }]}>Yêu cầu ứng viên</Text>
                        {item.requirementJob.map((item, index) => {
                            return (
                                <View key={index} style={[styles.flexRow, styles.alignItemsStart, styles.flex1, styles.paddingH4vw, styles.w100, styles.gap2vw]}>
                                    <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black }]}>-</Text>
                                    <Text style={[componentStyle.Mon12Reg, styles.textJustify, { color: colorStyle.black }]}>{item}</Text>
                                </View>
                            )
                        })}
                        <Text style={[styles.w90, componentStyle.Os16Bold, { color: colorStyle.blue4 }]}>Quyền lợi</Text>
                        {item.benefitJob.map((item, index) => {
                            return (
                                <View key={index} style={[styles.flexRow, styles.alignItemsStart, styles.flex1, styles.paddingH4vw, styles.w100, styles.gap2vw]}>
                                    <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black }]}>-</Text>
                                    <Text style={[componentStyle.Mon12Reg, styles.textJustify, { color: colorStyle.black }]}>{item}</Text>
                                </View>
                            )
                        })}
                        <Text style={[styles.w90, componentStyle.Os16Bold, { color: colorStyle.blue4 }]}>Địa điểm</Text>
                        <View style={[styles.flexRow, styles.alignItemsStart, styles.flex1, styles.paddingH4vw, styles.w100, styles.gap2vw]}>
                            <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black }]}>-</Text>
                            <Text style={[componentStyle.Mon12Reg, styles.textJustify, { color: colorStyle.black }]}>{item.locationJob}</Text>
                        </View>
                    </BlurView>
                    {marginBottomForScrollView()}
                </ScrollView>
            </SafeAreaView >
            <View style={[styles.w100, styles.flexRow, styles.gap4vw, { backgroundColor: colorStyle.blue3, paddingHorizontal: vw(6.5), paddingTop: vw(2.5), paddingBottom: vw(10) }]}>
                <TouchableOpacity
                    style={[styles.flexRow, styles.justifyContentCenter, styles.alignItemsCenter, { backgroundColor: colorStyle.white, borderRadius: vw(2.5), borderWidth: vw(0.25), borderColor: colorStyle.blue1, width: vw(12.5), height: vw(12.5) }]}
                    onPress={() => { setIsBookmarked(!isBookmarked) }}>
                    {bookmark(isBookmarked, vw(7.5), vw(7.5))}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.flexRow, styles.justifyContentCenter, styles.alignItemsCenter, styles.flex1, { backgroundColor: colorStyle.blue1, borderRadius: vw(2.5) }]}
                    onPress={() => { setIsConfirmed(true) }}>
                    <Text style={[componentStyle.Mon12Bold, { color: colorStyle.tan1 }]}>Ứng tuyển ngay</Text>
                </TouchableOpacity>
            </View>
            {notiModal(isConfirmed, 'Xác nhận ứng tuyển cho vị trí:', 'Dịch thuật văn bản', null, 'Ứng tuyển', () => { setIsConfirmed(false); setIsDone(true) }, () => { setIsConfirmed(false) })}
            {notiModal(isDone, '', 'Bạn đã ứng tuyển thành công', 'Xin hãy đợi phản hồi từ nhà tuyển dụng', 'Việc làm tương tự', () => { navigation.navigate('Home') }, () => { setIsDone(false) })}
        </View>
    )
}
export default JobDetail;