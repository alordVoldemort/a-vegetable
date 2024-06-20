export const HTTP_REQUEST = 'http/http-request'

export function receievedResponse (id, extras){
 return {
    type: HTTP_REQUEST,
    id,
    loading: false,
    ...extras
 }
}

export function createAction (type, ...argNames){
    return function (...args) {
        const action = {type}
        argNames.forEach((arg,  index)=>{
            action[argNames[index]] = args[index]
        })
        return action
    }
}