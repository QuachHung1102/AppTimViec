import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@auth_user';
const USERS_KEY = '@users_list';

// Khởi tạo danh sách users mặc định nếu chưa có
const initializeUsers = async () => {
    try {
        const existingUsers = await AsyncStorage.getItem(USERS_KEY);
        if (!existingUsers) {
            // Tạo một user mẫu để test
            const defaultUsers = [
                {
                    id: "user_demo_1",
                    name: "Nguyễn Văn A",
                    email: "test@example.com",
                    password: "123456",
                    phone: "0123456789",
                    disable: ["Khiếm thị"],
                    joinDate: new Date().toLocaleDateString(),
                    type: "user",
                    intro: "Người dùng mẫu",
                    exp: [],
                    dob: "01/01/1990",
                    sex: 1,
                    address: "Hà Nội",
                    major: "",
                    image: [],
                    education: ["Đại học"],
                    wishness: "Tìm việc làm phù hợp",
                    jobSave: [],
                    skill: ["Tin học văn phòng"],
                    isAvailable: true,
                    letCompanyContact: true,
                    jobAttempt: [],
                    followCompany: [],
                    companyViewCount: 0,
                }
            ];
            await AsyncStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
            console.log('✅ Đã khởi tạo database với user mẫu');
            console.log('📧 Email: test@example.com');
            console.log('🔑 Password: 123456');
        }
    } catch (error) {
        console.error('Error initializing users:', error);
    }
};

// Đăng ký người dùng mới
export const registerUser = async (userData) => {
    try {
        await initializeUsers();
        
        // Lấy danh sách users hiện tại
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = JSON.parse(usersJson) || [];
        
        console.log('📝 Đăng ký user mới:', userData.email);
        
        // Kiểm tra email đã tồn tại chưa
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            console.log('⚠️ Email đã được sử dụng');
            throw new Error('Email đã được sử dụng');
        }
        
        // Tạo user mới với ID duy nhất
        const newUser = {
            ...userData,
            id: Date.now().toString(),
            joinDate: new Date().toLocaleDateString(),
            type: "user",
            intro: userData.intro || "",
            exp: [],
            dob: null,
            sex: null,
            address: '',
            major: '',
            image: [],
            education: '',
            wishness: '',
            jobSave: [],
            skill: [],
            isAvailable: true,
            letCompanyContact: true,
            jobAttempt: [],
            followCompany: [],
            companyViewCount: 0,
        };
        
        console.log('✅ User mới được tạo với ID:', newUser.id);
        
        // Thêm user mới vào danh sách
        users.push(newUser);
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
        
        // Lưu thông tin đăng nhập
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
        
        console.log('🎉 Đăng ký thành công!');
        
        return { success: true, user: newUser };
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, error: error.message };
    }
};

// Đăng nhập
export const loginUser = async (email, password) => {
    try {
        await initializeUsers();
        
        // Lấy danh sách users
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = JSON.parse(usersJson) || [];
        
        console.log('🔍 Đang tìm user với email:', email);
        console.log('📊 Tổng số users trong database:', users.length);
        
        // Tìm user với email và password khớp
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            console.log('❌ Không tìm thấy user phù hợp');
            console.log('💡 Hãy thử đăng ký tài khoản mới hoặc dùng:');
            console.log('   Email: test@example.com');
            console.log('   Password: 123456');
            throw new Error('Email hoặc mật khẩu không đúng');
        }
        
        console.log('✅ Đăng nhập thành công:', user.name);
        
        // Lưu thông tin đăng nhập
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        
        return { success: true, user };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
};

// Đăng xuất
export const logoutUser = async () => {
    try {
        await AsyncStorage.removeItem(AUTH_KEY);
        await AsyncStorage.removeItem('userData');
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
};

// Lấy thông tin user hiện tại
export const getCurrentUser = async () => {
    try {
        const userJson = await AsyncStorage.getItem(AUTH_KEY);
        if (userJson) {
            return JSON.parse(userJson);
        }
        return null;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
};

// Kiểm tra trạng thái đăng nhập
export const isAuthenticated = async () => {
    try {
        const user = await getCurrentUser();
        return user !== null;
    } catch (error) {
        console.error('Check auth error:', error);
        return false;
    }
};

// Cập nhật thông tin user
export const updateUser = async (updatedData) => {
    try {
        // Lấy user hiện tại
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new Error('Không tìm thấy người dùng');
        }
        
        // Lấy danh sách users
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = JSON.parse(usersJson) || [];
        
        // Tìm và cập nhật user
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex === -1) {
            throw new Error('Không tìm thấy người dùng');
        }
        
        // Cập nhật thông tin
        const updatedUser = { ...users[userIndex], ...updatedData };
        users[userIndex] = updatedUser;
        
        // Lưu lại
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        
        return { success: true, user: updatedUser };
    } catch (error) {
        console.error('Update user error:', error);
        return { success: false, error: error.message };
    }
};
