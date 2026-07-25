export interface DistrictCoord {
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export const INDIAN_STATES_DISTRICTS: Record<string, DistrictCoord[]> = {
  'Telangana': [
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, address: 'Main Ring Road, Ward 14, Hitec City, Hyderabad' },
    { name: 'Rangareddy', lat: 17.2403, lng: 78.4294, address: 'PVNR Expressway, Ward 6, Rajendranagar, Rangareddy' },
    { name: 'Medchal-Malkajgiri', lat: 17.5500, lng: 78.5500, address: 'Kompally Highway, Ward 3, Medchal' },
    { name: 'Warangal', lat: 17.9689, lng: 79.5941, address: 'Subedari Main Road, Hanamkonda, Warangal' },
    { name: 'Nizamabad', lat: 18.6725, lng: 78.0941, address: 'Collectorate Junction, Nizamabad' },
    { name: 'Khammam', lat: 17.2473, lng: 80.1514, address: 'Wyra Road, Ward 11, Khammam' },
    { name: 'Karimnagar', lat: 18.4386, lng: 79.1288, address: 'Collectorate Complex, Karimnagar' },
    { name: 'Nalgonda', lat: 17.0583, lng: 79.2683, address: 'Clock Tower Circle, Nalgonda' },
    { name: 'Mahbubnagar', lat: 16.7488, lng: 77.9814, address: 'New Collectorate Road, Mahbubnagar' },
  ],
  'Andhra Pradesh': [
    { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, address: 'Beach Road, Ward 22, Siripuram, Visakhapatnam' },
    { name: 'Vijayawada (NTR)', lat: 16.5062, lng: 80.6480, address: 'MG Road, Ward 18, Vijayawada' },
    { name: 'Guntur', lat: 16.3067, lng: 80.4365, address: 'Arundelpet 3rd Line, Ward 9, Guntur' },
    { name: 'Tirupati', lat: 13.6288, lng: 79.4192, address: 'Alipiri Road, Ward 4, Tirupati' },
    { name: 'Kakinada', lat: 16.9891, lng: 82.2475, address: 'Main Road, Ward 12, Kakinada' },
    { name: 'Kurnool', lat: 15.8281, lng: 78.0373, address: 'Rajvihar Center, Kurnool' },
    { name: 'Nellore', lat: 14.4426, lng: 79.9865, address: 'GT Road, Ward 15, Nellore' },
    { name: 'Anantapur', lat: 14.6819, lng: 77.6006, address: 'Saptagiri Circle, Anantapur' },
  ],
  'Karnataka': [
    { name: 'Bengaluru Urban', lat: 12.9716, lng: 77.5946, address: 'MG Road, Ward 112, Indiranagar, Bengaluru' },
    { name: 'Mysuru', lat: 12.2958, lng: 76.6394, address: 'JLB Road, Ward 15, Mysuru' },
    { name: 'Dakshina Kannada (Mangaluru)', lat: 12.9141, lng: 74.8560, address: 'Hampankatta Junction, Mangaluru' },
    { name: 'Hubballi-Dharwad', lat: 15.3647, lng: 75.1240, address: 'Chennamma Circle, Hubballi' },
    { name: 'Belagavi', lat: 15.8497, lng: 74.4977, address: 'College Road, Belagavi' },
    { name: 'Shivamogga', lat: 13.9299, lng: 75.5681, address: 'BH Road, Shivamogga' },
  ],
  'Maharashtra': [
    { name: 'Mumbai City', lat: 18.9388, lng: 72.8353, address: 'Marine Drive, Ward A, Churchgate, Mumbai' },
    { name: 'Mumbai Suburban', lat: 19.1136, lng: 72.8697, address: 'BKC G Block, Bandra East, Mumbai' },
    { name: 'Pune', lat: 18.5204, lng: 73.8567, address: 'FC Road, Ward 8, Shivajinagar, Pune' },
    { name: 'Nagpur', lat: 21.1458, lng: 79.0882, address: 'Civil Lines, Ward 14, Nagpur' },
    { name: 'Thane', lat: 19.2183, lng: 72.9781, address: 'Ghodbunder Road, Ward 5, Thane' },
    { name: 'Nashik', lat: 19.9975, lng: 73.7898, address: 'College Road, Nashik' },
    { name: 'Aurangabad', lat: 19.8762, lng: 75.3433, address: 'Kranti Chowk, Chhatrapati Sambhajinagar' },
  ],
  'Tamil Nadu': [
    { name: 'Chennai', lat: 13.0827, lng: 80.2707, address: 'Anna Salai, Ward 104, T. Nagar, Chennai' },
    { name: 'Coimbatore', lat: 11.0168, lng: 76.9558, address: 'DB Road, Ward 32, RS Puram, Coimbatore' },
    { name: 'Madurai', lat: 9.9252, lng: 78.1198, address: 'KK Nagar Main Road, Ward 12, Madurai' },
    { name: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047, address: 'Cantonment Road, Tiruchirappalli' },
    { name: 'Salem', lat: 11.6643, lng: 78.1460, address: 'Fairlands, Salem' },
  ],
  'Delhi NCR': [
    { name: 'New Delhi', lat: 28.6139, lng: 77.2090, address: 'Connaught Place, Ward 4, New Delhi' },
    { name: 'South Delhi', lat: 28.5400, lng: 77.1900, address: 'Outer Ring Road, Hauz Khas, New Delhi' },
    { name: 'North Delhi', lat: 28.7041, lng: 77.1025, address: 'Civil Lines, North Delhi' },
    { name: 'Gurugram', lat: 28.4595, lng: 77.0266, address: 'Golf Course Road, Ward 18, Gurugram' },
    { name: 'Noida', lat: 28.5355, lng: 77.3910, address: 'Sector 62 Main Expressway, Noida' },
    { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538, address: 'Raj Nagar District Centre, Ghaziabad' },
  ],
  'Kerala': [
    { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366, address: 'MG Road, Ward 20, Thiruvananthapuram' },
    { name: 'Ernakulam (Kochi)', lat: 9.9816, lng: 76.2999, address: 'Marine Drive, Ward 35, Kochi' },
    { name: 'Kozhikode', lat: 11.2588, lng: 75.7804, address: 'Mavoor Road, Ward 12, Kozhikode' },
    { name: 'Thrissur', lat: 10.5276, lng: 76.2144, address: 'Swaraj Round, Thrissur' },
  ],
  'West Bengal': [
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639, address: 'Park Street, Ward 63, Kolkata' },
    { name: 'Howrah', lat: 22.5958, lng: 88.2636, address: 'GT Road, Howrah' },
    { name: 'Siliguri', lat: 26.7271, lng: 88.3953, address: 'Hill Cart Road, Siliguri' },
    { name: 'Darjeeling', lat: 27.0410, lng: 88.2663, address: 'Mall Road, Darjeeling' },
  ],
  'Uttar Pradesh': [
    { name: 'Lucknow', lat: 26.8467, lng: 80.9462, address: 'Hazratganj Main Road, Lucknow' },
    { name: 'Kanpur', lat: 26.4499, lng: 80.3319, address: 'Mall Road, Civil Lines, Kanpur' },
    { name: 'Varanasi', lat: 25.3176, lng: 82.9739, address: 'Lanka Main Road, Varanasi' },
    { name: 'Agra', lat: 27.1767, lng: 78.0081, address: 'MG Road, Sanjay Place, Agra' },
    { name: 'Prayagraj', lat: 25.4358, lng: 81.8463, address: 'Civil Lines, Prayagraj' },
  ],
  'Gujarat': [
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, address: 'CG Road, Navrangpura, Ahmedabad' },
    { name: 'Surat', lat: 21.1702, lng: 72.8311, address: 'Ring Road, Athwa, Surat' },
    { name: 'Vadodara', lat: 22.3098, lng: 73.1812, address: 'Alkapuri Main Road, Vadodara' },
    { name: 'Rajkot', lat: 22.3039, lng: 70.8022, address: 'Kalavad Road, Rajkot' },
  ],
  'Rajasthan': [
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873, address: 'MI Road, C-Scheme, Jaipur' },
    { name: 'Jodhpur', lat: 26.2389, lng: 73.0243, address: 'Sardarpura, Jodhpur' },
    { name: 'Udaipur', lat: 24.5854, lng: 73.7125, address: 'Fatehsagar Lake Road, Udaipur' },
    { name: 'Kota', lat: 25.2138, lng: 75.8648, address: 'Jhalawar Road, Kota' },
  ],
  'Madhya Pradesh': [
    { name: 'Bhopal', lat: 23.2599, lng: 77.4126, address: 'MP Nagar Zone 1, Bhopal' },
    { name: 'Indore', lat: 22.7196, lng: 75.8577, address: 'MG Road, Palasia, Indore' },
    { name: 'Gwalior', lat: 26.2183, lng: 78.1828, address: 'City Centre, Gwalior' },
    { name: 'Jabalpur', lat: 23.1815, lng: 79.9864, address: 'Russell Chowk, Jabalpur' },
  ],
  'Odisha': [
    { name: 'Bhubaneswar', lat: 20.2961, lng: 85.8245, address: 'Janpath Road, Saheed Nagar, Bhubaneswar' },
    { name: 'Cuttack', lat: 20.4625, lng: 85.8830, address: 'Baxi Bazar, Cuttack' },
    { name: 'Puri', lat: 19.8135, lng: 85.8312, address: 'Grand Road, Puri' },
  ],
  'Bihar': [
    { name: 'Patna', lat: 25.5941, lng: 85.1376, address: 'Boring Road, Patna' },
    { name: 'Gaya', lat: 24.7955, lng: 85.0002, address: 'GB Road, Gaya' },
    { name: 'Muzaffarpur', lat: 26.1209, lng: 85.3647, address: 'Motijheel Road, Muzaffarpur' },
  ]
};

export const getDistrictCoordinates = (stateName: string, districtName: string): { lat: number; lng: number; address: string } => {
  const stateDistricts = INDIAN_STATES_DISTRICTS[stateName] || INDIAN_STATES_DISTRICTS['Telangana'];
  const district = stateDistricts.find(d => d.name.toLowerCase() === districtName?.toLowerCase());
  if (district) {
    return { lat: district.lat, lng: district.lng, address: district.address };
  }
  // Search across all states if not found in selected state
  for (const st of Object.values(INDIAN_STATES_DISTRICTS)) {
    const found = st.find(d => d.name.toLowerCase() === districtName?.toLowerCase());
    if (found) {
      return { lat: found.lat, lng: found.lng, address: found.address };
    }
  }
  return { lat: 17.3850, lng: 78.4867, address: 'Main Ring Road, Ward 14, Hitec City, Hyderabad' };
};
