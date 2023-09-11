// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import facebook from "../../assets/icon_contact/facebook.png"
// import twitter from "../../assets/icon_contact/twitter.png"
// import vimeo from "../../assets/icon_contact/vimeo.png"
// import youtube from "../../assets/icon_contact/youtube.png"
// import heart from "../../assets/icon_contact/heart.png"
// import fondo_footer from "../../assets/icon_contact/fondo_footer.png"
// import logo from '../../assets/minga-logo.png';

// const Footer = () => {
//     return (
//         <View>
//             <View>
//                 <Image
//                     style={styles.image}
//                     source={fondo_footer}
//                     alt="gohan videl goten trunks"
//                 />
//             </View>
//             <View style={styles.footerContent}>
//                 <View style={styles.navLinks}>
//                     <TouchableOpacity style={styles.link}>
//                         <Text style={styles.linkText}>Home</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.link}>
//                         <Text style={styles.linkText}>Mangas</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <Image
//                     style={styles.logo}
//                     source={logo}
//                     alt="minga_logo"
//                 />
//                 <View style={styles.socialIcons}>
//                     <Image
//                         style={styles.icon}
//                         source={facebook}
//                         alt="facebook_icon"
//                     />
//                     <Image
//                         style={styles.icon}
//                         source={twitter}
//                         alt="twitter_icon"
//                     />
//                     <Image
//                         style={styles.icon}
//                         source={vimeo}
//                         alt="vimeo_icon"
//                     />
//                     <Image
//                         style={styles.icon}
//                         source={youtube}
//                         alt="youtube_icon"
//                     />
//                 </View>
//                 <TouchableOpacity style={styles.donateButton}>
//                     <Text style={styles.donateText}>Donate</Text>
//                     <Image
//                         style={styles.heartIcon}
//                         source={heart}
//                         alt="heart_icon"
//                     />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.divider}></View>
//         </View>
//     );
// }

// export default Footer

// const styles = StyleSheet.create({
//     image: {
//         borderRadius: 25,
//         height: '30%',
//         width: '100%',
//     },
//     footerContent: {
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: 40,
//     },
//     navLinks: {
//         flexDirection: 'row',
//     },
//     link: {
//         margin: 5,
//     },
//     linkText: {
//         fontSize: 18,
//         color: 'blue', // You can change the color to your desired color
//         textDecorationLine: 'underline',
//     },
//     logo: {
//         height: 90,
//         marginVertical: 20,
//     },
//     socialIcons: {
//         flexDirection: 'row',
//         marginVertical: 10,
//     },
//     icon: {
//         height: 24,
//         width: 24,
//         margin: 10,
//     },
//     donateButton: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'blue', // You can change the color to your desired color
//         width: 140,
//         height: 40,
//         borderRadius: 20,
//         marginBottom: 10,
//     },
//     donateText: {
//         color: 'white',
//         marginRight: 5,
//     },
//     heartIcon: {
//         height: 20,
//         width: 20,
//     },
//     divider: {
//         height: 2,
//         width: '70%',
//         borderWidth: 2,
//         borderColor: 'black',
//         margin: 'auto',
//     },
// });
