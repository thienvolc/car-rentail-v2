interface MockCar {
  id: number;
  owner_id: number;
  location_id: number;
  license_plate_number: string;
  year_of_manufacture: number;
  brand: string;
  model: string;
  number_of_seats: number;
  fuel_type: string;
  transmission_type: string;
  fuel_consumption: number;
  base_price_per_day: number;
  description: string;
  approval_status: string;
  status: string;
  images: string[];
  owner: {
    username: string;
    avatar_url: string;
    trips_count: number;
    verified: boolean;
  };
  location: {
    province: string;
    district: string;
    address_details: string;
  };
}

// Extended mock data based on car table schema
let mockCars: MockCar[] = [
  {
    id: 1,
    owner_id: 1,
    location_id: 1,
    license_plate_number: '30A-12345',
    year_of_manufacture: 2022,
    brand: 'Toyota',
    model: 'Vios',
    number_of_seats: 4,
    fuel_type: 'gasoline',
    transmission_type: 'automatic',
    fuel_consumption: 5.5,
    base_price_per_day: 800000,
    description: 'Xe mới, sạch sẽ, tiết kiệm nhiên liệu',
    approval_status: 'approved',
    status: 'active',
    images: [
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_cross_2023/p/g/2024/04/16/11/GONbUIT3q_QYII00KiZxeg.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_cross_2023/p/g/2024/04/16/11/bHUxHoZOQbJC0HKzjVNHgA.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_cross_2023/p/g/2024/04/16/11/2wpbUCtMt3nTnvBlyqwntw.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_cross_2023/p/g/2024/04/16/11/izdetEbq6RezwGSI8Zkt9A.jpg',
    ],
    owner: {
      username: 'John Doe',
      avatar_url: '/avator-placeholder.png',
      trips_count: 124,
      verified: true,
    },
    location: {
      province: 'Hồ Chí Minh',
      district: 'Quận 1',
      address_details: 'Trung tâm thành phố',
    },
  },
  {
    id: 2,
    owner_id: 2,
    location_id: 2,
    license_plate_number: '30B-67890',
    year_of_manufacture: 2021,
    brand: 'Honda',
    model: 'City',
    number_of_seats: 4,
    fuel_type: 'gasoline',
    transmission_type: 'manual',
    fuel_consumption: 4.8,
    base_price_per_day: 750000,
    description: 'Xe đẹp, bảo dưỡng định kỳ',
    approval_status: 'approved',
    status: 'active',
    images: [
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_cross_2024/p/g/2025/02/01/13/Y8GO9ICYLNSYIYjyR2uJMg.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_cross_2024/p/g/2025/02/01/13/qiew0lfuM-1Ry351HhFL5g.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_cross_2024/p/g/2025/02/01/13/GIJN2Xlye0RFIISL-bPfMw.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_xpander_cross_2024/p/g/2025/02/01/13/ahtJSVoB2flk-vO1UKViAA.jpg',
    ],
    owner: {
      username: 'Jane Smith',
      avatar_url: '/avator-placeholder.png',
      trips_count: 89,
      verified: true,
    },
    location: {
      province: 'Hồ Chí Minh',
      district: 'Quận 3',
      address_details: 'Gần sân bay Tân Sơn Nhất',
    },
  },
  {
    id: 3,
    owner_id: 3,
    location_id: 3,
    license_plate_number: '30C-11111',
    year_of_manufacture: 2023,
    brand: 'Mazda',
    model: 'CX-5',
    number_of_seats: 7,
    fuel_type: 'gasoline',
    transmission_type: 'automatic',
    fuel_consumption: 7.2,
    base_price_per_day: 1200000,
    description: 'SUV 7 chỗ, phù hợp gia đình',
    approval_status: 'approved',
    status: 'active',
    images: [
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/subaru_forester_2.0i-s_2019/p/g/2023/07/20/18/AEBf30iADTQPtFcKJQ_EVQ.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/subaru_forester_2.0i-s_2019/p/g/2023/07/20/18/XOhzI2Fo8WbmExFRkBwNjg.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/subaru_forester_2.0i-s_2019/p/g/2023/07/20/18/-q9cBw67adzy0p9SiK06Gw.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/subaru_forester_2.0i-s_2019/p/g/2023/07/20/18/fX9Hsams7UxwbXdskNHrnA.jpg',
    ],
    owner: {
      username: 'Mike Johnson',
      avatar_url: '/avator-placeholder.png',
      trips_count: 156,
      verified: true,
    },
    location: {
      province: 'Hồ Chí Minh',
      district: 'Quận 7',
      address_details: 'Khu vực Phú Mỹ Hưng',
    },
  },
  {
    id: 4,
    owner_id: 4,
    location_id: 4,
    license_plate_number: '30D-22222',
    year_of_manufacture: 2020,
    brand: 'Hyundai',
    model: 'Accent',
    number_of_seats: 4,
    fuel_type: 'gasoline',
    transmission_type: 'automatic',
    fuel_consumption: 5.0,
    base_price_per_day: 650000,
    description: 'Xe kinh tế, phù hợp di chuyển trong thành phố',
    approval_status: 'approved',
    status: 'active',
    images: [
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2018/p/g/2025/04/15/17/69HO2dAukkkUQVTrCLnrjA.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2018/p/g/2025/04/15/17/jj9EDRfP_UFgwP6iKAx-mg.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2018/p/g/2025/04/15/17/VkgYF6wlYVsqihp0rdEGug.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2018/p/g/2025/04/15/17/eAwDvAhBem8QgZ0W-_3Szg.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2018/p/g/2025/04/15/17/1Xr0dYHsZyU0TtGc_17Q6w.jpg',
    ],
    owner: {
      username: 'Sarah Wilson',
      avatar_url: '/avator-placeholder.png',
      trips_count: 67,
      verified: false,
    },
    location: {
      province: 'Hồ Chí Minh',
      district: 'Quận 2',
      address_details: 'Khu vực Thủ Đức',
    },
  },
  {
    id: 5,
    owner_id: 5,
    location_id: 5,
    license_plate_number: '30E-33333',
    year_of_manufacture: 2021,
    brand: 'KIA',
    model: 'Cerato',
    number_of_seats: 4,
    fuel_type: 'gasoline',
    transmission_type: 'automatic',
    fuel_consumption: 5.8,
    base_price_per_day: 850000,
    description: 'Xe sedan hạng C, thiết kế thể thao',
    approval_status: 'approved',
    status: 'active',
    images: [
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2021/p/g/2024/10/03/04/eJa4QGEtEqmtuutVHAYVmg.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2021/p/g/2024/10/03/04/nPsoa5kkzt_Mfh2nlJGMMg.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2021/p/g/2024/10/03/02/SZSr8F8gKxCmjyqafz-ljQ.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2021/p/g/2024/10/06/11/G0zXKdAb60Lm_WE4XYtKEA.jpg',
    ],
    owner: {
      username: 'David Brown',
      avatar_url: '/avator-placeholder.png',

      trips_count: 203,
      verified: true,
    },
    location: {
      province: 'Hồ Chí Minh',
      district: 'Quận 5',
      address_details: 'Khu vực Chợ Lớn',
    },
  },
  {
    id: 6,
    owner_id: 6,
    location_id: 6,
    license_plate_number: '30F-44444',
    year_of_manufacture: 2022,
    brand: 'Ford',
    model: 'EcoSport',
    number_of_seats: 5,
    fuel_type: 'gasoline',
    transmission_type: 'automatic',
    fuel_consumption: 6.5,
    base_price_per_day: 950000,
    description: 'SUV compact, phù hợp cho cả thành phố và du lịch',
    approval_status: 'approved',
    status: 'active',
    images: [
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2018/p/g/2024/10/25/17/qxwhORIgdTt-jztliRLWnA.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2018/p/g/2023/03/21/10/_YsZX7E90QQvLdntJJHUOQ.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2018/p/g/2023/03/21/10/bALqZJ5dIyS9xHkWN_Jm6Q.jpg',
      'https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_innova_2018/p/g/2024/10/25/17/qxwhORIgdTt-jztliRLWnA.jpg',
    ],
    owner: {
      username: 'Lisa Garcia',
      avatar_url: '/avator-placeholder.png',
      trips_count: 95,
      verified: true,
    },
    location: {
      province: 'Hồ Chí Minh',
      district: 'Quận 10',
      address_details: 'Gần bệnh viện Nhi Đồng',
    },
  },
];

mockCars = [...mockCars, ...mockCars]; // Duplicate for more variety

export { mockCars, type MockCar };
