import { Field, reduxForm } from 'redux-form';
import { FormDataReg } from '../../redux/type';
import { minLength, required } from '../../utils/validators';
import InputField from '../common/InputField';
import styles from './style.module.scss';


const FormReg = (props:any) => {
   const { handleSubmit } = props
   return (
      <>
         <form onSubmit={handleSubmit} className={styles.forms}>
            <Field
               className={styles.inputField}
               type='text'
               name='name'
               id='name'
               placeholder='Your Name'
               component={InputField}
               validate={[required, minLength]}
            />
            <Field
               className={styles.inputField}
               type='email'
               name='email'
               id='email'
               placeholder='Your Email'
               component={InputField}
               validate={[required, minLength]}
            />
            <Field
               className={styles.inputField}
               type='password'
               name='password'
               id='password'
               placeholder='Password'
               component={InputField}
               validate={[required, minLength]}
            />
            <Field
               className={styles.inputField}
               type='password'
               name='password_confirmation'
               id='password_confirmation'
               placeholder='Confirm password'
               component={InputField}
               validate={[required, minLength]}
            />
            {props.error ? (<div className={styles.inputErrorMessage}>{props.error}</div>) : null}
            <div>
               <button className={styles.buttonSubmit} type="submit" >Submit</button>
            </div>
         </form>
      </>

   )
}
export default reduxForm<FormDataReg>({
   form: 'register-form'
})(FormReg);
