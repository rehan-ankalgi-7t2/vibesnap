import supabase from "../../services/supabaseService"
import {customResponse} from "../../utils/customResponse";

export const createNewUser = async (user) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('username', user.displayName)

        if(data.length === 0){
            const { error } = await supabase
                .from('users')
                .insert({ 
                    username: user.displayName, 
                    first_name: user.displayName.split(" ")[0], 
                    last_name: user.displayName.split(" ")[1], 
                    email: user.email,
                    avatar: user.photoURL,
                    cover_image: ''
                })

            if(error){
                return customResponse(false, 'error creating user in db', null, error)
            }
        } else {
            return;
        }
    } catch (error) {
        console.error(error.message)
    }
}

export const getUserProfile = async (username) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .limit(1)

        if(data.length <= 0){
            return customResponse(false, 'no records matched', null, null)
        } else if(error) {
            return customResponse(false, 'error fetching data', null, error)
        } else {
            return customResponse(true, 'fetched user data', data, null)
        }
    } catch (error) {
        console.error(error.message)
    }
}