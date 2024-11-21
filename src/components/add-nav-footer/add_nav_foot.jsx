import UserFooter from "../user_footer/user_footer"
import UserNav from "../user_nav/user_nav"


const AddNavFooter = ({children})=>{
    
    return(
        <>
        <UserNav/>
        {children}
        <UserFooter/>
        </>
    )
}

export default AddNavFooter;