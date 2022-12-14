
export const errorStringHandler=(errStr:string)=>{
   if(errStr==='Internal Server Error'){
      return 'Something went wrong'
   }else{
      return errStr
   }
   
}