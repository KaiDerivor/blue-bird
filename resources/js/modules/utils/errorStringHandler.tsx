
export const errorStringHandler=(errStr:string)=>{
   if(errStr==='Internal Server Error'){
      return 'Щось пішло не так :( Спробуйте будь ласка пізніше'
   }else{
      return errStr
   }
   
}