import { colorStyle, useCustomFonts } from "../assets/componentStyleSheet";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, StatusBar, ScrollView, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { vw, vh, vmax, vmin } from "react-native-expo-viewport-units";
import componentStyle from "../assets/componentStyleSheet";
import styles from "../assets/stylesheet";
import { gradientRectangle, jobNews1, marginBottomForScrollView, mostCompany, searchNav, suitableJob } from "../assets/component";
import { editable, heartDouble, settingIcon } from "../assets/svgXml";
import DATA from "../assets/DATA";
import { SvgXml } from "react-native-svg";

// Import Auth Service
import { logoutUser } from '../utils/AuthService'
import { useNavigation } from "@react-navigation/native";

function Setting({ navigation }) {
    const { currentUser } = DATA();
    const [isAvailable, setIsAvailable] = React.useState(false);
    const [isLetCompanyContact, setIsLetCompanyContact] = React.useState(false);
    const [allowEmailNotification, setAllowEmailNotification] = React.useState(false);
    return (
        <SafeAreaView style={[styles.flex1, { backgroundColor: colorStyle.blue1 }]} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={colorStyle.blue1} barStyle='light-content' />
            {searchNav('Cài đặt', settingIcon(vw(9), vw(9)), colorStyle.blue3, null, colorStyle.blue1)}
            <ScrollView style={[styles.flex1, styles.flexCol, styles.w100, { backgroundColor: colorStyle.blue3 }]} contentContainerStyle={[styles.alignItemsCenter, styles.gap4vw]}>
                <View style={[styles.positionRelative, styles.w90, { margin: '5%' }]}>
                    <View
                        style={[styles.flexRow, styles.w100, styles.alignItemsCenter, styles.gap4vw, { paddingVertical: vw(2.75), paddingHorizontal: vw(4), borderRadius: vw(5), backgroundColor: colorStyle.white }]}>
                        <Image source={require('../assets/images/placeholder.jpg')} style={[{ width: vw(17.5), height: vw(17.5), borderRadius: vw(100), borderWidth: vw(0.5), borderColor: colorStyle.blue2 }]} />
                        <View style={[styles.flexCol, styles.gap2vw]}>
                            <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4, }]}>{currentUser.name}</Text>
                            <Text style={[componentStyle.Mon12Bold, { color: colorStyle.darkGray, }]}>ID: {currentUser.id}</Text>
                            <Text style={[componentStyle.Mon10Reg, { color: colorStyle.darkGray, }]}>Tham gia từ: {currentUser.joinDate}</Text>
                        </View>
                    </View>
                    <View style={[styles.flex1, styles.w100, styles.h100, styles.positionAbsolute, { borderRadius: vw(5), zIndex: -1, backgroundColor: colorStyle.blue1, top: vw(0.5) }]}></View>
                </View>


                <View style={[styles.w100]}>
                    <View style={{ marginBottom: vw(5) }}>
                        <View style={{ borderTopRightRadius: vw(7.5), backgroundColor: colorStyle.white }}>
                            <View style={[styles.flexCol, styles.gap4vw, { paddingVertical: vw(5), paddingHorizontal: vw(6.5), }]}>
                                <Text style={[componentStyle.Os20Bold, { color: colorStyle.black }]}>Quản lý hồ sơ</Text>
                                <View style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, styles.borderRadius16, styles.shadowW0H05Color, { backgroundColor: colorStyle.blue1, paddingHorizontal: vw(4), shadowColor: colorStyle.grey }]}>
                                    <Text style={[componentStyle.Mon14Bold, { color: colorStyle.white }]}>Trạng thái tìm việc</Text>
                                    <Switch
                                        trackColor={{ false: '#81b0ff', true: '#81b0ff' }}
                                        thumbColor={isAvailable ? colorStyle.white : colorStyle.grey}
                                        ios_backgroundColor={colorStyle.blue3}
                                        onValueChange={() => { setIsAvailable(!isAvailable) }}
                                        value={isAvailable}
                                    />
                                </View>
                                <View style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, styles.borderRadius16, styles.shadowW0H05Color, { backgroundColor: colorStyle.blue1, paddingHorizontal: vw(4), shadowColor: colorStyle.grey }]}>
                                    <Text style={[componentStyle.Mon14Bold, { color: colorStyle.white }]}>Cho phép NTD liên hệ</Text>
                                    <Switch
                                        trackColor={{ false: '#81b0ff', true: '#81b0ff' }}
                                        thumbColor={isLetCompanyContact ? colorStyle.white : colorStyle.grey}
                                        ios_backgroundColor={colorStyle.blue3}
                                        onValueChange={() => { setIsLetCompanyContact(!isLetCompanyContact) }}
                                        value={isLetCompanyContact}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginBottom: vw(5) }}>
                        <View style={{ borderTopRightRadius: vw(7.5), backgroundColor: colorStyle.white }}>
                            <View style={[styles.flexCol, styles.gap4vw, { paddingVertical: vw(5), paddingHorizontal: vw(6.5), }]}>
                                <Text style={[componentStyle.Os20Bold, { color: colorStyle.black }]}>Quản lý tìm việc</Text>
                                <View style={[styles.flexRow, styles.flexWrap, styles.justifyContentSpaceBetween]}>
                                    <View style={[styles.flexCol, styles.alignItemsCenter, { width: '49%', backgroundColor: colorStyle.blue1, padding: vw(5), borderRadius: vw(4), marginBottom: vw(2) }]}>
                                        <Text style={[componentStyle.Os14Bold, { color: colorStyle.white }]}>Việc làm đã ứng tuyển</Text>
                                        <View style={[styles.flexRow, styles.gap4vw, styles.alignItemsCenter]}>
                                            <SvgXml xml={`<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_86_8580)"><path d="M5.76828 7.94812C7.70172 6.01433 10.2949 4.88326 13.0276 4.78187C15.7603 4.68048 18.4302 5.61626 20.5016 7.40145C22.5712 5.61924 25.2376 4.6845 27.967 4.78439C30.6964 4.88427 33.2873 6.0114 35.2211 7.94013C37.1548 9.86885 38.2888 12.4568 38.3958 15.1859C38.5028 17.915 37.5751 20.5839 35.7983 22.6581L22.8566 35.6414C22.262 36.2362 21.4646 36.5843 20.6241 36.6158C19.7837 36.6474 18.9624 36.36 18.3249 35.8115L18.1416 35.6431L5.20162 22.6581C3.42576 20.5857 2.49758 17.9193 2.60264 15.1921C2.7077 12.4649 3.83826 9.87781 5.76828 7.94812ZM8.12495 10.3048C6.76202 11.6681 5.97637 13.5039 5.93106 15.4311C5.88575 17.3583 6.58426 19.2289 7.88162 20.6548L8.12495 20.9115L20.4999 33.2865L29.3383 24.4465L23.4466 18.5548L21.6799 20.3215C21.2157 20.7859 20.6646 21.1544 20.0579 21.4058C19.4513 21.6572 18.8011 21.7867 18.1445 21.7869C16.8183 21.7872 15.5463 21.2607 14.6083 20.3231C13.6703 19.3856 13.1432 18.1138 13.1429 16.7876C13.1425 15.4614 13.6691 14.1894 14.6066 13.2515L18.1099 9.74645C16.7157 8.63374 14.9706 8.05427 13.1878 8.112C11.4049 8.16973 9.70093 8.86088 8.38162 10.0615L8.12495 10.3048ZM22.2683 15.0181C22.5808 14.7057 23.0047 14.5301 23.4466 14.5301C23.8886 14.5301 24.3124 14.7057 24.625 15.0181L31.6949 22.0881L32.8749 20.9115C34.2607 19.5267 35.0496 17.6546 35.073 15.6957C35.0964 13.7368 34.3523 11.8465 33 10.429C31.6477 9.01161 29.7944 8.17957 27.8365 8.11087C25.8787 8.04218 23.9716 8.74228 22.5233 10.0615L22.2683 10.3048L16.9649 15.6081C16.6761 15.8968 16.5032 16.2815 16.4793 16.6892C16.4553 17.0969 16.5819 17.4992 16.8349 17.8198L16.9649 17.9648C17.2536 18.2537 17.6384 18.4265 18.0461 18.4505C18.4538 18.4744 18.8561 18.3479 19.1766 18.0948L19.3216 17.9648L22.2683 15.0181Z" fill="#FAFAFA"/></g><defs><clipPath id="clip0_86_8580"><rect width="40" height="40" fill="white" transform="translate(0.5 0.5)"/></clipPath></defs></svg>`} />
                                            <Text style={[componentStyle.Os32Bold, { color: colorStyle.tan1 }]}>{currentUser.jobAttempt ? currentUser.jobAttempt.length : 0}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles.flexCol, styles.alignItemsCenter, { width: '49%', backgroundColor: colorStyle.blue1, padding: vw(5), borderRadius: vw(4), marginBottom: vw(2) }]}>
                                        <Text style={[componentStyle.Os14Bold, { color: colorStyle.white }]}>Việc làm đã lưu</Text>
                                        <View style={[styles.flexRow, styles.gap4vw, styles.alignItemsCenter]}>
                                            <SvgXml xml={`<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10.4998C10 8.65889 11.4924 7.1665 13.3333 7.1665H26.6667C28.5076 7.1665 30 8.65889 30 10.4998V35.4998L20 25.4998L10 35.4998V10.4998Z" stroke="#FAFAFA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`} />
                                            <Text style={[componentStyle.Os32Bold, { color: colorStyle.tan1 }]}>{currentUser.jobSave ? currentUser.jobSave.length : 0}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles.flexCol, styles.alignItemsCenter, { width: '49%', backgroundColor: colorStyle.blue1, padding: vw(5), borderRadius: vw(4), marginBottom: vw(2) }]}>
                                        <Text style={[componentStyle.Os14Bold, { color: colorStyle.white }]}>CTY đang theo dõi</Text>
                                        <View style={[styles.flexRow, styles.gap4vw, styles.alignItemsCenter]}>
                                            <SvgXml xml={`<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_86_8595)"><path d="M32.0716 8.4283C34.5083 10.8716 35.425 14.25 34.8216 17.395C35.7683 17.6616 36.665 18.1666 37.4116 18.9083C39.7516 21.2316 39.7516 24.9983 37.4116 27.32L28.3333 36.3333L23.2966 31.3333L18.3333 36.3083L4.19996 22.155C0.694957 18.2283 0.826624 12.1983 4.59496 8.4283C8.36996 4.65497 14.4083 4.5283 18.335 8.0483C22.25 4.5333 28.3 4.64997 32.0716 8.4283ZM21.6033 21.275C20.5766 22.2933 20.5766 23.9366 21.6033 24.955L28.3333 31.6366L35.0633 24.955C36.09 23.9366 36.09 22.2933 35.0633 21.275C34.0233 20.2416 32.3266 20.2416 31.2833 21.2783L28.33 24.2016L25.985 21.875L25.38 21.275C24.34 20.2416 22.6433 20.2416 21.6033 21.275ZM6.95329 10.7866C4.46996 13.27 4.34496 17.245 6.63329 19.8716L18.3333 31.59L20.9316 28.9866L19.255 27.32C16.915 24.9983 16.915 21.2316 19.255 18.9083C21.595 16.5866 25.3883 16.5866 27.7283 18.9083L28.3333 19.5083L28.9383 18.9083C29.6466 18.2066 30.4883 17.7166 31.38 17.4383C32.0733 15.16 31.51 12.585 29.7116 10.7833C27.2116 8.27997 23.1783 8.1783 20.5616 10.5283L18.3366 12.525L16.11 10.53C13.485 8.17663 9.45996 8.27997 6.95329 10.7866Z" fill="#FAFAFA"/></g><defs><clipPath id="clip0_86_8595"><rect width="40" height="40" fill="white" transform="translate(0 0.5)"/></clipPath></defs></svg>`} />
                                            <Text style={[componentStyle.Os32Bold, { color: colorStyle.tan1 }]}>{currentUser.followCompany ? currentUser.followCompany.length : 0}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles.flexCol, styles.alignItemsCenter, { width: '49%', backgroundColor: colorStyle.blue1, padding: vw(5), borderRadius: vw(4), marginBottom: vw(2) }]}>
                                        <Text style={[componentStyle.Os14Bold, { color: colorStyle.white }]}>NTD đã xem hồ sơ</Text>
                                        <View style={[styles.flexRow, styles.gap4vw, styles.alignItemsCenter]}>
                                            <SvgXml xml={`
                                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_86_8604)"><path d="M12.1667 15.5002C13.2718 15.5002 14.3316 15.0612 15.113 14.2798C15.8944 13.4984 16.3334 12.4386 16.3334 11.3335C16.3334 10.2284 15.8944 9.16862 15.113 8.38722C14.3316 7.60582 13.2718 7.16683 12.1667 7.16683C11.0616 7.16683 10.0018 7.60582 9.22043 8.38722C8.43903 9.16862 8.00004 10.2284 8.00004 11.3335C8.00004 12.4386 8.43903 13.4984 9.22043 14.2798C10.0018 15.0612 11.0616 15.5002 12.1667 15.5002ZM12.1667 18.8335C11.1818 18.8335 10.2065 18.6395 9.29658 18.2626C8.38664 17.8857 7.55985 17.3332 6.86341 16.6368C6.16697 15.9404 5.61452 15.1136 5.23761 14.2036C4.8607 13.2937 4.66671 12.3184 4.66671 11.3335C4.66671 10.3486 4.8607 9.37331 5.23761 8.46337C5.61452 7.55343 6.16697 6.72663 6.86341 6.03019C7.55985 5.33376 8.38664 4.78131 9.29658 4.4044C10.2065 4.02749 11.1818 3.8335 12.1667 3.8335C14.1558 3.8335 16.0635 4.62367 17.47 6.03019C18.8765 7.43672 19.6667 9.34437 19.6667 11.3335C19.6667 13.3226 18.8765 15.2303 17.47 16.6368C16.0635 18.0433 14.1558 18.8335 12.1667 18.8335ZM29.6667 22.1668C30.5508 22.1668 31.3986 21.8156 32.0237 21.1905C32.6488 20.5654 33 19.7176 33 18.8335C33 17.9494 32.6488 17.1016 32.0237 16.4765C31.3986 15.8514 30.5508 15.5002 29.6667 15.5002C28.7827 15.5002 27.9348 15.8514 27.3097 16.4765C26.6846 17.1016 26.3334 17.9494 26.3334 18.8335C26.3334 19.7176 26.6846 20.5654 27.3097 21.1905C27.9348 21.8156 28.7827 22.1668 29.6667 22.1668ZM29.6667 25.5002C27.8986 25.5002 26.2029 24.7978 24.9527 23.5475C23.7024 22.2973 23 20.6016 23 18.8335C23 17.0654 23.7024 15.3697 24.9527 14.1195C26.2029 12.8692 27.8986 12.1668 29.6667 12.1668C31.4348 12.1668 33.1305 12.8692 34.3808 14.1195C35.631 15.3697 36.3334 17.0654 36.3334 18.8335C36.3334 20.6016 35.631 22.2973 34.3808 23.5475C33.1305 24.7978 31.4348 25.5002 29.6667 25.5002ZM33.8334 35.5002V34.6668C33.8334 33.5618 33.3944 32.502 32.613 31.7206C31.8316 30.9391 30.7718 30.5002 29.6667 30.5002C28.5616 30.5002 27.5018 30.9391 26.7204 31.7206C25.939 32.502 25.5 33.5618 25.5 34.6668V35.5002H22.1667V34.6668C22.1667 33.6819 22.3607 32.7066 22.7376 31.7967C23.1145 30.8868 23.667 30.06 24.3634 29.3635C25.0598 28.6671 25.8866 28.1146 26.7966 27.7377C27.7065 27.3608 28.6818 27.1668 29.6667 27.1668C30.6516 27.1668 31.6269 27.3608 32.5368 27.7377C33.4468 28.1146 34.2736 28.6671 34.97 29.3635C35.6664 30.06 36.2189 30.8868 36.5958 31.7967C36.9727 32.7066 37.1667 33.6819 37.1667 34.6668V35.5002H33.8334ZM17.1667 35.5002V28.8335C17.1667 27.5074 16.6399 26.2356 15.7022 25.298C14.7646 24.3603 13.4928 23.8335 12.1667 23.8335C10.8406 23.8335 9.56886 24.3603 8.63117 25.298C7.69349 26.2356 7.16671 27.5074 7.16671 28.8335V35.5002H3.83337V28.8335C3.83337 26.6234 4.71135 24.5037 6.27415 22.9409C7.83695 21.3781 9.95657 20.5002 12.1667 20.5002C14.3768 20.5002 16.4965 21.3781 18.0593 22.9409C19.6221 24.5037 20.5 26.6234 20.5 28.8335V35.5002H17.1667Z" fill="#FAFAFA"/></g><defs><clipPath id="clip0_86_8604"><rect width="40" height="40" fill="white" transform="translate(0.5 0.5)"/></clipPath></defs></svg>
                                        `} />
                                            <Text style={[componentStyle.Os32Bold, { color: colorStyle.tan1 }]}>{currentUser.jobAttempt ? currentUser.jobAttempt.length : 0}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ borderRadius: vw(7.5), marginBottom: vw(5), width: '90%', alignSelf: 'center' }}>
                        <View style={{ borderTopRightRadius: vw(7.5), borderTopLeftRadius: vw(7.5), backgroundColor: colorStyle.white }}>

                            <View style={[styles.flexCol, styles.gap4vw, { paddingVertical: vw(5), paddingHorizontal: vw(6.5), }]}>
                                <Text style={[componentStyle.Os20Bold, { color: colorStyle.black }]}>Cài đặt</Text>
                                <TouchableOpacity style={[{ borderBottomWidth: 1, borderColor: colorStyle.grey }]}
                                    onPress={() => { }}>
                                    <Text style={[componentStyle.Mon14Reg, { color: colorStyle.darkGray, paddingVertical: vw(2.5) }]}>Đổi mật khẩu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, { borderBottomWidth: 1, borderColor: colorStyle.grey }]}
                                    onPress={() => { }}>
                                    <Text style={[componentStyle.Mon14Reg, { color: colorStyle.darkGray, paddingVertical: vw(2.5) }]}>Thông báo qua email </Text>
                                    <Switch
                                        trackColor={{ false: colorStyle.grey, true: '#81b0ff' }}
                                        thumbColor={allowEmailNotification ? colorStyle.blue1 : colorStyle.darkGray}
                                        ios_backgroundColor={colorStyle.blue3}
                                        onValueChange={() => { setAllowEmailNotification(!allowEmailNotification) }}
                                        value={allowEmailNotification}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={[{ borderBottomWidth: 1, borderColor: colorStyle.grey }]}
                                    onPress={() => { }}>
                                    <Text style={[componentStyle.Mon14Reg, { color: colorStyle.darkGray, paddingVertical: vw(2.5) }]}>Điều khoản dịch vụ </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[{ borderBottomWidth: 1, borderColor: colorStyle.grey }]}
                                    onPress={() => { }}>
                                    <Text style={[componentStyle.Mon14Reg, { color: colorStyle.darkGray, paddingVertical: vw(2.5) }]}>Trợ giúp </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[{ borderBottomWidth: 1, borderColor: colorStyle.grey }]}
                                    onPress={() => { }}>
                                    <Text style={[componentStyle.Mon14Reg, { color: colorStyle.darkGray, paddingVertical: vw(2.5) }]}>Đánh giá ứng dụng </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[{ borderBottomWidth: 1, borderColor: colorStyle.grey }]}
                                    onPress={async () => {
                                        const result = await logoutUser();
                                        if (result.success) {
                                            navigation.navigate('LogReg');
                                        } else {
                                            alert('Đăng xuất thất bại');
                                        }
                                    }}>
                                    <Text style={[componentStyle.Mon14Reg, { color: colorStyle.darkGray, paddingVertical: vw(2.5) }]}>Đăng xuất </Text>
                                </TouchableOpacity>
                            </View>
                            {marginBottomForScrollView()}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Setting;