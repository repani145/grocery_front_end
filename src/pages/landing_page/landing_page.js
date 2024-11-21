import { Container } from "react-bootstrap";
import LandNavbar from "../../components/landNav/landNav";
import UserFooter from "../../components/user_footer/user_footer";
import WelcomeBoard from "../../components/welcome_board/welcome_board";
import './landing_page.css'
import WelcomeBoard2 from "../../components/welcome2/welcome_board";
import LandCom1 from "../../components/landCom1/comp1";
import LandComp2 from "../../components/landCom2/comp2";
import FadeZoomImage from "../../components/landCom3/comp3";
import Footor from "../../components/LandFooter/landFooter";
import CardComponent from "../../components/landCom4/landCom4";
import NearShops from "../../components/landCom4/landCom4";
import BootstrapComponent5 from "../../components/landCom5/landCom5";


const LandingPage = () => {
    return (
        <>
            <LandNavbar/>
            <WelcomeBoard/>
            <LandCom1/>
            <FadeZoomImage/>
            <LandComp2/>
            <NearShops/>
            <BootstrapComponent5/>
            
            <Footor/>
            {/* <LandComp2/> */}
            {/* <WelcomeBoard2/> */}
            
        </>
    )
}

export default LandingPage;


/* 
<Container className="d-flex flex-column align-items-center justify-content-center vh-100 landBackGround">
                <LandNavbar />
                <WelcomeBoard />
                {/* <h1>Shiva</h1> */
//             }
//                 <UserFooter/>
//             </Container>
// */