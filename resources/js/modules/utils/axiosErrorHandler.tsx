export const axiosErrorHandler = (err) => {
   if (err.response&&err.response.statusText!=='Internal server error') {
      return err.response.statusText
   } else if (err.request) {
      return 'Bad network. Try again later'
   } else {
      return 'Try again later'
   }
}