import axios from "axios";
import endpoints from '../data/endpoints.json'


export default async function fetchUser(token : string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
        if(!token) {
            throw new Error('No token found');
        } else {
            const response = await axios.get(endpoints.userInfo, {headers})
            if(response.status === 200) {
                const { data } = response

                if(data) {
                    const userData = {
                        id: data.sub,
                        name: data.name,
                        image: data.picture
                    }

                    return userData;
                }
            }
        }
    } catch(error) {
        console.error(error);
    }
}

