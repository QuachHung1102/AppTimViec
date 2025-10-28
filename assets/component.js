import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, FlatList, StatusBar, Switch, ScrollView, } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./stylesheet";
import { vw, vh, vmax, vmin } from "react-native-expo-viewport-units";
import componentStyle, { colorStyle } from './componentStyleSheet';
import Svg, { SvgXml } from 'react-native-svg';
import { searchIcon, infoIcon, leftArrow, shareIcon, heartDouble, bookmark, homeIcon, notiBell } from "./svgXml";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import DATA, { retrieveData } from '../assets/DATA.js';
import { useNavigatio, NavigationContainer } from '@react-navigation/native';

export const searchNav = (header, icon, environmentColor, toggleModal, backgroundColor) => {
    const [search, setSearch] = React.useState("");
    const [searchBar, setSearchBar] = React.useState(false);
    const navigation = useNavigation();

    return (
        <View style={[styles.positionRelative, { zIndex: 10 }]}>
            <View style={[styles.dFlex, styles.flexRow, styles.w100, styles.justifyContentSpaceBetween, styles.gap4vw, styles.alignItemsCenter, { backgroundColor: backgroundColor ? backgroundColor : null, paddingBottom: vw(5), paddingTop: vw(2), paddingHorizontal: vw(6.5), borderBottomRightRadius: vw(5), borderBottomLeftRadius: vw(5) }]}>
                {header ?
                    <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1vw,]}>
                        {icon ? icon : null}
                        <Text style={[componentStyle.Os20Bold, { color: colorStyle.white, fontSize: vw(7), }]}>{header}</Text>
                    </View>
                    :
                    <TouchableOpacity
                        style={[{
                            width: vw(10), height: vw(10), borderRadius: vw(1.5), backgroundColor: null,
                        },
                        styles.alignItemsCenter, styles.justifyContentCenter]}

                        onPress={() => { navigation.goBack() }}>
                        {leftArrow()}
                    </TouchableOpacity>}
                {toggleModal ?
                    <View style={[styles.dFlex, styles.flexRow, styles.alignItemsCenter, styles.justifyContentSpaceEvenly, styles.border1, { alignSelf: 'flex-end', borderColor: colorStyle.white, borderRadius: vw(3.5), backgroundColor: colorStyle.white }]}>
                        <View style={{ width: vw(10), height: vw(11), padding: vw(2) }}>{searchIcon()}</View>
                        {/* <TextInput
                        style={[styles.flex1]}
                        placeholder="Nhập từ khoá"
                        placeholderTextColor={colorStyle.grey}
                        placeholderStyle={{ fontFamily: 'OpenSans_500Medium' }}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        editable
                        numberOfLines={1}
                        onFocus={() => setSearchBar(true)}
                        onBlur={() => setSearchBar(false)}
                    /> */}
                    </View> : null}

            </View>
            <View style={[styles.w100, styles.h100, styles.positionAbsolute, { zIndex: -1, backgroundColor: environmentColor }]}></View>
        </View>
    );
}

export const navTopBar = ([w, h], environmentColor, item, fnc) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.positionRelative, { zIndex: 10 }]}>
            <View style={[styles.dFlex, styles.flexRow, styles.w100, styles.justifyContentSpaceBetween, styles.gap4vw, styles.alignItemsCenter, { backgroundColor: null, paddingBottom: vw(5), paddingTop: vw(2), paddingHorizontal: vw(6.5), borderBottomRightRadius: vw(5), borderBottomLeftRadius: vw(5) }]}>
                <TouchableOpacity
                    style={[{
                        padding: vw(2), borderRadius: vw(1.5), backgroundColor: null,
                    },
                    styles.alignItemsCenter, styles.justifyContentCenter, styles.flexRow,]}

                    onPress={() => { navigation.goBack() }}>
                    {leftArrow(w, h)}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[{
                        padding: vw(2), borderRadius: vw(1.5), backgroundColor: null,
                    },
                    styles.alignItemsCenter, styles.justifyContentCenter, styles.flexRow,]}
                    onPress={() => { fnc }}>
                    {item}
                </TouchableOpacity>
            </View>
            <View style={[styles.w100, styles.h100, styles.positionAbsolute, { zIndex: -1, backgroundColor: environmentColor }]}></View>
        </View>
    );
}

export const gradientRectangle = () => {
    const date = new Date();
    const { currentUser } = DATA();

    return (
        <View style={[styles.positionRelative]}>
            <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentSpaceBetween, styles.gap4vw, { paddingVertical: vw(1.5), paddingHorizontal: vw(2.5), borderRadius: vw(12.5), backgroundColor: colorStyle.white }]}>

                <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap4vw,]}>
                    <Image source={require('../assets/images/placeholder.jpg')} style={[{ width: vw(17.5), height: vw(17.5), borderRadius: vw(100), borderWidth: vw(0.5), borderColor: colorStyle.blue2 }]} />
                    <View>
                        <Text style={[componentStyle.Mon12Bold, { color: colorStyle.darkGray }]}>{date.getHours() < 5 ? 'Chào buổi tối' : date.getHours() < 12 ? 'Chào buổi sáng' : date.getHours() < 18 ? 'Chào buổi chiều' : 'Chào buổi tối'}</Text>
                        <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4, }]}>{currentUser.name}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.shadowW0H1Black, { margin: vw(4), borderRadius: vw(100), padding: vw(2.5), backgroundColor: colorStyle.blue3 }]}>
                    {notiBell(false, vw(7.5), vw(7.5))}
                </TouchableOpacity>

            </View>
            <View style={[styles.flex1, styles.w100, styles.h100, styles.positionAbsolute, { borderRadius: vw(12.5), zIndex: -1, backgroundColor: colorStyle.blue1, top: vw(0.5) }]}></View>
        </View>
    )
}

export const jobNews1 = (navigation) => {
    let { job } = DATA();
    const [numberToRender, setNumberToRender] = useState(4);
    const [isPressedAll, setIsPressedAll] = useState(false);
    const [isPressedMore, setIsPressedMore] = useState(false);
    if (numberToRender < job.length) {
        () => setIsPressedMore(false);
    } else {
        () => setIsPressedMore(true);
    }
    const Item = ({ item }) => {
        const [isBookmarked, setIsBookmarked] = useState(false);
        const navigation = useNavigation();
        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate('JobDetail', { item: item, bookmarkStatus: isBookmarked }) }}
                id={item.id} style={[styles.flexRow, styles.gap4vw, styles.borderRadius16, styles.justifyContentSpaceBetween, styles.flex1, componentStyle.shadowW0H1B1S0, { paddingVertical: vw(2.5), borderWidth: vw(0.5), borderColor: colorStyle.blue2, paddingLeft: vw(2.5), paddingRight: vw(5), marginBottom: vw(5), backgroundColor: colorStyle.white }]}>
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
                            onPress={() => { setIsBookmarked(!isBookmarked) }}
                        >
                            {bookmark(isBookmarked, vw(7.5), vw(7.5))}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setIsBookmarked(!isBookmarked) }}
                        >
                            {shareIcon(vw(6), vw(6))}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.flex1]}>
            <TouchableOpacity
                onPress={() => {
                    if (!isPressedAll) {
                        setIsPressedAll(true);
                        setNumberToRender(job.length);
                    } else {
                        setIsPressedAll(false);
                        setNumberToRender(4);
                    }
                }}
                style={[styles.paddingH2vw, styles.paddingBottom2vw, styles.marginBottom2vw, { alignSelf: 'flex-end', top: -vw(2) }]}>
                <Text style={[componentStyle.Mon12Bold]}>{!isPressedAll ? `Xem tất cả` : `Thu gọn`}</Text>
            </TouchableOpacity>
            {job.slice(0, numberToRender).map((item, index) => (
                <Item key={index} item={item} />
            ))}
            <TouchableOpacity
                onPress={() => {
                    if (numberToRender < job.length) {
                        setNumberToRender(numberToRender + 3);
                    } else if (numberToRender <= job.length) {
                        setIsPressedMore(true);
                        setNumberToRender(numberToRender + 3);
                    } else {
                        setIsPressedMore(false);
                        setNumberToRender(4);
                    }

                }}
                style={[styles.alignSelfCenter, styles.w60, styles.hAuto, styles.dFlex, styles.flexRow, styles.justifyContentCenter, styles.alignItemsCenter, styles.paddingV4vw, { backgroundColor: colorStyle.blue2, borderRadius: vw(4), }]}>
                <Text style={[componentStyle.Mon12Bold, { color: colorStyle.white }]}>{!isPressedMore ? `Xem thêm` : `Thu gọn`}</Text>
            </TouchableOpacity>
        </View>
    );
}


export const mostCompany = () => {
    const { company } = DATA();
    const navigation = useNavigation();
    const [numberToRender, setNumberToRender] = useState(4);
    const [isPressedAll, setIsPressedAll] = useState(false);
    const [isPressedMore, setIsPressedMore] = useState(false);
    if (numberToRender < company.length) {
        () => setIsPressedMore(false);
    } else {
        () => setIsPressedMore(true);
    }
    const Item = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate('CompanyDetail', { item: item }) }}
                style={[styles.flexCol, styles.alignItemsCenter, styles.justifyContentSpaceBetween, { backgroundColor: colorStyle.white, borderRadius: vw(2.5), padding: vw(2.5), paddingBottom: vw(4), marginBottom: vw(6) }]}>
                <Image source={item.imageCompany[0]} style={[{ width: vw(35), height: vw(25), borderRadius: vw(2.5) }]} />
                <Text style={[componentStyle.Os16Bold, styles.textCenter, { width: vw(35), color: colorStyle.blue4 }]}>{item.nameCompany}</Text>
                <Text numberOfLines={1} style={[componentStyle.Mon10Bold]}>{item.majorCompany}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.flex1]}>
            <TouchableOpacity
                onPress={() => {
                    if (!isPressedAll) {
                        setIsPressedAll(true);
                        setNumberToRender(company.length);
                    } else {
                        setIsPressedAll(false);
                        setNumberToRender(4);
                    }
                }}
                style={[styles.paddingH2vw, styles.paddingBottom2vw, styles.marginBottom2vw, { alignSelf: 'flex-end', }]}>
                <Text style={[componentStyle.Mon12Bold]}>{!isPressedAll ? `Xem tất cả` : `Thu gọn`}</Text>
            </TouchableOpacity>
            <View style={[styles.flexRow, styles.flexWrap, styles.justifyContentSpaceEvenly,]}>
                {company.slice(0, numberToRender).map((item, index) => (
                    <Item key={index} item={item} />
                ))}
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (numberToRender < company.length) {
                        setNumberToRender(numberToRender + 4);
                    } else if (numberToRender == company.length) {
                        setIsPressedMore(true);
                        setNumberToRender(numberToRender + 4);
                    } else {
                        setIsPressedMore(false);
                        setNumberToRender(4);
                    }

                }}
                style={[styles.alignSelfCenter, styles.w60, styles.hAuto, styles.dFlex, styles.flexRow, styles.justifyContentCenter, styles.alignItemsCenter, styles.paddingV4vw, { backgroundColor: colorStyle.blue2, borderRadius: vw(4), }]}>
                <Text style={[componentStyle.Mon12Bold, { color: colorStyle.white }]}>{!isPressedMore ? `Xem thêm` : `Thu gọn`}</Text>
            </TouchableOpacity>
        </View>
    );
}

export const suitableJob = () => {
    let { job } = DATA();
    let { currentUser } = DATA();
    let currentUserDisable = currentUser.disable;
    const navigation = useNavigation();
    const [numberToRender, setNumberToRender] = useState(4);
    const [isPressedAll, setIsPressedAll] = useState(false);
    const [isPressedMore, setIsPressedMore] = useState(false);
    if (numberToRender < job.length) {
        () => setIsPressedMore(false);
    } else {
        () => setIsPressedMore(true);
    }
    const Item = ({ item }) => {
        const [isBookmarked, setIsBookmarked] = useState(false);

        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate('JobDetail', { item: item, bookmarkStatus: isBookmarked }) }}
                id={item.id} style={[styles.flexRow, styles.gap4vw, styles.borderRadius16, styles.justifyContentSpaceBetween, styles.flex1, componentStyle.shadowW0H1B1S0, { paddingVertical: vw(2.5), borderWidth: vw(0.5), borderColor: colorStyle.blue2, paddingLeft: vw(2.5), paddingRight: vw(5), marginBottom: vw(5), backgroundColor: colorStyle.white }]}>
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
                            onPress={() => { setIsBookmarked(!isBookmarked) }}
                        >
                            {bookmark(isBookmarked, vw(7.5), vw(7.5))}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setIsBookmarked(!isBookmarked) }}
                        >
                            {shareIcon(vw(6), vw(6))}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.flex1]}>
            <View style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsBaseline]}>
                <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue1, }]}>Gợi ý việc làm phù hợp</Text>
                <TouchableOpacity
                    onPress={() => {
                        if (!isPressedAll) {
                            setIsPressedAll(true);
                            setNumberToRender(job.length);
                        } else {
                            setIsPressedAll(false);
                            setNumberToRender(4);
                        }
                    }}
                    style={[styles.paddingH2vw, styles.paddingBottom2vw, styles.marginBottom2vw,]}>
                    <Text style={[componentStyle.Mon12Bold]}>{!isPressedAll ? `Xem tất cả` : `Thu gọn`}</Text>
                </TouchableOpacity>
            </View>
            {
                currentUserDisable ?
                    job.filter(item => item.acceptDisable.some(val => currentUserDisable.indexOf() !== -1)).slice(0, numberToRender).map((item, index) => (
                        <Item key={index} item={item} />
                    ))
                    :
                    job.slice(0, numberToRender).map((item, index) => (
                        <Item key={index} item={item} />
                    ))
            }
            <TouchableOpacity
                onPress={() => {
                    if (numberToRender < job.length) {
                        setNumberToRender(numberToRender + 4);
                    } else if (numberToRender == job.length) {
                        setIsPressedMore(true);
                        setNumberToRender(numberToRender + 4);
                    } else {
                        setIsPressedMore(false);
                        setNumberToRender(4);
                    }

                }}
                style={[styles.alignSelfCenter, styles.w60, styles.hAuto, styles.dFlex, styles.flexRow, styles.justifyContentCenter, styles.alignItemsCenter, styles.paddingV4vw, { backgroundColor: colorStyle.blue2, borderRadius: vw(4), }]}>
                <Text style={[componentStyle.Mon12Bold, { color: colorStyle.white }]}>{!isPressedMore ? `Xem thêm` : `Thu gọn`}</Text>
            </TouchableOpacity>
        </View>
    );
}

export const notiModal = (toggle = false, topLeftNormal, centerBig, centerNormal, actionMessage, fnc, onClose) => {
    // const [isPressed, setIsPressed] = useState(toggle);
    if (toggle) {
        return (
            <View style={[styles.positionAbsolute, styles.w100vw, styles.h100vh, styles.flexRow, styles.justifyContentCenter, styles.alignItemsCenter, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
                <View style={[styles.w90, styles.flexCol, styles.gap2vw, styles.justifyContentCenter, styles.alignItemsCenter, { paddingHorizontal: vw(5), paddingVertical: vw(4), borderRadius: vw(4), backgroundColor: colorStyle.white }]}>
                    {{ topLeftNormal } ? <Text style={[componentStyle.Mon14Bold, { color: colorStyle.black }]}>{topLeftNormal}</Text> : null}
                    {{ centerBig } ? <Text style={[componentStyle.Os24Bold, { color: colorStyle.blue4 }]}>{centerBig}</Text> : null}
                    {{ centerNormal } ? <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black }]}>{centerNormal}</Text> : null}
                    <View style={[styles.flexRow, styles.justifyContentCenter, styles.gap4vw, { paddingVertical: vw(2.5) }]}>
                        <TouchableOpacity
                            onPress={() => { onClose() }}
                            style={[{ borderWidth: vw(0.5), borderColor: colorStyle.blue1, borderRadius: vw(1.5), paddingVertical: vw(2.5), paddingHorizontal: vw(5) }]}>
                            <Text style={[componentStyle.Mon14Bold, { color: colorStyle.black }]}>Quay lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{ borderWidth: vw(0.5), borderColor: colorStyle.blue1, borderRadius: vw(1.5), paddingVertical: vw(2.5), paddingHorizontal: vw(5), backgroundColor: colorStyle.blue1 }]}
                            onPress={() => { fnc() }}>
                            <Text style={[componentStyle.Mon14Bold, { color: colorStyle.tan1 }]}>{actionMessage}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }
}

export const marginBottomForScrollView = () => {
    return (
        <View style={{ height: vh(5), opacity: 0 }}></View>
    )
}
