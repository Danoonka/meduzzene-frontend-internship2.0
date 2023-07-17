import { healthCheck } from "src/app/api/api"

export const healthcheckEffects = async () => {
  return await healthCheck()
    .then(res=>{
      console.log(res)
    })
    .catch(function (error) {
      console.log(error)
    })
}
