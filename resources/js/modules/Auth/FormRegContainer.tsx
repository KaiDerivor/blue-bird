import { connect, ConnectedProps } from 'react-redux';
import { register } from "../../redux/authReducer";
import { AppDispatch, AppStateType } from "../../redux/store";
import { FormDataReg } from '../../redux/type';
import FormLoyauts from "../layouts/FormLayouts";
import ReduxLRegisterForm from "./FormReg";



const FormRegContainers=(props:any)=>{
   const onSubmit=(formData:FormDataReg):void=>{
      props.register(formData);
   }
   return <FormLoyauts
   title='Реєстрація'
   text="Вже маєш аккаунт?"
   link='/login'
   textLink='Увійти'
   >
      <ReduxLRegisterForm onSubmit={onSubmit} />
   </FormLoyauts> 
}
const mapDispatchToProps=(dispatch:any)=>{
   return{
      register:(formData:FormDataReg):void=>{
         dispatch(register(formData));
      }
   }
}
const mapStateToProps=(state:AppStateType)=>{
   return{}
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(FormRegContainers);