import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../utils/AuthService';

// Helper function để lấy user data
export const fetchUserData = async () => {
    try {
        const user = await getCurrentUser();
        if (user) {
            await AsyncStorage.setItem('userData', JSON.stringify(user));
            return user;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export const completeURIforImage = (imageURI) => {
    if (!imageURI) {
        return require('../assets/images/placeholder.jpg');
    }
    return { uri: imageURI };
}

// Hook để sử dụng trong components
const DATA = () => {
    // User placeholder - sẽ được thay thế bằng user thật từ AsyncStorage
    const placeholderUserData = {
        id: 'u1',
        name: "Nguyễn Văn A",
        dob: "01/01/2000",
        sex: "Nam",
        email: "blaaaaa@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        avatar: require('../assets/images/placeholder.jpg'),
        intro: "Tôi là Nguyễn Văn A, tôi đến từ Hà Nội",
        major: "IT",
        exp: [
            {
                from: "01/01/2021",
                to: "01/01/2021",
                company: "Công ty TNHH ABC",
            },
            {
                from: "01/01/2021",
                to: "01/01/2021",
                company: "Công ty TNHH ABC",
            },
            {
                from: "01/01/2021",
                to: "01/01/2021",
                company: "Công ty TNHH ABC",
            },
        ],
        disable: ["KT nghe",],
        image: [
            require('../assets/images/placeholder.jpg'),
            require('../assets/images/placeholder.jpg'),
            require('../assets/images/placeholder.jpg'),
        ],
        joinDate: "01/01/2021",
        education: ['thpt', 'đại học'],
        wishness: 'bla bla bla',
        jobSave: ['j3', 'j7'],
        skill: ['skill1', 'skill2', 'skill3'],
        isAvailable: true,
        letCompanyContact: true,
        jobAttempt: ['j1', 'j2',],
        followCompany: ['c1', 'c2',],
        companyViewCount: 2,
    };

    const [currentUser, setCurrentUser] = React.useState(placeholderUserData);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const user = await getCurrentUser();
                if (user) {
                    setCurrentUser(user);
                } else {
                    // Nếu chưa đăng nhập, dùng placeholder
                    setCurrentUser(placeholderUserData);
                }
            } catch (error) {
                console.error("Error loading user data:", error);
                setCurrentUser(placeholderUserData);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadUserData();
    }, []);

    let company = [
        {
            id: "c1",
            nameCompany: "Art Studio",
            fullUnitCompany: "Art Studio",
            majorCompany: "Nghệ thuật",
            fullAddressCompany: "Số 81 Trần Hưng Đạo - Hoàn Kiếm - Hà Nội",
            telCompany: "02438221386",
            emailCompany: "veph@artstudio.vn",
            websiteCompany: "https://www.artstudio.vn",
            introCompany: "Art Studio ra đời năm 2018, chuyên cung cấp các dòng tranh Canvas, tranh Décor nội thất, tranh hoạt họa theo yêu cầu, tư vấn thiết kế & in ấn theo yêu cầu của khách hàng. Với mong muốn mang đến cho khách hàng trải nghiệm tốt nhất về một không gian sống tuyệt vời thông qua những sản phẩm chất lượng, chúng tôi đang ngày một hoàn thiện hơn về sản phẩm cũng như cung cách phục vụ để khách hàng có thể cảm nhận được trọn vẹn giá trị cốt lõi của Art Studio",
            logoCompany: require('../assets/images/placeholder.jpg'),
            imageCompany: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
        },
        {
            id: "c2",
            nameCompany: "Artstuff",
            fullUnitCompany: "Artstuff",
            majorCompany: "Nghệ thuật",
            fullAddressCompany: "94 Đường 5A, Phường Bình Hưng Hòa A, Quận Bình Tân, Thành Phố Hồ Chí Minh.",
            telCompany: "02873066079",
            emailCompany: " lienhe@artstuff.vn",
            websiteCompany: "https://artstuff.vn/",
            introCompany: "Công ty TNHH Sản xuất Thương mại Artstuff hoạt động kinh doanh trong lĩnh vực sản xuất phụ kiện máy tính, với sản phẩm nổi bật là nút phím cơ và bàn phím cơ nghệ thuật. Artstuff mang thủ công nghệ thuật kết hợp công nghệ, sáng tạo nên những sản phẩm liên quan desktop để bàn độc đáo, khác biệt. Cung cấp cho cộng đồng game thủ và người dùng phổ thông nhiều sự lựa chọn ghi đậm dấu ấn cá nhân, phong cách thẩm mỹ riêng biệt. Artstuff là một cộng đồng nhân sự trẻ, năng động được kết nối bởi 04 nhà đồng sáng lập thuộc thế hệ 8x, 9x nhiệt tình, đa dạng kinh nghiệm trong điều hành, kiến trúc ,nghệ thuật, công nghệ thông tin. Tại Artstuff, chúng tôi: \"Kiến tạo hệ sinh thái nhân sự\", mở rộng các chính sách, phúc lợi để các thành viên yên tâm hoàn thành công việc.",
            logoCompany: require('../assets/images/placeholder.jpg'),
            imageCompany: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
        },
        {
            id: "c3",
            nameCompany: "Cây Cầu Vàng",
            fullUnitCompany: "Cây Cầu Vàng",
            majorCompany: "Nghệ thuật",
            fullAddressCompany: "137 Trần Đại Nghĩa, Bách Khoa, Hai Bà Trưng, Hà Nội",
            telCompany: "0989980198",
            emailCompany: " info@caycauvang.com",
            websiteCompany: "http://www.caycauvang.com/gioi-thieu",
            introCompany: "Công ty TNHH TM DV và Chuyển phát Cây Cầu Vàng, tên giao dịch quốc tế : Golden Bridge Co., Ltd, viết tắt : GBC, xin gửi lời chào trân trọng đến Quý khách hàng. Là công ty chuyên cung cấp các dịch vụ về điện hoa, quà tặng trong nước và quốc tế trên nền tảng của dịch vụ chuyển phát nhanh với mạng lưới 63 tỉnh thành phố trên cả nước và kết nối với 150 quốc gia trên thế giới.",
            logoCompany: require('../assets/images/placeholder.jpg'),
            imageCompany: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
        },
        {
            id: "c4",
            nameCompany: "Hà Thành",
            fullUnitCompany: "Hà Thành",
            majorCompany: "Lắp ráp",
            fullAddressCompany: "Số 8 ngách 193/220 đường phú diễn, Quận Bắc Từ Liêm, Hà Nội",
            telCompany: "",
            emailCompany: "",
            websiteCompany: "",
            introCompany: "Công ty TNHH công nghệ Hà thành thành lập năm 2015, hoạt đông trong lĩnh vực thiết bị công nghệ, chuyên nhập khẩu và phân phối thiết bị điện tử, công nghệ.",
            logoCompany: require('../assets/images/placeholder.jpg'),
            imageCompany: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
        },
        {
            id: "c5",
            nameCompany: "Alpha",
            fullUnitCompany: "Alpha",
            majorCompany: "Thủ công",
            fullAddressCompany: "460 Trần Quý Cáp, Văn Chương, Đống Đa, Hà Nội",
            telCompany: "02437373060",
            emailCompany: " lienhe@inalpha.vn",
            websiteCompany: "https://inalpha.com.vn",
            introCompany: "Trong suốt nhiều năm hoạt động, In Alpha Việt Nam đã tạo dựng cho mình một thương hiệu có uy tín tại thị trường Hà Nội và các tỉnh lân cận miền Bắc. Nguồn nhân lực của chúng tôi là sự kết hợp giữa đội ngũ Trẻ trung – Năng động – Sáng tạo và các Anh/Chị nhiều Kinh nghiệm. Với năng lực đã chứng minh qua thực tế thị trường, In Alpha hiện nay vinh dự nhận được sự tin tưởng của các Tập đoàn, Công ty, doanh nghiệp như: Vinhoms, FLC, TP Bank, EVN, Golf Tam Dao, Tập đoàn IMC Á Âu, Thép Kyoie, Nam Phương, Công Ty Việt – Sing, Beer Đại Việt, Bảo Tín Minh Châu,…Bằng năng lực chuyên môn cao với Đội ngũ nhân sự chuyên nghiệp, Hệ thống được quản lý, vận hành theo tiêu chuẩn chất lượng chắc chắn rằng sẽ làm hài lòng các Quý vị.",
            logoCompany: require('../assets/images/placeholder.jpg'),
            imageCompany: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
        },
        {
            id: "c6",
            nameCompany: "Vaps",
            fullUnitCompany: "Vaps",
            majorCompany: "Dịch vụ",
            fullAddressCompany: "Số nhà 254, Phố Mai Anh Tuấn, P.Thành Công, Hà Nội",
            telCompany: "0931751263",
            emailCompany: "trungnd.vaps@gmail.com",
            websiteCompany: "http://www.vaps-vn.com/?fbclid=IwAR0Ch-NBwdnTFg_CRS7EWFsmDco41XApg4U-63W2Vi7VcZczfdRlcrs1X3A",
            introCompany: "VAPs là mô hình kinh tế dành cho người tự kỷ tại Việt Nam.  Một buổi họp đầu giờ sáng, phân công nhiệm vụ làm việc như ở nhiều đơn vị, chỉ khác khi toàn bộ những người lao động tại cơ sở này đều là người tự kỷ. Người lao động đặc biệt nên mô hình làm việc cũng đặc biệt hơn. Trong cùng một cơ sở có tổng hợp các dịch vụ từ siêu thị, nhà hàng ăn uống cho đến thư viện thuê mượn và bán sách.\nDọn dẹp thư viện, tính tiền, kiểm kê hàng hóa, nướng bánh pizza để phục vụ khách đến nhà hàng dùng bữa…, các đầu việc khác nhau phù hợp với khả năng lao động của từng người. Tất nhiên, việc khác, nhưng quy tắc làm việc sẽ được xây dựng chung.\n\n\n\n",
            logoCompany: require('../assets/images/placeholder.jpg'),
            imageCompany: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
        },
        {
            id: "c7",
            nameCompany: "OTAS",
            fullUnitCompany: "OTAS",
            majorCompany: "Gia công",
            fullAddressCompany: "TP.HCM, 356 Tạ Quang Bửu, P.4, Q.8, TP.HCM, Quận 8",
            telCompany: "088507053",
            emailCompany: "",
            websiteCompany: "",
            introCompany: "Công ty TNHH Thương mại Quảng cáo Oanh Trần (gọi tắt là OTAS), được thành lập từ năm 2001, hoạt động trong lĩnh vực In ấn, Văn phòng phẩm,Thiết kế và Quà tặng.\nVới quan điểm phát triển bền vững, OTAS đã xây dựng thành công thương hiệu giấy ghi chú có keo Memo-Stick trở thành 1 thương hiệu mạnh với chất lượng quốc tế.\nBằng những nỗ lực không ngừng, OTAS tự hào là đối tác chiến lược của hệ thống bán sỉ METRO, hệ thống nhà sách FAHASA, Xuân Thu… Ngoài ra, OTAS là nhà cung cấp quà tặng, dịch vụ In ấn lâu năm cho các tập đoàn đa quốc gia và các công ty trong nước như: Sanofi, Sevier, Prudential, Cresent Mall, Generali, Roche, Fedex, Novatis, Uni-Global Logistics, Gia Nguyen Logistics, Evergreen Line…\n",
            logoCompany: require('../assets/images/placeholder.jpg'),
            imageCompany: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
        },
    ]

    let job = [
        {
            id: "j1",
            companyID: '',
            nameJob: "Thợ tranh đính đá",
            nameCompany: "Art Studio",
            imageCompany: require('../assets/images/placeholder.jpg'),
            locationJob: "Hà Nội",
            acceptDisable: ["Nhẹ",],
            locationJobDetai: "Hà Nội: Tòa CT3 Chung cư X2 Đại Kim - Bộ Quốc Phòng - Phố Trần Hòa - Đại Kim, Hoàng Mai",
            imageJob: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
            expJob: '',
            endTime: '01/01/2024',
            discripJob: [
                "Nhận dụng cụ và nguyên liệu từ nhà cung cấp cho việc đính đá lên tranh, bao gồm: các tờ chart (mẫu), các túi đá được đánh mã số theo mã màu trong tờ mẫu, nhíp đính đá, bút gắn đá, khay đựng đá.",
                "Sử dụng nhíp gắp từng viên đá và đính vào tờ chart theo mã màu được đánh dấu.",
                "Sau khi gắn kín đá lên tờ chart, bạn sử dụng thước để chỉnh lại các hàng đá cho thẳng và sát vào nhau.",
                "Cuối cùng, bạn sắp xếp các tờ chart theo thứ tự bức tranh và bóc lớp giấy phía sau để gắn vào khung bìa cứng.",
            ]
            ,
            requirementJob: [
                "Có kinh nghiệm làm tranh đính đá từ trước là lợi thế. Nếu không có sẽ được hướng dẫn học việc.",
                "Sự kiên nhẫn: Đây là phẩm chất cần thiết của bất cứ người thợ thủ công nào.",
                "Nhiệt tình, nhanh nhẹn và say mê công việc.",
                "Có tinh thần trách nhiệm cao",
            ],
            extraBenefitJob: {
                true: [
                    "Trị liệu tâm lý",
                    "Hoạt động ngoại khoá",
                    "Bảo hiểm",
                    "Vừa học vừa vừa làm",
                ],
                false: [
                    "Bao ăn ở",
                    "Xe đưa đón",
                ],
            },
            benefitJob: [
                "Thu nhập: Lương cứng + % Doanh số + Phụ cấp + Thưởng doanh số (Thu Nhập từ 10-30 Triệu)",
                "Ngoài ra nhân viên còn được Thưởng sinh nhật, thưởng top doanh số hàng tháng, Hưởng chính sách công đoàn khi cá nhân hoặc người nhà bị ốm, hiếu hỉ,...",
                "Được tham gia các khóa đào tạo hàng tháng về kỹ năng và chuyên môn nhằm hỗ trợ cho công việc",
                "Được thử thách, tăng lương, tăng cấp bậc",
                "Chính sách thăng tiến minh bạch, rõ ràng, xét lên vị trí dựa theo năng lực và kết quả làm việc",
            ],
        },
        {
            id: "j2",
            companyID: '',
            nameJob: "Vẽ màu sản phẩm",
            nameCompany: "Artstuff",
            imageCompany: require('../assets/images/placeholder.jpg'),
            locationJob: "Thành phố Hồ Chí Minh",
            acceptDisable: ["Trung Bình",],
            locationJobDetai: "94 Đường 5A, Phường Bình Hưng Hòa A, Quận Bình Tân, Thành Phố Hồ Chí Minh.",
            imageJob: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
            expJob: '',
            endTime: '01/01/2024',
            discripJob: [
                "Tiếp nhận phôi và yêu cầu công việc của trường bộ phận.",
                "Pha màu, tô vẽ lên bề mặt sản phẩm theo đúng quy trình, hướng dẫn của trưởng bộ phận.",
                "Bảo quản, vệ sinh dụng cụ vẽ sau khi hoàn thành công việc.",
                "Thực hiện các yêu cầu liên quan công việc được thông qua của quản lý cấp trên.",
            ]
            ,
            requirementJob: [
                "Có đam mê hội họa, chưa có kinh nghiệm sẽ được đào tạo",
                "Có khả năng pha màu cơ bản là một lợi thế",
                "Thích vẽ, khéo tay, chăm chỉ và có tinh thần ham học hỏi",
                "Ưu tiên khi từng vẽ tranh, vẽ trên vải, tô tượng, vẽ nail, làm đồ thủ công hoặc các công việc liên quan khác",
                "Đã từng vẽ với các loại màu Alcohol, Acrylic, Gouache...là lợi thế",
            ],
            extraBenefitJob: {
                true: [
                    "Vừa học vừa làm",
                    "Hoạt động ngoại khóa",
                    "Bảo hiểm",
                ]

            },
            benefitJob: [
                "Lương khởi điểm: 6.550.000 VNĐ",
                "Tham gia BHXH, BHYT, BHTN theo quy định",
                "Bảo hiểm chăm sóc sức khỏe cá nhân(PTI)",
                "12 ngày phép 1 năm",
                "Điều chỉnh lương mỗi năm 1 lần",
                "Khám sức khỏe định kỳ hằng năm",
                "Du lịch, team building và hoạt động nhóm khác",
                "Cùng một số các phúc lợi khác được quy định chi tiết trong chính sách của Công ty.",
            ],
        },
        {
            id: "j3",
            companyID: '',
            nameJob: "Nhân Viên Cắm Hoa",
            nameCompany: "Cây Cầu Vàng",
            imageCompany: require('../assets/images/placeholder.jpg'),
            locationJob: "Hà Nội",
            acceptDisable: ["Trung Bình",],
            locationJobDetai: "",
            imageJob: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
            expJob: '',
            endTime: '01/01/2024',
            discripJob: [
                "Chăm sóc hoa, bảo quản hoa",
                "Thực hiện cắm hoa theo yêu cầu của từng khách hàng.",
                "Thiết kế, sáng tạo những mẫu cắm hoa mới.",
            ]
            ,
            requirementJob: [
                "Thợ cắm hoa chưa có tay nghề hoặc kinh nghiệm sẽ được đào tạo miễn phí",
                "Nếu bạn đã có tay nghề bạn sẽ thực hiện đơn hàng theo mẫu hoặc tự sáng tạo.",
                "Bạn có con mắt thẩm mĩ về mỹ thuật, thời trang, thích trồng cây là một lợi thế.",
                "Tỉ mỉ, tận tình, thật thà.",
                "Chỉ cần bạn thích hoa và đam mê với hoa tươi là đủ.",

            ],
            extraBenefitJob: {
                true: [
                    "Được đào miễn phí",
                    "Môi trường thân thiện, năng động",
                ]
            },
            benefitJob: [
                "Thu nhập: 8- 15 triệu tùy vào năng lực.",
                "Môi trường làm việc thân thiện, sáng tạo.",
                "Bạn đã có nghề thì sẽ được đào tạo nâng cao tay nghề.",
                "Làm việc trong một môi trường năng động, chuyên nghiệp.",
            ],
        },
        {
            id: "j4",
            companyID: '',
            nameJob: "Công nhân đóng gói",
            nameCompany: "CTY TNHH Công nghệ Hà Thành",
            imageCompany: require('../assets/images/placeholder.jpg'),
            locationJob: "Hà Nội",
            acceptDisable: ["Nặng",],
            locationJobDetai: "Số 8 ngách 193/220 đường phú diễn, Quận Bắc Từ Liêm, Hà Nội",
            imageJob: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
            expJob: '',
            endTime: '01/01/2024',
            discripJob: [
                "Gia công, đóng gói hàng hóa.",
                "Sắp xếp hàng hóa khi nhập, xuất hàng.",
                "Làm việc trong môi trường sạch, điều hòa máy lạnh.",
                "Công việc nhẹ nhàng, không vất vả.",
            ]
            ,
            requirementJob: [
                "Đối tượng: Nam nữ từ đủ 18 - 33 tuổi, có sức khoẻ, chăm chỉ, nhanh nhẹn, yêu nghề, có nguyện vọng làm việc lâu dài trong Công ty.",
                "Chăm chỉ, Chịu khó",
            ],
            extraBenefitJob: {
                true: [
                    "Công việc nhẹ nhàng.",
                    "Môi trường thân thiện hòa đồng.",
                ],
            },
            benefitJob: [
                "Được tham gia đầy đủ BHXH, BHYT, BHTN, BH tại nạn 24/7 và các chế độ khác theo Luật Lao động hiện hành.",
                "Thưởng lễ, tết và thưởng khác theo quy định của Công ty.",
                "Lương thỏa thuận, tùy theo kinh nghiệm, trình độ và năng suất lao động;",
                "Ngày làm 8 tiếng, nghỉ các ngày chủ nhật, lễ, Tết theo quy định của nhà nước;",
                "Thưởng lễ, Tết và các thưởng khác theo quy định Công ty",
                "Ăn trưa tại công ty",
                "Môi trường làm việc hiện đại, thân thiện, chia sẻ và có nhiều cơ hội thăng tiến",
            ],
        },
        {
            id: "j5",
            companyID: '',
            nameJob: "Nhân viên gia công- in ấn",
            nameCompany: "Alpha",
            imageCompany: require('../assets/images/placeholder.jpg'),
            locationJob: "Hà Nội",
            acceptDisable: ["Trung Bình",],
            locationJobDetai: "Hà Nội, 460 Trần Quý Cáp, Văn Chương, Đống Đa, Hà Nội, Đống Đa",
            imageJob: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
            expJob: '',
            endTime: '01/01/2024',
            discripJob: [
                "-Làm gia công sản xuất các sản phẩm được in ấn như lịch tết, sổ da, bao bì, tem nhãn, decal, .",
                "-Cán màng, Bế định hình,may bìa sổ, ép nhũ, dán keo...",
            ]
            ,
            requirementJob: [
                "Nhanh nhẹn, yêu công việc, trung thực và chuyên cần.",
                "Không kinh nghiệm được đào tạo hướng đến làm việc lâu dài và được hướng dẫn tận tình lên làm thợ chuyên nghiệp",
            ],
            extraBenefitJob: {
                true: [
                    "Được đào tạo",
                    "Môi trường thân thiện, năng động",
                ]
            },
            benefitJob: [
                "Lương từ 6-10 triệu",
                "Làm thêm giờ nhân hệ số 1.5",
                "Được hưởng theo các chế độ của công ty. Nghỉ mát, du xuân, nghỉ lễ đều được thưởng .",
                "Môi trường làm vc năng động sáng tạo và thoải mái.",

            ],
        },
        {
            id: "j6",
            companyID: '',
            nameJob: "Nhân viên phục vụ",
            nameCompany: "VAPs",
            imageCompany: require('../assets/images/placeholder.jpg'),
            locationJob: "Hà Nội",
            acceptDisable: ["Nhẹ",],
            locationJobDetai: "Số nhà 254, Phố Mai Anh Tuấn, P.Thành Công, Hà Nội",
            imageJob: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
            expJob: '',
            endTime: '01/01/2024',
            discripJob: [
                "Dọn dẹp thư viện, tính tiền, kiểm kê hàng hóa, nướng bánh pizza để phục vụ khách đến nhà hàng dùng bữa…, các đầu việc khác nhau phù hợp với khả năng lao động của từng người. Tất nhiên, việc khác, nhưng quy tắc làm việc sẽ được xây dựng chung.                "
            ]
            ,
            requirementJob: [
                "Từ 13 tuổi trở lên"
            ],
            extraBenefitJob: {
                true: [
                    "Vừa học vừa làm",
                    "Trị liệu tâm lí",
                    "Hoạt động ngoại khóa",
                ]
            },
            benefitJob: [
                "Hiện những người lao động tại đây không nhận lương tháng mà nhận thu nhập theo ngày từ doanh số kinh doanh. Những công việc mở giúp người tự kỷ thêm cơ hội giao lưu, tăng khả năng hòa nhập cộng đồng… Như mọi người khi làm việc, những người lao động ở đây cũng có áp lực cùng niềm vui và mong muốn riêng trong những ngày làm việc."
            ],
        },
        {
            id: "j7",
            companyID: '',
            nameJob: "Thợ gia công",
            nameCompany: "OTAS",
            imageCompany: require('../assets/images/placeholder.jpg'),
            locationJob: "TP. HCM",
            acceptDisable: ["Trung Bình",],
            locationJobDetai: "TP.HCM, 356 Tạ Quang Bửu, P.4, Q.8, TP.HCM, Quận 8",
            imageJob: [
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
                require('../assets/images/placeholder.jpg'),
            ],
            expJob: '',
            endTime: '01/01/2024',
            discripJob: [
                "Thợ Gia Công công việc Gia công thành phẩm sau in",
                "Phối hợp các bộ phận khác để đáp ứng tiến độ công việc.",
            ],
            requirementJob: [
                "Đủ 18 tuổi, có sức khỏe",
                "Được đào tạo không cần kinh nghiệm",
                "Thân hình cân đối và lanh lẹ, nhanh nhẹn.",
                "Học việc nhanh, chịu khó",
            ],
            extraBenefitJob: {
                true: [
                    "Có bảo hiểm",
                    "Vừa học vừa làm",
                    "Môi trường sạch sẽ",
                ],
            },
            benefitJob: [
               "Được tham gia BHXH, BHYT, ....",
               "Môi trường làm việc sạch sẽ, có điều hòa.",
               "Những vấn đề khác trao đổi khi phỏng vấn…",
               "Làm việc trong môi trường sạch sẽ, có máy lạnh.",
            ],
        },
    ]
    const notiData = [
        {
            notiID: 'n1',
            companyID: 'c1',
            notiType: 'viewed',
            notiTime: '2023-10-14T20:10:00+07:00',
            forUser: 'currentUser.id',
        },
        {
            notiID: 'n2',
            companyID: 'c4',
            notiType: 'rated',
            notiTime: '2023-10-16T15:22:30+07:00',
            forUser: 'currentUser.id',
        },
        {
            notiID: 'n2',
            companyID: 'c1',
            notiType: 'rated',
            notiTime: '2023-10-16T15:22:30+07:00',
            forUser: 'currentUser.id',
        },
        {
            notiID: 'n2',
            companyID: 'c2',
            notiType: 'rated',
            notiTime: '2023-10-16T15:22:30+07:00',
            forUser: 'currentUser.id',
        }
    ];

    return { 
        company, 
        job, 
        currentUser, 
        notiData,
        isLoading 
    };
}

export default DATA;