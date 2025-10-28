import { colorStyle, useCustomFonts } from "../assets/componentStyleSheet";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, StatusBar, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { vw, vh, vmax, vmin } from "react-native-expo-viewport-units";
import componentStyle from "../assets/componentStyleSheet";
import styles from "../assets/stylesheet";
import { gradientRectangle, jobNews1, marginBottomForScrollView, mostCompany, searchNav, suitableJob } from "../assets/component";
import { editable, heartDouble, userIcon } from "../assets/svgXml";
import DATA, { fetchUserData } from "../assets/DATA";
import DateTimePicker from '@react-native-community/datetimepicker';

import { getCurrentUser, updateUser } from '../utils/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function User({ navigation }) {
    const { currentUser, isLoading } = DATA();
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [userData, setUserData] = React.useState(null);
    const [userDataLoaded, setUserDataLoaded] = React.useState(false);

    const fetchUserInfo = async () => {
        try {
            const user = await getCurrentUser();
            if (user) {
                setUserData(user);
                setNameEdit(user.name || '');
                setDobEdit(user.dob || '');
                setShowDatePicker(false);
                setSelectedDate(new Date());
                setSexEdit(user.sex);
                setEmailEdit(user.email || '');
                setPhoneEdit(user.phone || '');
                setAddressEdit(user.address || '');
                setDisableEdit(user.disable || []);
                setIntroEdit(user.intro || '');
                setExpEdit(user.exp || []);
                setEducationEdit(user.education || []);
                setWishnessEdit(user.wishness || '');
                setSkillEdit(user.skill || []);
                setUserDataLoaded(true);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (!userDataLoaded && isEditMode) {
            fetchUserInfo();
        }
    }, [userDataLoaded, isEditMode]);

    const [nameEdit, setNameEdit] = React.useState(currentUser?.name || '');
    const [dobEdit, setDobEdit] = useState(currentUser?.dob || '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sexEdit, setSexEdit] = React.useState(currentUser?.sex);
    const [emailEdit, setEmailEdit] = React.useState(currentUser?.email || '');
    const [phoneEdit, setPhoneEdit] = React.useState(currentUser?.phone || '');
    const [addressEdit, setAddressEdit] = React.useState(currentUser?.address || '');
    const [disableEdit, setDisableEdit] = React.useState(currentUser?.disable || []);
    const [introEdit, setIntroEdit] = React.useState(currentUser?.intro || '');
    const [expEdit, setExpEdit] = React.useState(currentUser?.exp || []);
    const [educationEdit, setEducationEdit] = React.useState(currentUser?.education || []);
    const [wishnessEdit, setWishnessEdit] = React.useState(currentUser?.wishness || '');
    const [skillEdit, setSkillEdit] = React.useState(currentUser?.skill || []);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setSelectedDate(selectedDate);
            setDobEdit(`${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);
        }
    };
    console.log(disableEdit);

    let allData = {
        nameEdit: nameEdit,
        dobEdit: dobEdit,
        showDatePicker: showDatePicker,
        selectedDate: selectedDate,
        sexEdit: sexEdit,
        emailEdit: emailEdit,
        phoneEdit: phoneEdit,
        addressEdit: addressEdit,
        disableEdit: disableEdit,
        introEdit: introEdit,
        expEdit: expEdit,
        educationEdit: educationEdit,
        wishnessEdit: wishnessEdit,
        skillEdit: skillEdit,
    }

    // update data to firebase
    const updateData = async () => {
        try {
            const result = await updateUser({
                name: nameEdit,
                dob: dobEdit,
                sex: sexEdit,
                email: emailEdit,
                phone: phoneEdit,
                address: addressEdit,
                disable: disableEdit,
                intro: introEdit,
                exp: expEdit,
                education: educationEdit,
                wishness: wishnessEdit,
                skill: skillEdit,
            });

            if (result.success) {
                alert('Cập nhật thành công!');
                await fetchUserData();
            } else {
                alert(result.error || 'Cập nhật thất bại');
            }
        } catch (error) {
            console.log(error);
            alert('Có lỗi xảy ra khi cập nhật');
        }
    }
    const editMode = () => {
        return (
            <ScrollView style={[styles.flexRow, styles.w90vw, { gap: vw(2), borderRadius: vw(5), borderWidth: vw(0.5), borderColor: colorStyle.blue4, paddingVertical: vw(4), paddingHorizontal: vw(5), backgroundColor: colorStyle.white }]}>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), overflow: 'hidden', borderWidth: vw(0.5), borderColor: 'rgba(0,0,0,0)' }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Họ và tên: </Text>
                    <TextInput
                        style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                        placeholder="Họ và tên"
                        placeholderTextColor={colorStyle.grey}
                        onChangeText={text => setNameEdit(text)}
                        multiline={false}
                        value={nameEdit}
                    />
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), overflow: 'hidden', borderWidth: vw(0.5), borderColor: 'rgba(0,0,0,0)' }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Ngày sinh: </Text>
                    <View style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter]}>
                        <TouchableOpacity onPress={() => { setShowDatePicker(true) }} style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}><Text style={[componentStyle.Mon14Reg, { color: colorStyle.black, }]}>{dobEdit}</Text></TouchableOpacity>
                        {showDatePicker ?
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                maximumDate={new Date(2100, 10, 20)}
                                minimumDate={new Date(1900, 10, 20)}
                                onChange={handleDateChange}
                            />
                            : null}
                    </View>
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), overflow: 'hidden', borderWidth: vw(0.5), borderColor: 'rgba(0,0,0,0)' }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Giới tính: </Text>
                    <TouchableOpacity style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, { backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]} onPress={() => sexEdit == null ? setSexEdit(1) : sexEdit == 1 ? setSexEdit(0) : setSexEdit(null)}>
                        <Text style={[componentStyle.Mon14Reg, { color: colorStyle.black, }]}>{sexEdit == null ? 'Không chia sẻ' : sexEdit == 1 ? 'Nam' : 'Nữ'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), overflow: 'hidden', borderWidth: vw(0.5), borderColor: 'rgba(0,0,0,0)' }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Email: </Text>
                    <TextInput
                        style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                        placeholder="Email của bạn"
                        placeholderTextColor={colorStyle.grey}
                        onChangeText={text => setEmailEdit(text)}
                        multiline={false}
                        value={emailEdit}
                    />
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), overflow: 'hidden', borderWidth: vw(0.5), borderColor: 'rgba(0,0,0,0)' }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Số điện thoại: </Text>
                    <TextInput
                        style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                        placeholder="Số điện thoại"
                        placeholderTextColor={colorStyle.grey}
                        onChangeText={text => setPhoneEdit(text)}
                        multiline={false}
                        value={phoneEdit}
                        keyboardType="numeric"
                    />
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), overflow: 'hidden', borderWidth: vw(0.5), borderColor: 'rgba(0,0,0,0)' }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Địa chỉ: </Text>
                    <TextInput
                        style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                        placeholder="Địa chỉ"
                        placeholderTextColor={colorStyle.grey}
                        onChangeText={text => setAddressEdit(text)}
                        multiline={false}
                        value={addressEdit}
                    />
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Khối lượng công việc có thể đáp ứng: </Text>
                    {disableEdit ?
                        disableEdit.map((item, index) => (
                            <View key={index} style={[styles.w90, styles.gap1vw, styles.alignSelfCenter, styles.marginVertical1vw]}>
                                <TextInput
                                    style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.blue4, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                                    placeholder="Khối lượng công việc có thể đáp ứng"
                                    onChangeText={(text) => {
                                        const updatedDisableEdit = [...disableEdit]; // Create a copy of the array
                                        updatedDisableEdit[index] = text; // Modify the copy
                                        setDisableEdit(updatedDisableEdit); // Set the updated array as the state
                                    }}
                                    value={item}
                                    multiline={false}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        const updatedDisableEdit = [...disableEdit]; // Create a copy of the array
                                        updatedDisableEdit.splice(index, 1); // Modify the copy
                                        setDisableEdit(updatedDisableEdit); // Set the updated array as the state
                                    }}
                                    style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, { alignSelf: 'flex-end', backgroundColor: colorStyle.white, paddingHorizontal: vw(2.5), paddingVertical: vw(2), borderRadius: vw(1) }]}
                                >
                                    <Text style={[componentStyle.Mon14Reg, { color: 'red', }]}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                        : null}
                    <TouchableOpacity style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, styles.w80, styles.alignSelfCenter, { backgroundColor: colorStyle.blue2, paddingHorizontal: vw(2.5), paddingVertical: vw(2), borderRadius: vw(4) }]} onPress={() => setDisableEdit([...disableEdit, disableEdit])}>
                        <Text style={[componentStyle.Mon14Reg, styles.textCenter, styles.w100, { color: colorStyle.white, }]}>Thêm</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), overflow: 'hidden', borderWidth: vw(0.5), borderColor: 'rgba(0,0,0,0)' }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Giới thiệu bản thân: </Text>
                    <TextInput
                        style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                        placeholder="Giới thiệu bản thân"
                        placeholderTextColor={colorStyle.grey}
                        onChangeText={text => setIntroEdit(text)}
                        multiline={true}
                        value={introEdit}
                    />
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), overflow: 'hidden', }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Kinh nghiệm làm việc: </Text>
                    {expEdit
                        ? expEdit.map((item, index) => (
                            <View key={index} style={[styles.w90, styles.gap1vw, styles.alignSelfCenter, styles.marginVertical1vw]}>
                                <View style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter]}>
                                    <TextInput
                                        style={[componentStyle.Mon14Reg, styles.w45, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                                        placeholder="Từ năm"
                                        onChangeText={(text) => {
                                            const updatedExpEdit = [...expEdit]; // Create a copy of the array
                                            updatedExpEdit[index].from = text; // Modify the copy
                                            setExpEdit(updatedExpEdit); // Set the updated array as the state
                                        }}
                                        value={item.from}
                                        keyboardType="numeric"
                                    />
                                    <TextInput
                                        style={[componentStyle.Mon14Reg, styles.w45, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                                        placeholder="Đến năm"
                                        onChangeText={(text) => {
                                            const updatedExpEdit = [...expEdit];
                                            updatedExpEdit[index].to = text;
                                            setExpEdit(updatedExpEdit);
                                        }}
                                        value={item.to}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <TextInput
                                    style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                                    placeholder="Tên công ty"
                                    onChangeText={(text) => {
                                        const updatedExpEdit = [...expEdit];
                                        updatedExpEdit[index].company = text;
                                        setExpEdit(updatedExpEdit);
                                    }}
                                    value={item.company}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        const updatedExpEdit = [...expEdit]; // Create a copy of the array
                                        updatedExpEdit.splice(index, 1); // Modify the copy
                                        setExpEdit(updatedExpEdit); // Set the updated array as the state
                                    }}
                                    style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, { alignSelf: 'flex-end', backgroundColor: colorStyle.white, paddingHorizontal: vw(2.5), paddingVertical: vw(2), borderRadius: vw(1) }]}
                                >
                                    <Text style={[componentStyle.Mon14Reg, { color: 'red', }]}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                        : null}

                    <TouchableOpacity
                        style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, styles.w80, styles.alignSelfCenter, { backgroundColor: colorStyle.blue2, paddingHorizontal: vw(2.5), paddingVertical: vw(2), borderRadius: vw(4) }]}
                        onPress={() => setExpEdit([...expEdit, {}])}>
                        <Text style={[componentStyle.Mon14Reg, styles.textCenter, styles.w100, { color: colorStyle.white, }]}>Thêm</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Học vấn: </Text>
                    {educationEdit ?
                        educationEdit.map((item, index) => (
                            <View key={index} style={[styles.w90, styles.gap1vw, styles.alignSelfCenter, styles.marginVertical1vw]}>
                                <TextInput
                                    style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.blue4, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                                    placeholder="Tên trường"
                                    onChangeText={(text) => {
                                        const updatedEducationEdit = [...educationEdit]; // Create a copy of the array
                                        updatedEducationEdit[index] = text; // Modify the copy
                                        setEducationEdit(updatedEducationEdit); // Set the updated array as the state
                                    }}
                                    value={item}
                                    multiline={false}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        const updatedEducationEdit = [...educationEdit]; // Create a copy of the array
                                        updatedEducationEdit.splice(index, 1); // Modify the copy
                                        setEducationEdit(updatedEducationEdit); // Set the updated array as the state
                                    }}
                                    style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, { alignSelf: 'flex-end', backgroundColor: colorStyle.white, paddingHorizontal: vw(2.5), paddingVertical: vw(2), borderRadius: vw(1) }]}
                                >
                                    <Text style={[componentStyle.Mon14Reg, { color: 'red', }]}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                        : null}
                    <TouchableOpacity style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, styles.w80, styles.alignSelfCenter, { backgroundColor: colorStyle.blue2, paddingHorizontal: vw(2.5), paddingVertical: vw(2), borderRadius: vw(4) }]} onPress={() => setEducationEdit([...educationEdit, educationEdit])}>
                        <Text style={[componentStyle.Mon14Reg, styles.textCenter, styles.w100, { color: colorStyle.white, }]}>Thêm</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Nguyện vọng bản thân: </Text>
                    <TextInput
                        style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.blue4, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                        placeholder="Nguyện vọng bản thân"
                        placeholderTextColor={colorStyle.grey}
                        onChangeText={text => setWishnessEdit(text)}
                        multiline={true}
                        value={wishnessEdit}
                    />
                </View>
                <View style={[styles.w80vw, styles.flexCol, styles.gap2vw, { marginVertical: vw(2), }]}>
                    <Text style={[componentStyle.Os20Bold, , styles.w100, { color: colorStyle.blue4, }]}>Kĩ năng: </Text>
                    {skillEdit ?
                        skillEdit.map((item, index) => (
                            <View key={index} style={[styles.w90, styles.gap1vw, styles.alignSelfCenter, styles.marginVertical1vw]}>
                                <TextInput
                                    style={[componentStyle.Mon14Reg, styles.w100, { color: colorStyle.black, backgroundColor: colorStyle.white, borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.blue4, paddingHorizontal: vw(2.5), paddingVertical: vw(2) }]}
                                    placeholder="Kĩ năng"
                                    onChangeText={(text) => {
                                        const updatedSkillEdit = [...skillEdit]; // Create a copy of the array
                                        updatedSkillEdit[index] = text; // Modify the copy
                                        setSkillEdit(updatedSkillEdit); // Set the updated array as the state
                                    }}
                                    value={item}
                                    multiline={false}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        const updatedSkillEdit = [...skillEdit]; // Create a copy of the array
                                        updatedSkillEdit.splice(index, 1); // Modify the copy
                                        setSkillEdit(updatedSkillEdit); // Set the updated array as the state
                                    }}
                                    style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, { alignSelf: 'flex-end', backgroundColor: colorStyle.white, paddingHorizontal: vw(2.5), paddingVertical: vw(2), borderRadius: vw(1) }]}
                                >
                                    <Text style={[componentStyle.Mon14Reg, { color: 'red', }]}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                        : null}
                    <TouchableOpacity style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, styles.w80, styles.alignSelfCenter, { backgroundColor: colorStyle.blue2, paddingHorizontal: vw(2.5), paddingVertical: vw(2), borderRadius: vw(4) }]} onPress={() => setSkillEdit([...skillEdit, skillEdit])}>
                        <Text style={[componentStyle.Mon14Reg, styles.textCenter, styles.w100, { color: colorStyle.white, }]}>Thêm</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => { console.log(allData); updateData() }}
                    style={[styles.flex1, styles.borderRadius16, { backgroundColor: colorStyle.blue1, paddingVertical: vw(2.5), marginTop: vw(5) }]}>
                    <Text style={[styles.textCenter, componentStyle.Os20Bold, { color: colorStyle.tan1, }]}>Lưu hồ sơ</Text>
                </TouchableOpacity>


            </ScrollView>
        )
    }


    return (
        <SafeAreaView style={[styles.flex1, { backgroundColor: colorStyle.blue1 }]} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={colorStyle.blue1} barStyle='light-content' />
            {searchNav('Người dùng', userIcon(vw(9), vw(9)), colorStyle.blue3, null, colorStyle.blue1)}

            {isLoading ? (
                <View style={[styles.flex1, styles.justifyContentCenter, styles.alignItemsCenter, { backgroundColor: colorStyle.blue3 }]}>
                    <ActivityIndicator size="large" color={colorStyle.blue1} />
                    <Text style={[componentStyle.Mon14Reg, { marginTop: 10, color: colorStyle.blue4 }]}>Đang tải...</Text>
                </View>
            ) : (
            <ScrollView style={[styles.flex1, styles.flexCol, styles.gap5vw, styles.w100, styles.alignSelfCenter, { backgroundColor: colorStyle.blue3, padding: '5%' }]}>
                <View>
                    <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap4vw, { paddingVertical: vw(2.75), paddingHorizontal: vw(4), borderRadius: vw(5), backgroundColor: colorStyle.white }]}>
                        <Image source={require('../assets/images/placeholder.jpg')} style={[{ width: vw(17.5), height: vw(17.5), borderRadius: vw(100), borderWidth: vw(0.5), borderColor: colorStyle.blue2 }]} />
                        <View style={[styles.flexCol, styles.gap2vw]}>
                            <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4, }]}>{currentUser?.name || 'Người dùng'}</Text>
                            <Text style={[componentStyle.Mon12Bold, { color: colorStyle.darkGray, }]}>{currentUser?.id || 'ID'}</Text>
                            <Text style={[componentStyle.Mon10Reg, { color: colorStyle.darkGray, }]}>Tham gia từ: {currentUser?.joinDate || 'N/A'}</Text>
                        </View>
                    </View>
                    <View style={[styles.flex1, styles.w100, styles.h100, styles.positionAbsolute, { borderRadius: vw(5), zIndex: -1, backgroundColor: colorStyle.grey, top: vw(0.75) }]}></View>
                </View>

                <View style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter, { paddingVertical: vw(2.5) }]}>
                    <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4, }]}>Hồ sơ của bạn</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setIsEditMode(!isEditMode)
                            if (isEditMode) {
                                fetchUserData();
                            }
                        }}
                        style={[styles.flexRow, styles.justifyContentSpaceBetween, styles.alignItemsCenter,]}>
                        <Text style={[componentStyle.Mon10Bold, { color: colorStyle.black }]}>Chỉnh sửa hồ sơ</Text>
                        {editable(vw(6), vw(6))}
                    </TouchableOpacity>
                </View>

                {isEditMode ?
                    editMode()
                    :
                    <View style={[styles.flexRow, { gap: vw(2), borderRadius: vw(5), borderWidth: vw(0.5), borderColor: colorStyle.blue4, paddingVertical: vw(4), paddingHorizontal: vw(5), backgroundColor: colorStyle.white }]}>
                        <View style={[styles.w60, styles.flexCol, styles.gap5vw,]}>
                            <Image source={currentUser.avatar} style={[styles.alignSelfCenter, { width: vw(25), height: vw(25), borderRadius: vw(2.5) }]} />
                            <Text style={[componentStyle.Os20Bold, styles.alignSelfCenter, { color: colorStyle.black, }]}>{currentUser.name}</Text>
                            <Text style={[componentStyle.Mon12Bold, { color: colorStyle.grey }]}>{currentUser.intro}</Text>
                            <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4, }]}>Kinh nghiệm làm việc</Text>
                            {currentUser.exp ?
                                currentUser.exp.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <Text style={[componentStyle.Mon12Bold, { color: colorStyle.black, }]}>Từ năm {item.from.slice(-4)} đến {item.to.slice(-4)}</Text>
                                            <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>{item.company}</Text>
                                        </View>
                                    )
                                }) :
                                <Text style={[componentStyle.Mon12Bold, { color: colorStyle.black, }]}>Chưa có kinh nghiệm làm việc</Text>
                            }

                            <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4, }]}>Tình trạng bản thân</Text>
                            <View style={[styles.flexRow, styles.alignItemsCenter]}>
                                <Text style={[componentStyle.Mon12Bold, { color: colorStyle.black, }]}>Khối lượng đáp ứng: </Text>
                                {currentUser.disable ?
                                    currentUser.disable.map((item, index) => {
                                        return (
                                            <View key={index} style={{ borderWidth: vw(0.25), borderRadius: vw(1), borderColor: colorStyle.grey, paddingHorizontal: vw(2.5), paddingVertical: vw(1) }}><Text style={[componentStyle.Mon10Reg, { color: colorStyle.blue4 }]}>{item}</Text></View>
                                        )
                                    }) :
                                    <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>Không có thông tin</Text>
                                }
                            </View>
                            <Text style={[componentStyle.Mon12Bold, { color: colorStyle.black, }]}>Nguyện vọng bản thân: </Text>
                            <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>{currentUser.wishness}</Text>
                        </View>

                        <View style={[styles.flexCol, styles.gap5vw, styles.flex1]}>
                            <Text style={[componentStyle.Os14Bold, { color: colorStyle.grey }]}>Số điện thoại</Text>
                            <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>{currentUser.phone}</Text>
                            <Text style={[componentStyle.Os14Bold, { color: colorStyle.grey }]}>Email</Text>
                            <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>{currentUser.email}</Text>
                            <Text style={[componentStyle.Os14Bold, { color: colorStyle.grey }]}>Địa chỉ</Text>
                            <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>{currentUser.address}</Text>
                            <Text style={[componentStyle.Os14Bold, { color: colorStyle.grey }]}>Ngày sinh</Text>
                            <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>{currentUser.dob}</Text>
                            <Text style={[componentStyle.Os14Bold, { color: colorStyle.grey }]}>Giới tính</Text>
                            <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>{currentUser.sex}</Text>
                            <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4, }]}>Học vấn</Text>
                            <View style={[styles.flexRow, styles.flexWrap, styles.gap2vw]}>
                                {currentUser.education ?
                                    currentUser.education.map((item, index) => {
                                        return (
                                            <Text key={index} style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>{item}</Text>
                                        )
                                    }) :
                                    <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>Chưa có thông tin</Text>
                                }
                            </View>
                            <Text style={[componentStyle.Os20Bold, { color: colorStyle.blue4, }]}>Kĩ năng</Text>
                            <View style={[styles.flexRow, styles.flexWrap, styles.gap2vw]}>
                                {currentUser.skill ?
                                    currentUser.skill.map((item, index) => {
                                        return (
                                            <Text key={index} style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>{item}</Text>
                                        )
                                    }) :
                                    <Text style={[componentStyle.Mon12Reg, { color: colorStyle.black, }]}>Chưa có thông tin</Text>
                                }
                            </View>
                        </View>
                    </View>
                }

                {/* <TouchableOpacity style={[styles.flex1, styles.borderRadius16, { backgroundColor: colorStyle.blue1, paddingVertical: vw(2.5), marginTop:vw(5) }]}>
                    <Text style={[styles.textCenter, componentStyle.Os20Bold, { color: colorStyle.tan1, }]}>Lưu hồ sơ</Text>
                </TouchableOpacity> */}
                {marginBottomForScrollView()}
            </ScrollView>
            )}
        </SafeAreaView>
    )
}
export default User;